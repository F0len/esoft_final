class CourseModel {
    constructor(knex) {
      this.knex = knex;
    }
  
    async getAllCourses() {
      return await this.knex('course').select('*');
    }
  
    async getCourseById(id) {
      return await this.knex('course').where('id', id).first();
    }

    async getUserCourseById(id) {
      try {
        const users = await this.knex('user')
          .join('course_user', 'user.id', '=', 'course_user.user_id')
          .select('user.id', 'user.name')
          .where('course_user.course_id', id);
    
        return users;
      } catch (err) {
        console.error('Error fetching users:', err);
        throw err;
      }
    }

    async getCourseUserById(id) {
      try {
        const course = await this.knex('course')
          .join('course_user', 'course.id', '=', 'course_user.course_id')
          .select('course.id', 'course.name', 'course.description')
          .where('course_user.user_id', id);
    
        return course;
      } catch (err) {
        console.error('Error fetching course:', err);
        throw err;
      }
    }
    async getCourseLessonById(id) {
      try {
        const course = await this.knex('course')
          .join('lesson', 'course.id', '=', 'lesson.course_id')
          .select('lesson.*')
          .where('course.id', id);
    
        return course;
      } catch (err) {
        console.error('Error fetching lesson:', err);
        throw err;
      }
    }
    async getCourseHomeworkById(id) {
      try {
        const course = await this.knex('course')
          .join('homework', 'course.id', '=', 'homework.course_id')
          .select('homework.*')
          .where('course.id', id);
    
        return course;
      } catch (err) {
        console.error('Error fetching homework:', err);
        throw err;
      }
    }
    
    async createUserCourse(user_course) {
      return await this.knex('course_user').insert(user_course).returning('*');
    }
    async createCourse(course) {
      return await this.knex('course').insert(course).returning('*');
    }
  
    async updateCourse(id, course) {
      return await this.knex('course').where('id', id).update(course).returning('*');
    }
  
    async deleteCourse(id) {
      return await this.knex('course').where('id', id).del();
    }
    async deleteUserCourse(course_id,user_id) {
      return await this.knex('course_user').where({course_id: course_id, user_id: user_id}).del();
    }
  }
  
  module.exports = CourseModel;
  