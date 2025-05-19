import { query } from "../utils/databaseQuery.js";
import { JWT_SECRET_KEY, JWT_LIFETIME } from "../configs/auth.config.js";
import jwt from "jsonwebtoken";
import { bcryptCompare } from "../utils/hashingFunction.js";

async function login(req, res, next) {
    const sqlQuery = "SELECT * FROM users WHERE username = ?";
    const username = req.body.username;
    const password = req.body.password;
    const [user] = await query(sqlQuery, [username]);

    if (!user) {
        return res.status(401).json({ login: false, message: "401 User does not exist." })
    }
    
    const isPasswordCorrect = await bcryptCompare(password, user.password_hash);

    if (!isPasswordCorrect) {
        return res.status(401).json({ login: false, message: "401 Invalid password." });
    }

    if (user.deleted) {
        return res.status(401).json({ login: false, message: "401 Deleted user." });
    }

    const id = user.id;
    const token = jwt.sign({ id, username }, JWT_SECRET_KEY, { expiresIn: JWT_LIFETIME });

    return res.json({ login: true, id, username, token });
}

export default {
    login
}
