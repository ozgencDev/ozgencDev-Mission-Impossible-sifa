const winston = require("winston");
require("winston-mongodb");
const { logger_mongodb } = require("./dbConfig");
var logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
    new winston.transports.MongoDB(logger_mongodb),
  ],
  exitOnError: false,
});

const mwLogger = (req, res, next) => {
  let msg = `${req.ip} ${req.method} ${req.originalUrl} `;
  logger.log("info", msg);
  next();
};

module.exports = mwLogger;
