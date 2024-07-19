class HomeworkResponseController {
  constructor(homeworkResponseService) {
    this.homeworkResponseService = homeworkResponseService;
  }

  getAllResponsesByUserIdAndHomeworkId = async (req, res) => {
    try {
      const { homeworkId } = req.params;
      const userId = req.user.id;
      const responses = await this.homeworkResponseService.getAllResponsesByUserIdAndHomeworkId(userId, homeworkId);
      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  getAllResponsesByHomeworkId = async (req, res) => {
    try {
      const { homeworkId } = req.params;
      const responses = await this.homeworkResponseService.getAllResponsesByHomeworkId(homeworkId);
      res.status(200).json(responses);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  createResponse = async (req, res) => {
    try {
      const responseData = req.body;
      responseData.user_id = req.user.id;
      const [response] = await this.homeworkResponseService.createResponse(responseData);
      res.status(201).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  updateResponse = async (req, res) => {
    try {
      const { id } = req.params;
      const responseData = req.body;
      const [response] = await this.homeworkResponseService.updateResponse(id, responseData);
      if (!response) {
        return res.status(404).json({ error: 'Response not found' });
      }
      res.status(200).json(response);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  deleteResponse = async (req, res) => {
    try {
      const { id } = req.params;
      await this.homeworkResponseService.deleteResponse(id);
      res.sendStatus(204);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
}

module.exports = HomeworkResponseController;
