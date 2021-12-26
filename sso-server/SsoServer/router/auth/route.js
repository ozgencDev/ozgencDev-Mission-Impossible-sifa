const express = require("express");
const router = express.Router();
const {
  login,
  logout,
  hello,
  html,
  verifyToken,
} = require("./controller/auth.controller.js");

router.route("/login").get(html).post(login);
router.route("/logout").get(logout);
router.route("/hello").get(hello);
router.route("/verifyToken").get(verifyToken);

module.exports = router;
