import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY } from "../configs/auth.config.js";

export function verifyToken(token) {
    if (!token) return false;

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const expiresAt = new Date(decoded.exp * 1000);
        const now = new Date();
        if (now > expiresAt) return null;
        return decoded;
    } catch (err) {
        return false;
    }
}