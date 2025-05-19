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

    console.log("Correct credentials =", correctPassword);

    if (!correctPassword) {
        return res.status(401).json({ message: "Nieprawdiłowe dane logowania" });
    }

    const id = user.id;
    const token = jwt.sign({ id, username }, JWT_SECRET_KEY, { expiresIn: 300 });

    return res.json({ Login: true, token });
}

export default {
    login
}