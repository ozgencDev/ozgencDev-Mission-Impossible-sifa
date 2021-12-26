const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const Cookies = require("cookies");
const { json } = require("express/lib/response");
exports.isAuthorized = async (req, res, next) => {
  const authToken = req.signedCookies["Authorization"];
  const refreshToken = req.app.get("refresh");
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`;
  if (!refreshToken || !authToken) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  try {
    jwt.verify(
      authToken,
      fs.readFileSync(__dirname + "/Keys/accessPublic.key"),
      {
        algorithms: "RS256",
      }
    );
    jwt.verify(
      refreshToken,
      fs.readFileSync(__dirname + "/Keys/refreshPublic.key"),
      {
        algorithms: "RS256",
      }
    );
  } catch (err) {
    if (err.message === "jwt expired") {
      await axios
        .get(`http://127.0.0.1:3010/auth/verifyToken`, {
          headers: {
            Refresh: refreshToken,
          },
        })
        .then((jsonData) => {
          res.cookie("Authorization", jsonData.data.Access, {
            httpOnly: true,
            signed: true,
            overwrite: true,
          });
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
