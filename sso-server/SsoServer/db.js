const mysql = require("mysql");
const db_config = require("../SsoServer/Utils/dbConfig");

var connection = mysql.createPool(db_config, function (err) {
  if (err) {
    console.log("Error connecting to Db");
    return;
  }
  console.log("Connection established");
});

module.exports = connection;
