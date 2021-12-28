const express = require("express");
const router = express.Router();
const {
  deleteUser,
  updateUser,
  getListOfUsers,
  getUserInfo,
  createUser,
} = require("./controller/api.controller.js");
const { isAuthorized } = require("./middleware/validation.js");
const { saltHashPassword } = require("./middleware/salthash.js");

router.route("/create").post(saltHashPassword, createUser);

router.route("/delete/:id").delete(isAuthorized, deleteUser);

router.route("/update/:id").put(isAuthorized, updateUser);

router.route("/users").get(isAuthorized, getListOfUsers);

router.route("/user/:id").get(isAuthorized, getUserInfo);

module.exports = router;
