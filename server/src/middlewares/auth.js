import { verifyToken } from "../utils/verifyToken.js";
import { query } from "../utils/databaseQuery.js";

export async function isLogged(req, res, next) {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({ message: "401 Access denied. No token provided." });
        }
        const token = authHeader.split(" ")[1];
        const decoded = await verifyToken(token);
        if (decoded === false) return res.status(401).json({ message: "401 Invalid token." });
        if (decoded === null) return res.status(401).json({ message: "401 Token expired." });
        const rows = await query("SELECT * FROM users WHERE id = ?", [decoded.id]);
        if (rows.length == 0 || rows[0].deleted) return res.status(401).json({ message: "401 Deleted user." });
        req.sessionUser = {
            id: rows[0].id,
            username: rows[0].username,
        };
        return next();
    }
    catch (err) {
        return res.status(401).json({ message: "401 Access denied. No token provided." });
    }
}