const {createPool} = require("mysql");
const mysql = require('mysql');


const pool = createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "new123",
  connectionLimit: 10,
})

pool.query(`select * from usersdb.tokens`, (err, res)=> {
  return console.log(res)
});


/*
let connection = mysql.createConnection({
  host: "localhost",
  port: 3306,
  database: "usersdb",
  user: "root",
  password: "q123",
});


  
connection.connect(function(err, res){
    console.log("connected");
});
*/
