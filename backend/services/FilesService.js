const path = require('path');
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
  
    async createLessonFile(lessonData,files) {
    
    const videoFile = files.video ? {
      originalName: files.video[0].originalname,
      uuid: path.basename(files.video[0].filename, path.extname(files.video[0].filename))
    } : null;

    const additionalFiles = files.files ? files.files.map(file => ({
      originalName: file.originalname,
      uuid: path.basename(file.filename, path.extname(file.filename))
    })) : [];

    lessonData.video = videoFile;
    lessonData.files = additionalFiles;

    
     const filesRecords = await Promise.all(additionalFiles.map(file => {
      return this.filesModel.createFile({ id: file.uuid, name: file.originalName });
    }));

    await Promise.all(filesRecords.map(fileRecord => {
      return this.filesModel.createLessonFile({ lesson_id: lessonData.lessonId, file_id: fileRecord[0].id });
    }));
    }
  
    async updateFile(id, fileData) {
      return await this.filesModel.updateFile(id, fileData);
    }
  
    async deleteFile(id) {
      return await this.filesModel.deleteFile(id);
    }
  }
  
  module.exports = FilesService;
  