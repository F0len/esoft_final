const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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
    return { accessToken,refreshToken , user };
  }

  //уже скорее всего не нужен
  async refreshToken(refreshToken) {
    if (!refreshToken) {
      throw new Error('Access Denied. No refresh token provided.');
    }

    let user;
    try {
      user = jwt.verify(refreshToken,  this.secretKey);
    } catch (err) {
      throw new Error('Invalid refresh token');
    }
    const newAccessToken = this.generateAccessToken(user);
    

    return {newAccessToken, user };
  }
}

module.exports = AuthService;
