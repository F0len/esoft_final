class LessonController {
    constructor(lessonService) {
      this.lessonService = lessonService;
    }
  
    getAllLessons = async (req, res) => {
      try {
        const lessons = await this.lessonService.getAllLessons();
        res.status(200).json(lessons);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    getLessonById = async (req, res) => {
      try {
        const { id } = req.params;
        const lesson = await this.lessonService.getLessonById(id);
        if (!lesson) {
          return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getLessonByCourseId = async (req, res) => {
      try {
        const { id } = req.params;
        const lesson = await this.lessonService.getLessonByCourseId(id);
        if (!lesson) {
          return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  

    createLesson = async (req, res) => {
      try {
        const lessonData = req.body;
        const [lesson] = await this.lessonService.createLesson(lessonData);
        res.status(201).json(lesson);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    updateLesson = async (req, res) => {
      try {
        const { id } = req.params;
        const lessonData = req.body;
        const [lesson] = await this.lessonService.updateLesson(id, lessonData);
        if (!lesson) {
          return res.status(404).json({ error: 'Lesson not found' });
        }
        res.status(200).json(lesson);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    deleteLesson = async (req, res) => {
      try {
        const { id } = req.params;
        await this.lessonService.deleteLesson(id);
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }
  
  module.exports = LessonController;
  