const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/userModel");
const hashPassword = require("../middleware/compareHash");
const { getCleanUser } = require("../middleware/utils");

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
    }
    if (data === null) {
      res.status(401).send({
        message: "Username or password is incorrect",
      });
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
          expiresIn: "1d",
          algorithm: "RS256",
        }
      );
      res.json(Object.assign({ accessToken }, user));
    }
    res.status(401).send("Invalid username or password");
  });
};
