const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/userModel");
const hashPassword = require("../middleware/compareHash");
const { getCleanUser } = require("../middleware/utils");

Tokens = [];
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
    if (err) {
      res.status(500).send(err);
      return;
    }
    if (data === null) {
      res.status(401).send({
        message: "Username or password is incorrect",
      });
      return;
    }
    const salt = data.salt; //sql squry salt
    const hashedPassword = data.password; //sql query hashPassword
    const newGenHashPassword = hashPassword(password, salt); //new hash and salt with user password
    if (username === data.username && hashedPassword === newGenHashPassword) {
      const user = getCleanUser(data);
      const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
      const accessToken = jwt.sign(
        { UID: data.id, userType: data.user_type },
        secret,
        {
          expiresIn: "15s",
          algorithm: "RS256",
        }
      );
      const refreshSecret = fs.readFileSync(
        __dirname + "/Keys/refreshToken.key"
      );
      const refreshToken = jwt.sign(
        { UID: data.id, userType: data.user_type },
        refreshSecret,
        {
          algorithm: "RS256",
        }
      );
      Tokens.push(refreshToken);
      req.app.set("refresh", refreshToken);
      res.json(Object.assign({ accessToken }, user));
      return;
    }
    res.status(401).send("Invalid username or password");
  });
};

exports.verifyToken = (req, res) => {
  const axiosToken = req.headers.refresh;
  if (axiosToken == null || Tokens.length === 0) {
    return res.status(400).json({ message: "badRequest" });
  }
  /*const data = jwt.verify(axiosToken, "/Keys/refreshTokenPublic.key", {
    algorithms: "RS256",
  });
  const payload = data.UID;*/
  const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
  const accessToken = jwt.sign({ UID: "asdfh" }, secret, {
    expiresIn: "15s",
    algorithm: "RS256",
  });
  return res.status(200).json({ Access: accessToken });
};
