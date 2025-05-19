import jwt from "jsonwebtoken";
import { JWT_SECRET_KEY, JWT_LIFETIME } from "../configs/auth.config.js";

export function verifyToken(token) {
    if (!token) return false;

    try {
        const decoded = jwt.verify(token, JWT_SECRET_KEY);
        const tokenAge = new Date() - new Date(decoded.time);
        if (tokenAge > JWT_LIFETIME) return null;
        return decoded;
    } catch (err) {
        return false;
    }
}