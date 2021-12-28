const crypto = require("crypto");

/* create random salt string */
const genSaltString = function (length) {
  return crypto
    .randomBytes(Math.ceil(length / 2))
    .toString("hex") /** convert to hexadecimal format */
    .slice(0, length); /** return required number of characters */
};

/* hash password */
const sha512 = function (password, salt) {
  let hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest("hex");
  return value;
};

/* hash middleware */
const saltHashPassword = (req, res, next) => {
  const userpassword = req.body.password;
  var salt = genSaltString(16);
  var passwordHash = sha512(userpassword, salt);
  req.body.salt = salt;
  req.body.password = passwordHash;
  next();
};

module.exports = Object.assign({}, { saltHashPassword });
