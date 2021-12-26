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
          expiresIn: "5s",
          algorithm: "RS256",
        }
      );
      const refreshSecret = fs.readFileSync(
        __dirname + "/Keys/refreshToken.key"
      );
      const refreshToken = jwt.sign({ ...data }, refreshSecret, {
        algorithm: "RS256",
      });

      res.json(Object.assign({ accessToken, refreshToken }, user));
      return;
    }
    res.status(401).send("Invalid username or password");
  });
};

exports.verifyToken = (req, res) => {
  const { Bearer } = req.body;

  if (Bearer == null) {
    return res.status(400).json({ message: "badRequest" });
  }
  const refreshKey = fs.readFileSync(__dirname + "/Keys/refreshPublic.key");
  const data = jwt.verify(Bearer, refreshKey, {
    algorithms: "RS256",
  });
  console.log(Object.assign(data, { refreshToken: Bearer }));
  const secret = fs.readFileSync(__dirname + "/Keys/Private.key");
  const accessToken = jwt.sign(
    Object.assign(data, { refreshToken: Bearer }),
    secret,
    {
      expiresIn: "5s",
      algorithm: "RS256",
    }
  );

  return res.status(200).json({ accessToken: accessToken });
};
