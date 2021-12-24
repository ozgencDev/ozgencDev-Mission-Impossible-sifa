const jwt = require("jsonwebtoken");
const fs = require("fs");
exports.isAuthorized = (req, res, next) => {
  const authToken = req.signedCookies["authorization"];
  console.log(req.headers);
  const redirectURL = `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`; //Buraya bak redirect doğru olmazsa
  if (!authToken) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  try {
    console.log("no token");
    jwt.verify(authToken, fs.readFileSync(__dirname + "/Keys/Public.key"));
  } catch (err) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  next();
};
