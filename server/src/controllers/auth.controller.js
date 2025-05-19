import { query } from "../utils/databaseQuery.js";
import { JWT_SECRET_KEY, BCRYPT_SALT, JWT_LIFETIME } from "../configs/auth.config.js";
import jwt from "jsonwebtoken";
import { shaHash } from "../utils/hashingFunction.js";

async function login(req, res, next) {
    const sqlQuery = "SELECT * FROM users WHERE username = ?";
    const username = req.body.username;
    const password = req.body.password;
    const [user] = await query(sqlQuery, [username]);
    
    const correctPassword = shaHash(password) === user.password_hash;

    if (!correctPassword) {
        return res.status(401).json({ login: false, message: "Invalid credentials" });
    }

    const id = user.id;
    const token = jwt.sign({ id, username }, JWT_SECRET_KEY, { expiresIn: JWT_LIFETIME });

    return res.json({ login: true, id, username, token });
}

export default {
    login
}