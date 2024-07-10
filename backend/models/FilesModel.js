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
  
    async createFile(file) {
      return await this.knex('files').insert(file).returning('*');
    }
  
    async updateFile(id, file) {
      return await this.knex('files').where('id', id).update(file).returning('*');
    }
  
    async deleteFile(id) {
      return await this.knex('files').where('id', id).del();
    }
  }
  
  module.exports = FilesModel;
  