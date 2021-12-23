const express = require("express");
const cookieParser = require("cookie-parser");
const { isAuthenticated } = require("./Middleware/isAuthenticated");
const morgan = require("morgan");

const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cookieParser("your-secret"));
app.use(morgan("dev"));

app.get("/getUser", isAuthenticated, (req, res) => {
  res.json({ message: "Hello World" });
});

app.listen(3020, () => {
  console.log("Server is running on port 3020 -- Consumer");
});
