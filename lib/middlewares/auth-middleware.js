const ApiError = require('../exceptions/ApiError');
const { validateToken } = require('../api/services/token-service');
const { requestMethods } = require('../constants');

module.exports = (req, res, next) => {
  if (req.method === requestMethods.options) {
    next();
  }

  try {
    const { token } = req.cookies;
    const userData = validateToken(token);

    if (!token || !userData) {
      return next(ApiError.UnauthorizedError());
    }

    req.user = userData;
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
