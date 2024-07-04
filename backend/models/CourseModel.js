class CourseModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllCourses() {
      return await this.knex('course').select('*');
    }
  
    async getCourseById(id) {
      return await this.knex('course').where('id', id).first();
    }
  
    async createCourse(course) {
      return await this.knex('course').insert(course).returning('*');
    }
  
    async updateCourse(id, course) {
      return await this.knex('course').where('id', id).update(course).returning('*');
    }
  
    async deleteCourse(id) {
      return await this.knex('course').where('id', id).del();
    }
  }
  
  module.exports = CourseModel;
  