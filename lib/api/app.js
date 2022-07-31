const express = require('express');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const router = require('./routes');
const errorMiddleware = require('../middlewares/error-middleware');
const logger = require('../middlewares/logger');
const { defaultPort } = require('../constants');

class App {
  constructor() {
    this.app = express();
    this.PORT = process.env.PORT || defaultPort;
  }

  connectMiddlewares() {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  connectRouter() {
    this.app.use(router);
  }

  connectErrorMiddleware() {
    this.app.use(errorMiddleware);
  }

  async listen() {
    try {
      this.app.listen(this.PORT, () =>
        logger.info(`Server has started on port: ${this.PORT}`)
      );
    } catch (e) {
      logger.error(e);
    }
  }
}

module.exports = new App();
