const crypto = require("crypto");
/* compare hash input and database */
const sha512 = function (password, salt) {
  let hash = crypto.createHmac("sha512", salt); /** Hashing algorithm sha512 */
  hash.update(password);
  let value = hash.digest("hex");
  return value;
};

module.exports = sha512;
