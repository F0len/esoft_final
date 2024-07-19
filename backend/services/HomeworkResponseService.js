class HomeworkResponseService {
  constructor(homeworkResponseModel) {
    this.homeworkResponseModel = homeworkResponseModel;
  }

  async getAllResponsesByUserIdAndHomeworkId(userId, homeworkId) {
    return await this.homeworkResponseModel.getAllResponsesByUserIdAndHomeworkId(userId, homeworkId);
  }

  async getAllResponsesByHomeworkId(homeworkId) {
    return await this.homeworkResponseModel.getAllResponsesByHomeworkId(homeworkId);
  }

  async createResponse(responseData) {
    responseData.status = "Отправлено";
    return await this.homeworkResponseModel.createResponse(responseData);
  }

  async updateResponse(id, responseData) {
    return await this.homeworkResponseModel.updateResponse(id, responseData);
  }

  async deleteResponse(id) {
    return await this.homeworkResponseModel.deleteResponse(id);
  }
}

module.exports = HomeworkResponseService;
