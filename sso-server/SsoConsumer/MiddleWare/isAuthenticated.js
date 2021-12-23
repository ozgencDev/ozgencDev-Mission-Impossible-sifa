const jwt = require("jsonwebtoken");
const fs = require("fs");
const isAuthenticated = (req, res, next) => {
  const authToken = req.signedCookies["authorization"];
  const redirectURL = `${req.protocol}://${req.headers.host}${req.path}`; //3020den istek yapıyoruz ama user olmadIğından
  //bizi ssoservera -> (http://localhost:3010) yönlendiriyor ama 3020 yi queryi alarak yönlendiriyor
  if (!authToken) {
    //ÖRN; (http://localhost:3010/simplesso/login?redirectTo=http://localhost:3020/)
    return res.redirect(
      `http://localhost:3010/login?serviceURL=${redirectURL}`
    );
  }
  console.log(redirectURL);
  try {
    jwt.verify(authToken, fs.readFileSync("./Keys/Public.key"));
  } catch (err) {
    return res.redirect(
      `http://localhost:3010/login?serviceURL=${redirectURL}`
    );
  }

  next();
};

module.exports = { isAuthenticated };
