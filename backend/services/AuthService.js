const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { v4: uuidv4 } = require('uuid');

class AuthService {
  constructor(userModel, secretKey) {
    this.userModel = userModel;
    this.secretKey = secretKey;
  }
  generateAccessToken(user) {
    return jwt.sign({ id: user.id, login: user.login }, this.secretKey, { expiresIn: '30m' });
  }

  generateRefreshToken(user) {
    return jwt.sign({ id: user.id, login: user.login }, this.secretKey, { expiresIn: '7d' });
  }
  
  async login(login, password) {
    const user = await this.userModel.getUserByLogin(login);
    if (!user) {
      throw new Error('User not found');
    }
    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error('Invalid password');
    }
    
    const accessToken = this.generateAccessToken(user);
    const refreshToken = this.generateRefreshToken(user);
    delete user.password;
    return { accessToken,refreshToken , user };
  }

  async registerUser(user) {
    const id = uuidv4();
    const hashedPassword = await bcrypt.hash(user.password, 10);
    const newUser = {
      id: id,
      name: user.name,
      login: user.login,
      password: hashedPassword,
      telegram: user.telegram,
      roles: ["student"],
    };
    await this.userModel.createUser(newUser);
    return newUser;
  }
}

module.exports = AuthService;
