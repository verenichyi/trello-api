const ApiError = require('../exceptions/ApiError');
const { requestMethods } = require('../constants');

module.exports = (role) => (req, res, next) => {
  if (req.method === requestMethods.options) {
    next();
  }

  try {
    const user = req.user;
    if (user.role !== role) {
      return next(ApiError.NoAccessError());
    }
    next();
  } catch (e) {
    return next(ApiError.UnauthorizedError());
  }
};
