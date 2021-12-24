const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  hello,
  html,
} = require("./controller/auth.controller.js");

router.route("/login").get(html);
router.route("/login").post(login);
router.route("/logout").post(logout);
router.route("/hello").get(hello);

module.exports = router;
