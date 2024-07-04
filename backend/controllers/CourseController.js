class CourseController {
    constructor(courseService) {
      this.courseService = courseService;
    }
  
    getAllCourses = async (req, res) => {
      try {
        const courses = await this.courseService.getAllCourses();
        res.status(200).json(courses);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    getCourseById = async (req, res) => {
      try {
        const { id } = req.params;
        const course = await this.courseService.getCourseById(id);
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    createCourse = async (req, res) => {
      try {
        const courseData = req.body;
        const [course] = await this.courseService.createCourse(courseData);
        res.status(201).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    updateCourse = async (req, res) => {
      try {
        const { id } = req.params;
        const courseData = req.body;
        const [course] = await this.courseService.updateCourse(id, courseData);
        if (!course) {
          return res.status(404).json({ error: 'Course not found' });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  
    deleteCourse = async (req, res) => {
      try {
        const { id } = req.params;
        await this.courseService.deleteCourse(id);
        res.sendStatus(204);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
  }
  
  module.exports = CourseController;
  