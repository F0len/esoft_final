class LessonFilesModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllLessonFiles() {
      return await this.knex('lesson_files').select('*');
    }
  
    async getLessonFileById(lesson_id, file_id) {
      return await this.knex('lesson_files').where({ lesson_id, file_id }).first();
    }
  
    async createLessonFile(lessonFile) {
      return await this.knex('lesson_files').insert(lessonFile).returning('*');
    }
  
    async deleteLessonFile(lesson_id, file_id) {
      return await this.knex('lesson_files').where({ lesson_id, file_id }).del();
    }
  }
  
  module.exports = LessonFilesModel;
  