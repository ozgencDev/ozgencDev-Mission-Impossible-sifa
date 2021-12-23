const { getlogin, postlogin } = require("../Middleware/serverFunctionality");
const express = require("express");
const router = express.Router();

router.route("/login").get(getlogin).post(postlogin);

module.exports = router;
