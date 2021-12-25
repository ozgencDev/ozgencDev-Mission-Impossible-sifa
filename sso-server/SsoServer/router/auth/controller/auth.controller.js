const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/userModel");
const hashPassword = require("../middleware/compareHash");

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

  User.login(username, (err, data) => {
    console.log("1. kısım", data);

    const salt = data.salt; //sql squry salt
    console.log("2. kısım");
    const hashedPassword = data.password; //sql query hashPassword
    const newGenHashPassword = hashPassword(password, salt); //new hash and salt with user password
    if (username === data.username && hashedPassword === newGenHashPassword) {
      //compare newGenHashPassword with hashedPassword in database
      const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
      const refreshSecret = fs.readFileSync(
        __dirname + "/Keys/refreshToken.key"
      );
      const accessToken = jwt.sign(
        { UID: data.id, userType: data.user_type },
        secret,
        {
          expiresIn: "1d",
          algorithm: "RS256",
        }
      );
      const refreshToken = jwt.sign({ UID: data.id }, refreshSecret, {
        expiresIn: "7d",
        algorithm: "RS256",
      });

      res.cookie("authorization", accessToken, {
        httpOnly: true,
        signed: true,
      });

      res.redirect(redirect);

      return;
    }
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
