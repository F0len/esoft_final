class HomeworkController {
    constructor(homeworkService) {
      this.homeworkService = homeworkService;
    }
  
    getAllHomeworks = async (req, res) => {
      try {
        const homeworks = await this.homeworkService.getAllHomeworks();
        res.status(200).json(homeworks);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getHomeworkById = async (req, res) => {
      try {
        const { id } = req.params;
        const homework = await this.homeworkService.getHomeworkById(id);
        if (!homework) {
          return res.status(404).json({ error: 'Homework not found' });
        }
        res.status(200).json(homework);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    createHomework = async (req, res) => {
      try {
        const homeworkData = req.body;
        const [homework] = await this.homeworkService.createHomework(homeworkData);
        res.status(201).json(homework);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    updateHomework = async (req, res) => {
      try {
        const { id } = req.params;
        const homeworkData = req.body;
        const [homework] = await this.homeworkService.updateHomework(id, homeworkData);
        if (!homework) {
          return res.status(404).json({ error: 'Homework not found' });
        }
        res.status(200).json(homework);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    deleteHomework = async (req, res) => {
      try {
        const { id } = req.params;
        await this.homeworkService.deleteHomework(id);
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }
  
  module.exports = HomeworkController;
  