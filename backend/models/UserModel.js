class UserModel {
  constructor(knex) {
    this.knex = knex;
  }

  async createUser(user) {
    await this.knex.transaction(async trx => {
    
      const roleIds = [];
      if (user.roles && user.roles.length > 0) {
        for (const roleName of user.roles) {
          const roleId = await trx('role').where('name', roleName).select('id').first();
          if (roleId) {
            roleIds.push(roleId.id);
          }
        }
      }
  
      const [createdUser] = await trx('user').insert({
        id: user.id,
        login: user.login,
        name: user.name,
        password: user.password,
        telegram: user.telegram,
      }).returning('*');
  
      if (roleIds.length > 0) {
        const roleUserData = roleIds.map(roleId => ({
          user_id: createdUser.id,
          role_id: roleId,
        }));
        await trx('role_user').insert(roleUserData);
      }
    });
  }
  

  async getUserByLogin(login) {
    const user = await this.knex('user').where('login', login).first();
    if (user) {
      const roles = await this.knex('role_user')
        .join('role', 'role_user.role_id', 'role.id')
        .where('role_user.user_id', user.id)
        .pluck('role.name');
      user.roles = roles;
    }
    return user;
  }

  async getAllUsers() {
    const users = await this.knex('user').select();
    const userRoles = await this.knex('role_user')
      .join('role', 'role_user.role_id', 'role.id')
      .select('role_user.user_id', 'role.name as role_name');
    const userMap = users.reduce((map, user) => {
      delete user.password;
      map[user.id] = user;
      map[user.id].roles = [];
      return map;
    }, {});
    userRoles.forEach(role => {
      userMap[role.user_id].roles.push(role.role_name);
    });
    return Object.values(userMap);
  }

  async updateUser(id, updatedUser) {
    await this.knex.transaction(async trx => {
     
      const roleIds = [];
      if (updatedUser.roles && updatedUser.roles.length > 0) {
        for (const roleName of updatedUser.roles) {
          const roleId = await trx('role').where('name', roleName).select('id').first();
          if (roleId) {
            roleIds.push(roleId.id);
          }
        }
      }
      if (updatedUser.roles && updatedUser.roles.length > 0) {
        await trx('role_user').where('user_id', id).del();
        if (roleIds.length > 0) {
          const roleUserData = roleIds.map(roleId => ({
            user_id: id,
            role_id: roleId,
          }));
          await trx('role_user').insert(roleUserData);
        }
        delete updatedUser.roles;
      }
      if(updatedUser.roles && updatedUser.roles.length == 0){
        delete updatedUser.roles;
      }
      
      if (Object.keys(updatedUser).length > 0) {
        await trx('user').where('id', id).update(updatedUser);
      }
  
      
    });
  
    
    return updatedUser;
  }

  async deleteUser(id) {
    await this.knex.transaction(async trx => {
      await trx('role_user').where('user_id', id).del();
      await trx('user').where('id', id).del();
    });
  }
}

module.exports = UserModel;
