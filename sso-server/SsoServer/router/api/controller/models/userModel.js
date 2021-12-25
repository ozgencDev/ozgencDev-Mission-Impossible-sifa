const sql = require("../../../../db");

// constructor
const User = function (User) {
  // this.token = User.token;
  this.username = User.username;
  this.user_name = User.user_name;
  this.user_surname = User.user_surname;
  this.password = User.password;
  this.salt = User.salt;
  this.email = User.email;
  this.user_type = User.user_type;
};

User.createuser = (req, result) => {
  sql.query("INSERT INTO Users SET ?", req, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    // if (await User.findOne({ where: { username: req.body.username } })) {
    //   throw 'Username "' + req.body.username + '" is already taken';
    // }

    console.log("created User: ", { id: res.insertId, ...req });
    result(null, { id: res.insertId, ...req });
  });
};

User.deleteuser = (id, result) => {
  sql.query("DELETE FROM Users WHERE id = ?", id, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    if (res.affectedRows == 0) {
      // not found User with the id
      result({ kind: "not_found" }, null);
      return;
    }

    console.log("deleted User with id: ", id);
    result(null, res);
  });
};

User.updateuser = (id, User, result) => {
  sql.query(
    "UPDATE Users SET username = ?, user_name = ?, user_surname = ?, email = ?, user_type = ?, password = ?, salt = ?  WHERE id = ?",
    [
      User.username,
      User.user_name,
      User.user_surname,
      User.email,
      User.user_type,
      User.password,
      User.salt,
      id,
    ],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.affectedRows == 0) {
        // not found User with the id
        result({ kind: "not_found" }, null);
        return;
      }

      console.log("updated User: ", { id: id, ...User });
      result(null, { id: id, ...User });
    }
  );
};

User.getUserInfo = (id, result) => {
  sql.query(`SELECT * FROM Users WHERE id = ${id}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found User: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found User with the id
    result({ kind: "not_found" }, null);
  });
};

User.getListOfUsers = (username, result) => {
  let query = "SELECT * FROM Users";

  if (username) {
    query += ` WHERE name LIKE '%${username}%'`;
  }

  sql.query(query, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("Users: ", res);
    result(null, res);
  });
};

User.login = (username, result) => {
  sql.query(
    "SELECT * FROM Users WHERE username = ?",
    [username],
    (err, res) => {
      if (err) {
        console.log("error: ", err);
        result(null, err);
        return;
      }

      if (res.length > 0) {
        console.log("found User: ", res[0]);
        result(null, res[0]);
        return;
      }

      result({ kind: "not_found" }, null);
    }
  );
};

module.exports = User;
