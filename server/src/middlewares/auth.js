import { verifyToken } from "../utils/verifyToken.js";

export function isLogged(req, res, next) {
    const token = req.body.token;
    const logged = verifyToken(token);
    console.log('User is logged in:', logged);
    next();
}