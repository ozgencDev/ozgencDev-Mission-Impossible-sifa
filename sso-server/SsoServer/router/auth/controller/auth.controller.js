const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");

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
    const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
    const refreshSecret = fs.readFileSync(__dirname + "/Keys/refreshToken.key");
    const accessToken = jwt.sign({ UID: db.UID }, secret, {
      expiresIn: "15s",
      algorithm: "RS256",
    });
    const refreshToken = jwt.sign({ UID: db.UID }, refreshSecret, {
      algorithm: "RS256",
    });
    res.cookie("authorization", accessToken, { httpOnly: true, signed: true });
    res.redirect(redirect);
    return;
  }
  res.status(401).send("Invalid username or password");
};

exports.logout = (req, res) => {
  res.clearCookie("authorization");
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
