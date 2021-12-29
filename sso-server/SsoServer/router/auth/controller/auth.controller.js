const fs = require("fs");
const url = require("url");
const jwt = require("jsonwebtoken");
const User = require("../../api/controller/models/usermodel");
const hashPassword = require("../middleware/comparehash");
const { getCleanUser } = require("../middleware/utils");
const authToken = require("./models/authModel");

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
            expiresIn: "5s",
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
            expiresIn: "7d",
            algorithm: "RS256",
          }
        );
        const token = new authToken({ token: refreshToken, user_id: data.id });
        authToken.createtoken(token, (err, data) => {
          if (err) {
            res.status(500).send({ message: err.message || "Error" });
            return;
          } else {
            res.json(Object.assign({ accessToken, refreshToken }, user));
            return;
          }
          //res.status(401).send("Invalid username or password");
        });
      }
    } catch (e) {
      res.status(404).send(e);
    }
  });
};

exports.refresh = async (req, res) => {
  const { refreshToken } = req.body;

  const refreshSecret = fs.readFileSync(
    __dirname + "/Keys/refreshTokenPublic.key"
  );
  try {
    const payload = jwt.verify(refreshToken, refreshSecret);

    authToken.checkTokenByUserid(payload.UID, (err, data) => {
      if (err) {
        res.status(501).send({ message: err.message || "Error" });
        return;
      } else {
        if (data) {
          const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
          const accessToken = jwt.sign(
            { UID: payload.UID, userType: payload.userType },
            secret,
            {
              expiresIn: "10s",
              algorithm: "RS256",
            }
          );
          res.status(200).json({ accessToken });
          return;
        } else {
          /* Buradayızzzzzzzzzzzzzzz */
          res.status(501).send("Refresh is not exist");
          return;
        }
      }
    });
  } catch (e) {
    res.status(301).send("Invalid refresh token");
    return;
  }
};
