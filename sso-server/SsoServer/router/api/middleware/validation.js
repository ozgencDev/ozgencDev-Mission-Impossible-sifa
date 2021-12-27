const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../controller/models/userModel");
const axios = require("axios");

exports.isAuthorized = async (req, res, next) => {
  const authToken = req.headers["x-access-token"];
  const refreshToken = req.app.get("refresh");
  const redirectURL = `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`; //Buraya bak redirect doğru olmazsa
  if (!refreshToken || !authToken) {
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
    /*return res.status(401).json({
      error: true,
      message: "Invalid token.",
    });*/
    if (err.message === "jwt expired") {
      await axios
        .get(`http://127.0.0.1:3010/auth/verifyToken`, {
          headers: {
            Refresh: refreshToken,
          },
        })
        .then((jsonData) => {
          req.headers["x-access-token"] = jsonData.data.Access;
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      return res.redirect(
        `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
      );
    }
  }
  next();
};
