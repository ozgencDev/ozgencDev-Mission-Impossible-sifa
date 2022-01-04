const winston = require("winston");

/* cloud mysql database connection info*/
const db_config = {
  host: "us-cdbr-east-05.cleardb.net",
  user: "b17bff729dbf7d",
  password: "38e7b9f6",
  database: "heroku_bc3792dceec74c1",
}; //.env

/* cloud mongodb database connetion info*/
const logger_mongodb = {
  level: "info",
  db: "mongodb+srv://alotech:alotech@logs.n6nu0.mongodb.net/main?retryWrites=true&w=majority", //.env
  collection: "logs",
  format: winston.format.combine(
    winston.format.json(),
    winston.format.timestamp()
  ),
};

module.exports = { db_config, logger_mongodb };
