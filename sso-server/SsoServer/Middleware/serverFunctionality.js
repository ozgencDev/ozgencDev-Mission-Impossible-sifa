const fs = require("fs");
const jwt = require("jsonwebtoken");

const db = {
  UID: "BENUID98",
  email: "ozgencdev@gmail.com",
  password: "123456",
};

const getlogin = (req, res) => {
  console.log(req.headers);
  const { serviceURL } = req.query;
  const { email, password } = req.body;
  res.redirect(serviceURL);
};

const postlogin = (req, res) => {
  console.log(req.headers);
  const index = req.headers.referer.indexOf("=");
  const serviceURL = req.headers.referer.slice(index + 1);
  console.log(serviceURL);
  const { email, password } = req.body;

  if (email === db.email && password === db.password) {
    const secret = fs.readFileSync("./Keys/Private.key");
    const token = jwt.sign({ UID: db.UID }, secret, {
      expiresIn: "1d",
      algorithm: "RS256",
    });
    res.cookie("authorization", token, { httpOnly: true, signed: true });
    res.redirect(serviceURL);
    return;
  }

  res.status(401).send("Invalid username or password");
};

//Burayı değiştir logout mantığın yanlış olabilir
const logout = (req, res) => {
  res.clearCookie("authorization");
  res.send("Logged out");
};

module.exports = Object.assign({}, { postlogin, logout });
