const express = require("express");
const router = express.Router();
const { hello } = require("./controller/api.controller.js");
const { isAuthorized } = require("./middleware/validation.js");

router.route("/getUser").get(isAuthorized, hello);

module.exports = router;
