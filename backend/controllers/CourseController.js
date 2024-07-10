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
    getUserCourseById = async (req, res) => {
      try {
        const { id } = req.params;
        const users = await this.courseService.getUserCourseById(id);
        if (!users) {
          return res.status(404).json({ error: 'users not found' });
        }
        res.status(200).json(users);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    getCourseUserById = async (req, res) => {
      try {
        const id = req.user.id;
        const course = await this.courseService.getCourseUserById(id);
        if (!course) {
          return res.status(404).json({ error: 'course not found' });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };

    getCourseLessonById = async (req, res) => {
      try {
        const { id } = req.params;
        const course = await this.courseService.getCourseLessonById(id);
        if (!course) {
          return res.status(404).json({ error: 'course not found' });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    
    getCourseHomeworkById = async (req, res) => {
      try {
        const { id } = req.params;
        const course = await this.courseService.getCourseHomeworkById(id);
        if (!course) {
          return res.status(404).json({ error: 'course not found' });
        }
        res.status(200).json(course);
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
    };
    createUserCourse = async (req, res) => {
      try {
        const userCourseData = req.body;
        const [course] = await this.courseService.createUserCourse(userCourseData);
        res.status(201).json(course);
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

    deleteUserCourse = async (req, res) => {
      try {
        const { course_id,user_id} = req.params;
        await this.courseService.deleteUserCourse(course_id,user_id);
        res.sendStatus(204);
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
  