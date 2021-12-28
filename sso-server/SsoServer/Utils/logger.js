const winston = require("winston");
require("winston-mongodb");
const expreWinston = require("express-winston");
const { logger_mongodb } = require("./dbconfig");
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

/* request logger mw */
const reqLogger = expreWinston.logger({
  transports: [
    new winston.transports.Console({}),
    //transports
    new winston.transports.MongoDB(logger_mongodb),
  ],
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
  msg: function (req, res) {
    return `${req.headers["user-agent"]} ${req.ip} ${req.method} ${req.url} ${res.statusCode} ${res.statusMessage} `;
  },
  meta: false,
  expressFormat: false,
  colorize: false,
  exitOnError: false,
});

/* error logger mw */
const errLogger = expreWinston.errorLogger({
  transports: [
    new winston.transports.Console({}),
    //transports
    new winston.transports.MongoDB(logger_mongodb),
  ],
  exitOnError: false,
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),

  msg: "HTTP {{req.method}} {{req.url}} ",
  expressFormat: false,
  colorize: false,
});

module.exports = { reqLogger, errLogger };
