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
      const {lesson, files} =  await this.courseModel.getCourseLessonById(id);
      // Обработка объектов lession
lesson.forEach(lesson => {
  // Фильтрация файлов для текущего lessonId
  const lessonFiles = files.filter(file => file.lessonId === lesson.id);

  // Найти видеофайл
  const videoFile = lessonFiles.find(file => file.type === 'video');
  
  // Формирование поля video
  if (videoFile) {
    lesson.video = {
      file_path: `${videoFile.id}${videoFile.extension}`,
      name: videoFile.name
    };
  }

  // Формирование поля additionalFiles
  lesson.additionalFiles = lessonFiles
    .filter(file => file.type !== 'video')
    .map(file => ({
      file_path: `${file.id}${file.extension}`,
      name: file.name
    }));
});
      return lesson;
    }
    async getCourseHomeworkById(id){
      return await this.courseModel.getCourseHomeworkById(id);
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
  