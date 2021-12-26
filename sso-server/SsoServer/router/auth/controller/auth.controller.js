const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const { signedCookies } = require("cookie-parser");
const { sign } = require("crypto");
const Cookies = require("cookies");

const refreshTokens = [];
var keys = ["keyboard cat"];
exports.html = (req, res) => {
  res.send(`
    <form method="POST" >
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="submit" value="Login" />
    </form>
  `);
};

exports.login = (req, res) => {
  const referer = req.headers.referer;
  let redirect;
  if (typeof referer == "string") {
    const { serviceURL } = url.parse(referer, true).query;
    redirect = serviceURL;
  } else {
    const { serviceURL } = req.query;
    redirect = serviceURL;
  }
  const { email, password } = req.body;
  if (email === db.email && password === db.password) {
    const secret = fs.readFileSync(__dirname + "/Keys/accessPrivate.key");
    const accessToken = jwt.sign({ UID: db.UID }, secret, {
      expiresIn: "15s",
      algorithm: "RS256",
    });
    /*var cookies = new Cookies(req, res, { keys: keys });
    cookies.set("Authorization", accessToken, { signed: true, httpOnly: true });*/
    res.cookie("Authorization", accessToken, {
      httpOnly: true,
      signed: true,
      overwrite: true,
    });
    /*req.session.token = accessToken;*/
    const refreshSecret = fs.readFileSync(
      __dirname + "/Keys/refreshPrivate.key"
    );

    const refreshToken = jwt.sign({ UID: db.UID }, refreshSecret, {
      algorithm: "RS256",
    });

    refreshTokens.push(refreshToken);
    req.app.set("refresh", refreshToken);
    return res.status(200).redirect(redirect);
  }
  return res.status(401).send("Invalid username or password");
};

exports.verifyToken = (req, res) => {
  const axiosToken = req.headers.refresh;
  if (axiosToken == null || refreshTokens.length === 0) {
    return res.status(400).json({ message: "badRequest" });
  }
  /*const data = jwt.verify(axiosToken, "/Keys/refreshPrivate.key", {
    algorithms: "RS256",
  });
  const payload = data.UID;*/
  const secret = fs.readFileSync(__dirname + "/Keys/accessPrivate.key");
  const accessToken = jwt.sign({ UID: db.UID }, secret, {
    expiresIn: "15s",
    algorithm: "RS256",
  });

  return res.status(200).json({ Access: accessToken });
};

exports.logout = (req, res) => {
  res.clearCookie("Authorization");
  res.send("Logged out");
};

exports.hello = (req, res) => {
  res.send("Hello World from Auth");
};

const db = {
  UID: "BENUID98",
  email: "ozgencdev@gmail.com",
  password: "123456",
};
