import { query } from "../services/db.service.js";
import { shaHash } from "../utils/hashingFunction.js";

async function findAll(req, res, next) {
    const rows = await query('SELECT * FROM users');
    if (rows.length == 0) return next();
    return res.status(200).send({ data: rows });
}

async function findOne(req, res, next) {
    const { id } = req.params;
    const rows = await query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length == 0) return next();
    return res.status(200).send({ data: rows[0] });
}

async function create(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    console.log(password);
    const passwordHash = shaHash(password);
    console.log(passwordHash);
    const rows = await query("INSERT INTO users (username, password_hash) VALUES (?, ?);", [username, passwordHash]);
    console.log(rows);
    return res.status(200).send();
}

export default {
    findAll,
    findOne,
    create
}
