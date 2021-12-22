const express = require('express');
const mysql = require('mysql');
const dotenv = require('dotenv')
const morgan = require('morgan')
const cors = require('cors')
const {createPool} = require("mysql");

const app = express();

// const usersRoute = require('./routes/users')

const dbConfig = createPool({
  host: "localhost",
  user: "root",
  port: 3306,
  database: "usersdb",
  password: "new123",
  connectionLimit: 10,
})


//cors options
const corsOptions = {
  origin: "http://localhost:3306"
};

app.use(cors(corsOptions));

// Create a connection to the database
const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  port: 3306,
  password: "new123",
  database: "usersdb",
});

// open the MySQL connection
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(morgan('common'));

//create db
app.get('/createdb', (req, res) => {
    let sql = 'CREATE DATABASE Users';
    connection.query(sql, (err, result) => {
        if (err) throw err;
        console.log(result);
        res.send('Database created...');
    });
});


// simple route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to mission impossible application." });
});


require("./routes/user.routes.js")(app);

// app.use('/api/users', usersRoute)

const PORT = process.env.PORT || 3306;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});