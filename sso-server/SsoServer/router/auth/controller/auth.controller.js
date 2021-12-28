const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/usermodel");
const hashPassword = require("../middleware/comparehash");
const { getCleanUser } = require("../middleware/utils");

exports.login = async (req, res) => {
  const { username, password } = req.body;
  User.login(username, (err, data) => {
    try {
      if (err) {
        res.status(500).send(err);
        return;
      } else if (data === null) {
        res.status(401).send({
          message: "Username or password is incorrect",
        });
        return;
      }
      const hashedPassword = data.password; //sql query hashPassword
      const newGenHashPassword = hashPassword(password, data.salt); //new hash and salt with user password
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
        return;
      }
      res.status(401).send("Invalid username or password");
    } catch (e) {
      res.status(404).send(e);
    }
  });
};
