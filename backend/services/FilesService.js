class FilesService {
    constructor(filesModel) {
      this.filesModel = filesModel;
    }
  
    async getAllFiles() {
      return await this.filesModel.getAllFiles();
    }
  
    async getFileById(id) {
      return await this.filesModel.getFileById(id);
    }
  
    async createFile(fileData) {
      return await this.filesModel.createFile(fileData);
    }
  
    async updateFile(id, fileData) {
      return await this.filesModel.updateFile(id, fileData);
    }
  
    async deleteFile(id) {
      return await this.filesModel.deleteFile(id);
    }
  }
  
  module.exports = FilesService;
  