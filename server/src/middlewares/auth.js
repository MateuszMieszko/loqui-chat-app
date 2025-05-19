import { verifyToken } from "../utils/verifyToken.js";

export function isLogged(req, res, next) {
    try {
        const token = req.body.token;
        const decoded = verifyToken(token);
        if (decoded === false) return res.status(401).json({ error: "Invalid token" });
        if (decoded === null) return res.status(401).json({ error: "Token expired" });
        req.sessionUser = decoded;
        next();
    }
    catch (err) {
        next(err);
    }
}