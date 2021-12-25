const jwt = require("jsonwebtoken");
const fs = require("fs");
const User = require("../controller/models/userModel");

exports.isAuthorized = async (req, res, next) => {
  const authToken = req.signedCookies["authorization"];

  const redirectURL = `${req.protocol}://${req.headers.host}${req._parsedOriginalUrl.path}`; //Buraya bak redirect doğru olmazsa
  if (!authToken) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }

  try {
    const payload = jwt.verify(
      authToken,
      fs.readFileSync(__dirname + "/Keys/Public.key")
    );
    console.log(payload);
    const { userType, UID } = payload;
    req.session.userType = userType;
    req.session.userID = UID;
    //refreshtoken için api endpoint ekle o id için sorgu atılacak ve autha bi şekilde gönderilecek sanosam axios la daha sonra verified edilecek authta yeni access token gönderilecek
  } catch (err) {
    return res.redirect(
      `http://localhost:3010/auth/login?serviceURL=${redirectURL}`
    );
  }
  next();
};
