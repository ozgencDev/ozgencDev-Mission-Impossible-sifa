const winston = require("winston");

var logger = new winston.createLogger({
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.prettyPrint()
  ),
  transports: [
    /*    new winston.transports.File({
      level: "info",
      filename: "./logs/all-logs.log",
      handleExceptions: true,
      json: true,
      maxsize: 5242880, //5MB
      maxFiles: 5,
      colorize: false,
    }), */
    new winston.transports.Console({
      level: "debug",
      handleExceptions: true,
      json: false,
      colorize: true,
    }),
  ],
  exitOnError: false,
});

const mwLogger = (req, res, next) => {
  let msg = `${req.ip} ${req.method} ${req.originalUrl} `;
  logger.info(msg);
  next();
};

module.exports = mwLogger;
