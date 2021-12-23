const express = require("express");
const session = require("express-session");
const router = express.Router();
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const { postlogin, logout } = require("./Middleware/serverFunctionality.js");

const app = express();

app.use(cookieParser("your-secret"));

/* Middleware */
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(morgan("dev"));
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);

app.get("/login", (req, res) => {
  res.send(`
  
  <div>
  <h1>Login</h1>
    <form action="/login" method="post">
        <input type="text" name="email" placeholder="email" />
        <input type="password" name="password" placeholder="password" />
        <input type="submit" value="Login" />
    </form>
  
  </div>
  
  `);
});

app.post("/login", postlogin);

//logout middleware
app.get("/logout", logout);

app.listen(3010, () => {
  console.log("Server is running on port 3010 -- Server");
});
