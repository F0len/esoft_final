class HomeworkResponseModel {
  constructor(knex) {
    this.knex = knex;
  }

  async getAllResponsesByUserIdAndHomeworkId(userId, homeworkId) {
    return await this.knex('homework_response')
      .where({ user_id: userId, homework_id: homeworkId })
      .select('*');
  }

  async getAllResponsesByHomeworkId(homeworkId) {
    return await this.knex('homework_response')
    .join('user', 'user.id', '=', 'homework_response.user_id')
      .where('homework_response.homework_id', homeworkId)
      .select('homework_response.*', 'user.name', 'user.telegram');
  }

  async createResponse(responseData) {
    return await this.knex('homework_response')
      .insert(responseData)
      .returning('*');
  }

  async updateResponse(id, responseData) {
    return await this.knex('homework_response')
      .where('id', id)
      .update(responseData)
      .returning('*');
  }

  async deleteResponse(id) {
    return await this.knex('homework_response')
      .where('id', id)
      .del();
  }
}

module.exports = HomeworkResponseModel;
