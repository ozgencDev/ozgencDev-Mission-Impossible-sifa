const express = require("express");
const router = express.Router();
const {
  hello,
  deleteUser,
  updateUser,
  getListOfUsers,
  getUserInfo,
  createUser,
} = require("./controller/api.controller.js");
const { isAuthorized } = require("./middleware/validation.js");

router.route("/hello").get(hello);

router.route("/create").post(isAuthorized, createUser);

router.route("/delete").delete(isAuthorized, deleteUser);

router.route("/update").put(isAuthorized, updateUser);

router.route("/users").get(isAuthorized, getListOfUsers);

router.route("/user/:id").get(isAuthorized, getUserInfo);

console.log(
  hello,
  deleteUser,
  updateUser,
  getListOfUsers,
  getUserInfo,
  createUser
);

module.exports = router;
