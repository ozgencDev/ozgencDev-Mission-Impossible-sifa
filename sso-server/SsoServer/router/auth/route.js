const express = require("express");
const router = express.Router();
const { login, refresh } = require("./controller/auth.controller.js");

router.route("/login").post(login);
router.route("/refresh").post(refresh);

module.exports = router;
