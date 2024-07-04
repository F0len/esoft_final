class CourseService {
    constructor(courseModel) {
      this.courseModel = courseModel;
    }
  
    async getAllCourses() {
      return await this.courseModel.getAllCourses();
    }
  
    async getCourseById(id) {
      return await this.courseModel.getCourseById(id);
    }
  
    async createCourse(courseData) {
      const course = {
        ...courseData,
        status: 'Запланирован'
      };
      return await this.courseModel.createCourse(course);
    }
  
    async updateCourse(id, courseData) {
      return await this.courseModel.updateCourse(id, courseData);
    }
  
    async deleteCourse(id) {
      return await this.courseModel.deleteCourse(id);
    }
  }
  
  module.exports = CourseService;
  