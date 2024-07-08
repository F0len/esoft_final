const bcrypt = require('bcryptjs');
const { v4: uuidv4 } = require('uuid');

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async addUser(user) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      id: id,
      name: user.name,
      login: user.login,
      password: hashedPassword,
      telegram: user.telegram,
      roles: user.roles,
    };
    await this.userModel.createUser(newUser);
    return newUser;
  }

  async updateUser(id, user) {
    if (user.password) {
      user.password = await bcrypt.hash(user.password, 10);
    }
    return await this.userModel.updateUser(id, user);
  }

  async deleteUser(id) {
    await this.userModel.deleteUser(id);
  }

  async getAllUsers() {
    return this.userModel.getAllUsers();
  }
  async getAllUsersSmallInfo() {
    return this.userModel.getAllUsersSmallInfo();
  }
  async getUsersByLogin(login) {
    return this.userModel.getUserByLogin(login);
  }
}

module.exports = UserService;
