const dotenv = require('dotenv');
dotenv.config();

const env = process.env;

const JWT_SECRET_KEY = env.JWT_SECRET_KEY;
const BCRYPT_SALT = Number(env.BCRYPT_SALT);
const JWT_LIFETIME = Number(env.JWT_LIFETIME);

module.exports = {
    JWT_SECRET_KEY,
    BCRYPT_SALT,
    JWT_LIFETIME
};