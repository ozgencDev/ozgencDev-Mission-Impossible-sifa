const jwt = require("jsonwebtoken");
const fs = require("fs");
const axios = require("axios");
const path = require("path");
const Cookies = require("cookies");
const { json } = require("express/lib/response");
exports.isAuthorized = async (req, res, next) => {
  const authToken = req.signedCookies["Authorization"];
  //console.log("ILKTanım>>>>>" + authToken);
  /*var cookies = new Cookies(req, res, { keys: keys });
  const authToken = cookies.get("Authorization", { signed: true });*/
  const refreshToken = req.app.get("refresh");
  console.log("REFRESH>>>>" + refreshToken);
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`; //Buraya bak redirect doğru olmazsa
  if (!refreshToken) {
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
          console.log(jsonData.data.Access);
          //console.log("THEN İÇİ>>>>>" + authToken);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }
  next();
};
