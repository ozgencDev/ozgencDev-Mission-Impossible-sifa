const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../controller/models/usermodel");

/* check if token is exist and verify */
exports.isAuthorized = async (req, res, next) => {
  const authToken = req.headers["x-access-token"];
  if (!authToken) {
    res.status(401).send({
      message: "Access denied. No token provided.",
    });
    return;
  }
  try {
    jwt.verify(authToken, fs.readFileSync(__dirname + "/Keys/Public.key"));
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Invalid token.",
    });
  }
  next();
};
