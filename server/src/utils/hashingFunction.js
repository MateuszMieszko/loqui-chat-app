const crypto = require("crypto");
const bcrypt = require("bcrypt");
const { BCRYPT_SALT } = require("../configs/auth.config");


function shaHash(password) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

function shaCompare(enteredPassword, hashedPassword) {
    return shaHash(enteredPassword) === hashedPassword;
}

async function bcryptHash(password) {
    return await bcrypt.hash(password, BCRYPT_SALT);
}

async function bcryptCompare(enteredPassword, hashedPassword) {
    return await bcrypt.compare(enteredPassword, hashedPassword);
}

module.exports = {
    shaHash,
    shaCompare,
    bcryptHash,
    bcryptCompare
};
