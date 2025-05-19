import { query } from "../utils/databaseQuery.js";
import { bcryptHash } from "../utils/hashingFunction.js";

async function findAll(req, res, next) {
    const rows = await query('SELECT * FROM users');
    if (rows.length == 0) return res.status(404).json({ message: "404 No data found." });
    return res.status(200).send({ data: rows });
}

async function findOne(req, res, next) {
    const { id } = req.params;
    const rows = await query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length == 0) return res.status(404).json({ message: "404 No data found." });
    return res.status(200).send({ data: rows[0] });
}

async function create(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    if(!username) return res.status(400).send({ message: "No username provided" });
    if(!password) return res.status(400).send({ message: "No password provided" });
    const passwordHash = await bcryptHash(password);
    const rows = await query("INSERT INTO users (username, password_hash) VALUES (?, ?);", [username, passwordHash]);
    return res.status(200).send({ message: "200 New user created successfully." });
}

async function remove(req, res, next) {
    const id = req.sessionUser.id;
    const rows = await query("UPDATE users SET deleted = 1 WHERE id = ?", [id]);
    return res.status(200).send({ message: "200 Deleted account succesfully."});
}

async function modify(req, res, next) {
    const id = req.sessionUser.id;
    const username = req.body["username"] ? req.body["username"] : req.sessionUser.username;
    const password = req.body["password"];
    if(password) {
        const passwordHash = await bcryptHash(password);
        console.log([username, passwordHash, id]);
        const rows = await query("UPDATE users SET username = ?, password_hash = ? WHERE id = ?;", [username, passwordHash, id]);
    }
    else {
        const rows = await query("UPDATE users SET username = ? WHERE id = ?;", [username, id]);
    }
    return res.status(200).send({ message: "200 Edited user info." });
}

export default {
    findAll,
    findOne,
    create,
    remove,
    modify
}
