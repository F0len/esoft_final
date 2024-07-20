class HomeworkModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllHomeworks() {
      return await this.knex('homework').select('*');
    }
  
    async getHomeworkById(id) {
      return await this.knex('homework').where('id', id).first();
    }
  
    async createHomework(homework) {
      return await this.knex('homework').insert(homework).returning('*');
    }
  
    async updateHomework(id, homework) {
      return await this.knex('homework').where('id', id).update(homework).returning('*');
    }
  
    async deleteHomework(id) {
      return await this.knex('homework').where('id', id).del();
    }
  }
  
  module.exports = HomeworkModel;
  