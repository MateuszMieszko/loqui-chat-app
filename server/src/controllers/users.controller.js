import { query } from "../utils/databaseQuery.js";
import { bcryptHash } from "../utils/hashingFunction.js";

async function findAll(req, res, next) {
    const rows = await query('SELECT * FROM users');
    if (rows.length == 0) return res.status(404).json({ message: "404 No data found." });
    return res.status(200).send({ users: rows });
}

async function findOne(req, res, next) {
    const { id } = req.params;
    const rows = await query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length == 0) return res.status(404).json({ message: "404 No data found." });
    return res.status(200).send({ user: rows[0] });
}

async function create(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    const passwordHash = await bcryptHash(password);
    const rows = await query("INSERT INTO users (username, password_hash) VALUES (?, ?);", [username, passwordHash]);
    return res.status(200).send({ message: "200 New user created successfully." });
}

export default {
    findAll,
    findOne,
    create
}
