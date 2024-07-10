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
    async getUserCourseById(id){
      return await this.courseModel.getUserCourseById(id);
    }
    async getCourseUserById(id){
      return await this.courseModel.getCourseUserById(id);
    }
    async getCourseLessonById(id){
      return await this.courseModel.getCourseLessonById(id);
    }
  
    async createCourse(courseData) {
      // const course = {
      //   ...courseData,
      //   status: 'Запланирован'
      // };
      return await this.courseModel.createCourse(courseData);
    }
  
    async createUserCourse(user_course) {
      return await this.courseModel.createUserCourse(user_course);
    }
  
    async updateCourse(id, courseData) {
      return await this.courseModel.updateCourse(id, courseData);
    }
  
    async deleteUserCourse(course_id, user_id) {
      return await this.courseModel.deleteUserCourse(course_id, user_id);
    }
    async deleteCourse(id) {
      return await this.courseModel.deleteCourse(id);
    }
  }
  
  module.exports = CourseService;
  