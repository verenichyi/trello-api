const { register, login, logout } = require('../services/auth-service');
const { getAuthResponseText } = require('../../utils');
const { tokenCookieOptions, authResponses } = require('../../constants');
const { validate } = require('../../validators/validator');
const {
  registrationBodySchema,
  loginBodySchema,
} = require('../../validators/schemas/auth');

class AuthController {
  async register(req, res, next) {
    try {
      validate(registrationBodySchema, req.body);

      const { email, password, role } = req.body;
      const user = await register(email, password, role);

      res.cookie('token', user.token, tokenCookieOptions);
      res.json(getAuthResponseText(email, authResponses.registration));
    } catch (e) {
      next(e);
    }
  }

  async login(req, res, next) {
    try {
      validate(loginBodySchema, req.body);

      const { email, password } = req.body;
      const user = await login(email, password);

      res.cookie('token', user.token, tokenCookieOptions);
      res.json(getAuthResponseText(email, authResponses.login));
    } catch (e) {
      next(e);
    }
  }

  async logout(req, res, next) {
    try {
      const { token } = req.cookies;
      const { email } = await logout(token);

      res.clearCookie('token');
      res.json(getAuthResponseText(email, authResponses.logout));
    } catch (e) {
      next(e);
    }
  }
}

module.exports = new AuthController();
