const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoute = require("./router/auth/route");
const apiRoute = require("./router/api/route");
const logger = require("../SsoServer/Utils/logger");
const cors = require("cors");

const app = express();

/* Middleware */
app.use(cors());
app.use(cookieParser("your-secret"));
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
//app.use(logger);
app.use("/auth", authRoute);
app.use("/api", apiRoute);

app.listen(3010, () => {
  console.log("Server is running on port 3010 -- Server");
});

module.exports = app;
