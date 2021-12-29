const express = require("express");
const session = require("express-session");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const authRoute = require("./router/auth/route");
const apiRoute = require("./router/api/route");
const { reqLogger, errLogger } = require("./Utils/logger");
require("dotenv").config();
const cors = require("cors");

const app = express();

const PORT = process.env.PORT || 3000;
/* Middleware */
app.use(cors());
app.use(cookieParser("your-secret"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: "keyboard cat",
    resave: false,
    saveUninitialized: true,
  })
);
app.use(reqLogger);

app.use("/auth", authRoute);
app.use("/api", apiRoute);

/* test route */
app.get("/hello", (req, res) => {
  res.status(404).send("Hello World");
});

app.use(errLogger);

app.listen(PORT, () => {
  console.log(`Server is running on ${PORT} -- Server`);
});
