const jwt = require("jsonwebtoken");

const secret = fs.readFileSync("./Keys/Private.key");
const token = jwt.sign({ UID: db.UID }, secret, {
  algorithm: "RS256",
});

module.exports = token;
