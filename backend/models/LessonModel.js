class LessonModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllLessons() {
      return await this.knex('lesson').select('*');
    }
  
    async getLessonById(id) {
      return await this.knex('lesson').where('id', id).first();
    }
  
    async createLesson(lesson) {
      return await this.knex('lesson').insert(lesson).returning('*');
    }
  
    async updateLesson(id, lesson) {
      return await this.knex('lesson').where('id', id).update(lesson).returning('*');
    }
  
    async deleteLesson(id) {
      return await this.knex('lesson').where('id', id).del();
    }
  }
  
  module.exports = LessonModel;
  