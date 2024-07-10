class LessonService {
    constructor(lessonModel) {
      this.lessonModel = lessonModel;
    }
  
    async getAllLessons() {
      return await this.lessonModel.getAllLessons();
    }
  
    async getLessonById(id) {
      return await this.lessonModel.getLessonById(id);
    }
  
    async createLesson(lessonData) {
      return await this.lessonModel.createLesson(lessonData);
    }
  
    async updateLesson(id, lessonData) {
      return await this.lessonModel.updateLesson(id, lessonData);
    }
  
    async deleteLesson(id) {
      return await this.lessonModel.deleteLesson(id);
    }
  }
  
  module.exports = LessonService;
  