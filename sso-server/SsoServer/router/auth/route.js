const express = require("express");
const router = express.Router();
const { login } = require("./controller/auth.controller.js");

router.route("/login").post(login);

module.exports = router;
