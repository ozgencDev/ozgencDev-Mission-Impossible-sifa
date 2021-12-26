const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../controller/models/userModel");
const axios = require("axios");

exports.isAuthorized = async (req, res, next) => {
  const authToken = req.headers["x-access-token"];

  const redirectURL = `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`; //Buraya bak redirect doğru olmazsa
  if (!authToken) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  try {
    const payload = jwt.verify(
      authToken, //apiye yapılan istek içinde bilgide taşıyor
      fs.readFileSync(__dirname + "/Keys/Public.key")
    );
    const { userType, UID } = payload;
  } catch (err) {
    return res.status(401).json({
      error: true,
      message: "Invalid token.",
    });
  }
  next();
};
