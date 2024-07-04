const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const knex = require('./knex/knex');
const cors = require('cors');

const UserModel = require('./models/UserModel');
const AuthService = require('./services/AuthService');
const UserService = require('./services/UserService');
const AuthController = require('./controllers/AuthController');
const UserController = require('./controllers/UserController');
const createAuthRouter = require('./routes/authRouter');
const createUserRouter = require('./routes/userRouter');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());
app.use(cors());

const secretKey = 'your_secret_key';

//Models
const userModel = new UserModel(knex);

//Services
const authService = new AuthService(userModel, secretKey);
const userService = new UserService(userModel);

//Controllers
const authController = new AuthController(authService);
const userController = new UserController(userService);

//Routes
app.use('/api', createAuthRouter(authController));
app.use('/api/users', createUserRouter(userController));

const PORT = process.env.PORT || 3000;
const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
