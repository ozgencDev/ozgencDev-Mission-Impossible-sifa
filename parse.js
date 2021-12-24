const fs = require('fs');

let array = fs.readFileSync('./access.txt').toString().split("\n");

module.exports = array;