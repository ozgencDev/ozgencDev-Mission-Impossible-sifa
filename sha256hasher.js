/*
const crypto = require('crypto');
let password = 'mypassword123';
let hash = crypto.createHmac('sha256', 'password').update("asd").digest('hex');
console.log(hash);
*/

const crypto = require("crypto");

// string to be hashed
const passwordVar = "Mypassword123";

// secret or salt to be hashed with
const salt = "My salt";

const sha256Hasher = crypto.createHmac("sha256", salt);

const hash = sha256Hasher.update(passwordVar).digest("hex");;

console.log(hash)