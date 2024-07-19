class HomeworkService {
    constructor(homeworkModel) {
      this.homeworkModel = homeworkModel;
    }
  
    async getAllHomeworks() {
      return await this.homeworkModel.getAllHomeworks();
    }
  
    async getHomeworkById(id) {
      return await this.homeworkModel.getHomeworkById(id);
    }
  
    async createHomework(homeworkData) {
      homeworkData.form = JSON.stringify(homeworkData.form);
      return await this.homeworkModel.createHomework(homeworkData);
    }
  
    async updateHomework(id, homeworkData) {
      return await this.homeworkModel.updateHomework(id, homeworkData);
    }
  
    async deleteHomework(id) {
      return await this.homeworkModel.deleteHomework(id);
    }
  }
  
  module.exports = HomeworkService;
  