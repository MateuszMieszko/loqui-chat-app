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
        const rows = await query("SELECT * FROM users WHERE id = ? AND deleted = 1", [decoded.id]);
        if (rows.length > 0) return res.status(401).json({ message: "401 Deleted user." });
        req.sessionUser = decoded;
        next();
    }
    catch (err) {
        res.status(401).json({ message: "401 Access denied. No token provided." });
    }
}
