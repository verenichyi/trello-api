const path = require('path');
const uuid = require('uuid');
const bcrypt = require('bcrypt');
const { getDataFromFile, saveDataToFile } = require('../../utils');
const {
  generateToken,
  saveTokenToFile,
  removeToken,
  validateToken,
} = require('./token-service');
const ApiError = require('../../exceptions/ApiError');
const { salt } = require('../../constants');

const usersPath = path.resolve(__dirname, '..', 'data', 'users.json');

class AuthService {
  async register(email, password, role = 'user') {
    const users = await getDataFromFile(usersPath);
    const candidate = users.find((user) => user.email === email);
    if (candidate) {
      throw ApiError.BadRequest(`User with email ${email} exists!`);
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const user = {
      id: uuid.v4(),
      email,
      password: hashedPassword,
      role,
    };

    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken(userData);

    await saveDataToFile(usersPath, [...users, user]);
    await saveTokenToFile(user.id, token);

    return {
      user: userData,
      token,
    };
  }

  async login(email, password) {
    const users = await getDataFromFile(usersPath);
    const user = users.find((user) => user.email === email);
    if (!user) {
      throw ApiError.BadRequest(`User with email ${email} doesn't exist!`);
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      throw ApiError.BadRequest(`Password is incorrect!`);
    }

    const userData = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    const token = generateToken({ ...userData });
    await saveTokenToFile(userData.id, token);

    return {
      user: userData,
      token,
    };
  }

  async logout(token) {
    const userData = validateToken(token);
    await removeToken(token);

    return userData;
  }
}

module.exports = new AuthService();
