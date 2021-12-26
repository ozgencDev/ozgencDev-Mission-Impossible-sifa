const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
exports.isAuthorized = async (req, res, next) => {
  const authToken = req.signedCookies["authorization"];
  const refreshToken = req.app.get("refresh");
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`; //Buraya bak redirect doğru olmazsa
  if (!authToken) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  try {
    jwt.verify(
      authToken,
      fs.readFileSync(__dirname + "/Keys/accessPublic.key")
    );
  } catch (err) {
    console.log(err + "!!!!!!!!!!!!!!!!!!!!!!!");
    if (err.message === "jwt expired") {
      const response = await axios
        .get(`http://127.0.0.1:3010/auth/verifyToken`, {
          headers: {
            Refresh: refreshToken,
          },
        })
        .then(next())
        .catch((err) => {
          console.log(err);
        });
      const { token } = response.data;
      try {
        const decoded = await verifyJwtToken(token);
      } catch (err) {
        console.log("Couldnt verify token!");
        return res.redirect(
          `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
        );
      }
    }
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  next();
};
