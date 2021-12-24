const jwt = require("jsonwebtoken");
const fs = require("fs");

const db = {
  UID: "BENUID98",
  email: "ozgencdev@gmail.com",
  password: "123456",
  refreshToken: "abcde",
};

const secret = fs.readFileSync("./Keys/Private.key");
const token = jwt.sign({ UID: db.UID }, secret, {
  expiresIn: "1d",
  algorithm: "RS256",
});

module.exports = token;
