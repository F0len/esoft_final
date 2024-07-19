const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('./knex/knex');
const cors = require('cors');
const multer = require('multer');
const { v4: uuidv4 } = require('uuid');
const path = require('path');


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
const createFilesRouter = require('./routes/filesRouter');
const createHomeworkResponseRouter = require('./routes/HomeworkResponseRouter');

const FilesModel = require('./models/FilesModel');
const FilesService = require('./services/FilesService');
const FilesController = require('./controllers/FilesController');

const HomeworkResponseModel = require('./models/HomeworkResponseModel');
const HomeworkResponseService = require('./services/HomeworkResponseService');
const HomeworkResponseController = require('./controllers/HomeworkResponseController');


const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
const corsOptions = {
  origin: 'http://127.0.0.1:8081', // Allow only your frontend domain
  credentials: true, // Allow cookies to be sent
};
app.use(cors(corsOptions));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/');
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${uuidv4()}${ext}`);
  }
});
const upload = multer({ storage: storage });

//Models
const userModel = new UserModel(knex);
const courseModel = new CourseModel(knex);
const lessonModel = new LessonModel(knex);
const homeworkModel = new HomeworkModel(knex);
const filesModel = new FilesModel(knex);
const homeworkResponseModel = new HomeworkResponseModel(knex);

//Services
const authService = new AuthService(userModel, secretKey);
const userService = new UserService(userModel);
const courseService = new CourseService(courseModel);
const lessonService = new LessonService(lessonModel);
const homeworkService = new HomeworkService(homeworkModel);
const filesService = new FilesService(filesModel);
const homeworkResponseService = new HomeworkResponseService(homeworkResponseModel);

//Controllers
const authController = new AuthController(authService);
const userController = new UserController(userService);
const courseController = new CourseController(courseService);
const lessonController = new LessonController(lessonService);
const homeworkController = new HomeworkController(homeworkService);
const filesController = new FilesController(filesService);
const homeworkResponseController = new HomeworkResponseController(homeworkResponseService);

//Routes
app.use('/api', createAuthRouter(authController));
app.use('/api/users', createUserRouter(userController));
app.use('/api/courses', createCourseRouter(courseController, tokenService));
app.use('/api/lessons', createLessonRouter(lessonController, tokenService));
app.use('/api/homeworks', createHomeworkRouter(homeworkController,tokenService));
app.use('/api/files', upload.fields([{ name: 'video' }, { name: 'files' }]) ,createFilesRouter(filesController, tokenService));
app.use('/api/homework-response', createHomeworkResponseRouter(homeworkResponseController,tokenService));



const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
