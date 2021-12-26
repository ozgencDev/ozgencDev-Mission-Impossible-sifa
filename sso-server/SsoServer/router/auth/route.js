const express = require("express");
const router = express.Router();
const { login, verifyToken } = require("./controller/auth.controller.js");

router.route("/login").post(login);
router.route("/verifyToken").post(verifyToken);

module.exports = router;
