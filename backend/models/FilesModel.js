class FilesModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllFiles() {
      return await this.knex('files').select('*');
    }
  
    async getFileById(id) {
      return await this.knex('files').where('id', id).first();
    }
  
    async createFile(fileData) {
      return await this.knex('files').insert(fileData).returning('*');
    }
    async createLessonFile(lessonFileData) {
      return await this.knex('lesson_files').insert(lessonFileData);
    }
  
    async updateFile(id, file) {
      return await this.knex('files').where('id', id).update(file).returning('*');
    }
  
    async deleteFile(id) {
      return await this.knex('files').where('id', id).del();
    }
  }
  
  module.exports = FilesModel;
  