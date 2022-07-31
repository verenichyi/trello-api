const { createLogger, format, transports } = require('winston');

function buildDevLogger() {
  const logFormat = format.printf(
    ({ level, message }) => `${level}: ${message}`
  );

  const logger = createLogger({
    level: 'http',
    format: logFormat,
    transports: [new transports.Console()],
  });

  return logger;
}

module.exports = buildDevLogger;
