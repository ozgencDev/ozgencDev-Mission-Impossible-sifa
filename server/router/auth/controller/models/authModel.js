const sql = require("../../../../db");

const authToken = function (authToken) {
  this.token = authToken.token;
  this.user_id = authToken.user_id;
};
authToken.createtoken = (req, result) => {
  const { token, user_id } = req;

  sql.query(
    "INSERT INTO tokens SET token = ?, user_id = ?",
    [token, user_id],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(err, null);
        return;
      }
      result(null, { id: res.insertId, ...req });
      return;
    }
  );
};

authToken.checkTokenByUserid = (id, result) => {
  sql.query(`SELECT * FROM tokens WHERE user_id = ${id}`, (err, res) => {
    if (err) {
      //console.log("error: ", err);
      result(err, null);
    }
    if (res.length) {
      result(null, true);
      return;
      console.log("true döndürüldü");
    }

    result({ kind: "not_found" }, null);
  });
};

module.exports = authToken;
