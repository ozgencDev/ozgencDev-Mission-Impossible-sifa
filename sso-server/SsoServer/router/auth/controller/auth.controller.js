const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/userModel");

exports.html = (req, res) => {
  res.send(`
    <form method="POST" >
      <input type="text" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <input type="submit" value="Login" />
    </form>
  `);
};

exports.login = async (req, res) => {
  const referer = req.headers.referer;
  let redirect;
  if (typeof referer == "string") {
    const { serviceURL } = url.parse(referer, true).query;
    redirect = serviceURL;
  } else {
    const { serviceURL } = req.query;
    redirect = serviceURL;
  }
  const { username, password } = req.body;

  User.login(username, password, (err, data) => {
    if (username === data.username && password === data.password) {
      const secret = fs.readFileSync(__dirname + "/Keys/Private.key");

      const accessToken = jwt.sign({ UID: data.id }, secret, {
        expiresIn: "1d",
        algorithm: "RS256",
      });

      res.cookie("authorization", accessToken, {
        httpOnly: true,
        signed: true,
      });

      res.redirect(redirect);

      return;
    }
    console.log("4");
    res.status(401).send("Invalid username or password");
  });
};

exports.logout = (req, res) => {
  res.clearCookie("authorization");
  res.send("Logged out");
};

exports.hello = (req, res) => {
  res.send("Hello World from Auth");
};
