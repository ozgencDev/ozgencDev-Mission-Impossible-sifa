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
const { saltHashPassword } = require("./middleware/saltHash.js");
const { setPermission } = require("./middleware/permission.js");

router.route("/hello").get(hello);

router.route("/create").post(isAuthorized, saltHashPassword, createUser);

router.route("/delete/:id").delete(isAuthorized, setPermission, deleteUser);

router.route("/update/:id").put(isAuthorized, setPermission, updateUser);

router.route("/users").get(isAuthorized, getListOfUsers);

router.route("/user/:id").get(isAuthorized, getUserInfo);

module.exports = router;
