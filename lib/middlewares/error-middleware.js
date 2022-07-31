const ApiError = require('../exceptions/ApiError');
const logger = require('./logger');

module.exports = (error, req, res, next) => {
  if (error instanceof ApiError) {
    logger.error(error);

    next();
    return res.status(error.status).json({
      message: error.message,
      errors: error.errors,
    });
  }

  next();
  return res.status(500).json({ message: `Unknown error` });
};
