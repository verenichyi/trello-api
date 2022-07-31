const app = require('./api/app');

class Server {
  constructor() {
    this.app = app;
  }

  start() {
    this.app.connectMiddlewares();
    this.app.connectRouter();
    this.app.connectErrorMiddleware();
    this.app.listen();
  }
}

module.exports = new Server();
