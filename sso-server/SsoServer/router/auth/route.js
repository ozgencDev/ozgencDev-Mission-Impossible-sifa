const express = require("express");
const router = express.Router();
const {
  login,
  refresh,
  getrefresh,
} = require("./controller/auth.controller.js");

router.route("/login").post(login);
router.route("/refresh").post(refresh);
router.route("/getrefresh").post(getrefresh);

module.exports = router;
