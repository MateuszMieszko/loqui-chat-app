const jwt = require("jsonwebtoken");
const { JWT_SECRET_KEY } = require("../configs/auth.config");
const { isTokenBlacklisted } = require("./blacklistedTokens");

async function verifyToken(token) {
    if (!token) return false;

    try {
        const blacklisted = await isTokenBlacklisted(token);
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const expiresAt = new Date(decoded.exp * 1000);
        const now = new Date();
        if (now > expiresAt || blacklisted) return null;
        return decoded;
    }
    catch (err) {
        console.error('Error occured durign verifying token:', err);
        return false;
    }
}

module.exports = { verifyToken };