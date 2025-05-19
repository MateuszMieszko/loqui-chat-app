import { query, dateToTimestamp } from "./databaseQuery.js";
import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/auth.config.js";

export async function addTokenToBlacklist(token, reason=null) {
    await removeExpiredTokens();
    if (!token) return;

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        // const issuedAt = new Date(decoded.iat * 1000);
        const expiresAt = new Date(decoded.exp * 1000);
        const now = new Date();
        if (expiresAt < now) return;

        const sqlQuery = "INSERT INTO blacklisted_tokens (token, expires_at, reason) VALUES (?, ?, ?)";
        const params = [token, dateToTimestamp(expiresAt), reason];

        const rows = await query(sqlQuery, params);
    }
    catch (err) {
        console.error('Error occured during adding token to blacklist:', err);
        return;
    }
}

export async function isTokenBlacklisted(token) {
    if (!token) return false;

    try {
        const sqlQuery = "SELECT 1 FROM blacklisted_tokens WHERE token = ?";
        const params = [token];

        const rows = await query(sqlQuery, params);

        return rows.length > 0;
    }
    catch (err) {
        console.error('Error occured during checking if token is blacklisted:, err');
        return false;
    }
}

export async function removeExpiredTokens() {
    try {
        const sqlQuery = "DELETE FROM blacklisted_tokens WHERE expires_at IS NOT NULL AND expires_at < NOW()";

        const rows = await query(sqlQuery);
        console.log(`Deleted ${rows.affectedRows || 0} expired tokens.`);
    }
    catch (err) {
        console.error('Error occured during deleting expired tokens:', err);
        return;
    }
}