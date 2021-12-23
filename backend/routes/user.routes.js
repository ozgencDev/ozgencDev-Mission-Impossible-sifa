module.exports = app => {
  const users = require("../controllers/user.controller.js");

  var router = require("express").Router();

  // Create a new user
  router.post("/", users.createuser);

  // Delete a user with id
  router.delete("/delete-user/:id", users.deleteuser);

  // Update a user with id
  router.put("/update-user/:id", users.updateuser);

  // Retrieve all users
  router.get("/users", users.getListOfUsers);

  // Retrieve a single user with id
  router.get("/user/:id", users.getUserInfo);

  app.use('/api/users', router);
};