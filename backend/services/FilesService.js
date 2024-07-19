const path = require('path');
class FilesService {
    constructor(filesModel) {
      this.filesModel = filesModel;
    }
    decodeUtf8String = (encodedString) => {
      try {
        const buffer = new Uint8Array(encodedString.split('').map(char => char.charCodeAt(0)));
        const decoded = new TextDecoder('utf-8').decode(buffer);
        return decoded;
      } catch (error) {
        console.error('Error decoding string:', error);
        return '';
      }
    };
    async getAllFiles() {
      return await this.filesModel.getAllFiles();
    }
  
    async getFileById(id) {
      return await this.filesModel.getFileById(id);
    }
  
    async createLessonFile(lessonData,files) {
    
    const videoFile = files.video ? {
      originalName: files.video[0].originalname,
      uuid: path.basename(files.video[0].filename, path.extname(files.video[0].filename)),
      extension: path.extname(files.video[0].filename) 
    } : null;

    const additionalFiles = files.files ? files.files.map(file => ({
      originalName: file.originalname,
      uuid: path.basename(file.filename, path.extname(file.filename)),
      extension: path.extname(file.filename) 
    })) : [];

    lessonData.video = videoFile;
    lessonData.files = additionalFiles;
    
    const filesRecords = await Promise.all([
      ...lessonData.files.map(file => this.filesModel.createFile({ id: file.uuid, name: this.decodeUtf8String(file.originalName), extension: file.extension })),
      this.filesModel.createFile({ id: lessonData.video.uuid, name:  this.decodeUtf8String(lessonData.video.originalName), extension: lessonData.video.extension, type: "video" })
    ]);
    

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
  