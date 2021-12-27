const mysql = require("mysql");

var db_config = {
  host: "us-cdbr-east-05.cleardb.net",
  user: "b17bff729dbf7d",
  password: "38e7b9f6",
  database: "heroku_bc3792dceec74c1",
};

var connection = mysql.createPool(db_config, function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

module.exports = connection;
