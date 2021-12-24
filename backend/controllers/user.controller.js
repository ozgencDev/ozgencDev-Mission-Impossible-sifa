const User = require("../models/user.model.js");

// Create and Save a new user
exports.createuser = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a User
  const user = new User({
    username: req.body.username,
    user_name: req.body.user_name,
    user_surname: req.body.user_surname,
    password: req.body.password,
    email: req.body.email,
    user_type: req.body.user_type
  });

  // Save User in the database
  User.createuser(user, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while creating the User."
      });
    else res.send(data);
  });
};

// Delete a user with the specified id in the request
exports.deleteuser = (req, res) => {
  User.deleteuser(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete User with id " + req.params.id
        });
      }
    } else res.send({ message: `User was deleted successfully!` });
  });
};

// Update a user identified by the id in the request
exports.updateuser = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  User.updateuser(req.params.id, new User(req.body), (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error updating User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

// Retrieve all users from the database (with condition).
exports.getListOfUsers = (req, res) => {
  const username = req.query.username;

  User.getListOfUsers(username, (err, data) => {
    if (err)
      res.status(500).send({
        message: err.message || "Some error occurred while retrieving users."
      });
    else res.send(data);
  });
};

// Find a single user with a id
exports.getUserInfo = (req, res) => {
  User.getUserInfo(req.params.id, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User with id ${req.params.id}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User with id " + req.params.id
        });
      }
    } else res.send(data);
  });
};

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  User.login(username, password, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found User.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving User "
        });
      }
    }
    else res.send(data);
  });
};
