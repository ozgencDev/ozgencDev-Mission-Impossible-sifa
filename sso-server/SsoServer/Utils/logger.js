const winston = require("winston");
require("winston-mongodb");
const { logger_mongodb } = require("./dbConfig");
/* logger middleware config and transports logs to mongodb database */
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
    //transports
    new winston.transports.MongoDB(logger_mongodb),
  ],
  exitOnError: false,
});
/* logger middleware  */
const mwLogger = (req, res, next) => {
  let msg = `${req.ip} ${req.method} ${req.originalUrl} `;
  logger.log("info", msg);
  next();
};

module.exports = mwLogger;
