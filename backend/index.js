const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('./knex/knex');
const cors = require('cors');

const secretKey = '4j2h9urhkd9unjksd0953ho';

const UserModel = require('./models/UserModel');
const CourseModel = require('./models/CourseModel');
const LessonModel = require('./models/LessonModel');
const HomeworkModel = require('./models/HomeworkModel');

const AuthService = require('./services/AuthService');
const UserService = require('./services/UserService');
const CourseService = require('./services/CourseService');
const LessonService = require('./services/LessonService');
const HomeworkService = require('./services/HomeworkService');

const TokenService = require('./services/TokenService'); 

const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const CourseController = require('./controllers/CourseController');
const LessonController = require('./controllers/LessonController');
const HomeworkController = require('./controllers/HomeworkController');


const tokenService = new TokenService(secretKey);

const createAuthRouter = require('./routes/authRouter');
const createUserRouter = require('./routes/userRouter');
const createCourseRouter = require('./routes/courseRoutes');
const createLessonRouter = require('./routes/lessonRouter');
const createHomeworkRouter = require('./routes/homeworkRouter');


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());


//Models
const userModel = new UserModel(knex);
const courseModel = new CourseModel(knex);
const lessonModel = new LessonModel(knex);
const homeworkModel = new HomeworkModel(knex);

//Services
const authService = new AuthService(userModel, secretKey);
const userService = new UserService(userModel);
const courseService = new CourseService(courseModel);
const lessonService = new LessonService(lessonModel);
const homeworkService = new HomeworkService(homeworkModel);

//Controllers
const authController = new AuthController(authService);
const userController = new UserController(userService);
const courseController = new CourseController(courseService);
const lessonController = new LessonController(lessonService);
const homeworkController = new HomeworkController(homeworkService);

//Routes
app.use('/api', createAuthRouter(authController));
app.use('/api/users', createUserRouter(userController));
app.use('/api/courses', createCourseRouter(courseController, tokenService));
app.use('/api/lessons', createLessonRouter(lessonController));
app.use('/api/homeworks', createHomeworkRouter(homeworkController));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
