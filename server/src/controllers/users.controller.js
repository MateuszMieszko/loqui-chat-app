import { query } from "../utils/databaseQuery.js";
import { bcryptHash } from "../utils/hashingFunction.js";

async function findAll(req, res, next) {
    const search = req.query.search;
    const sortingOrder = req.query.sortingOrder;
    if(sortingOrder !== "ASC" && sortingOrder !== "DESC") sortingOrder = "DESC";
    let rows;
    // join with 'messages' table to get the latest message for each user
    let innerQuery = "(SELECT sender_id, receiver_id, MAX(created_at) AS latest_message FROM messages GROUP BY receiver_id, sender_id HAVING sender_id = ? OR receiver_id = ?) AS latest_messages";
    let params = [req.sessionUser.id, req.sessionUser.id];
    let importantColumns = "users.id, users.username, users.deleted, latest_messages.latest_message";
    let outerQuery;
    if (search) {
        // Case-insensitive search by username
        outerQuery = `SELECT ${importantColumns} FROM users LEFT JOIN ${innerQuery} ON (users.id = latest_messages.sender_id OR users.id = latest_messages.receiver_id) HAVING LOWER(users.username) LIKE LOWER(?) ORDER BY latest_messages.latest_message ${sortingOrder};`;
        params = [...params, `%${search}%`];
    } else {
        outerQuery =  `SELECT ${importantColumns} FROM users LEFT JOIN ${innerQuery} ON users.id = latest_messages.sender_id OR users.id = latest_messages.receiver_id ORDER BY latest_messages.latest_message ${sortingOrder};`;
    }
    // delete duplicate users (if they are both sender and receiver)
    rows = await query(outerQuery, params);
    const uniqueUsers = [], foundUsers = {};
    rows.forEach(user => {
        if(!foundUsers[user.id]) {
            foundUsers[user.id] = true;
            uniqueUsers.push(user);
        }
    });
    return res.status(200).send({ users_data: uniqueUsers });
}

async function findOne(req, res, next) {
    const { id } = req.params;
    const rows = await query("SELECT * FROM users WHERE id=?", [id]);
    if (rows.length == 0) return res.status(404).json({ message: "404 No data found." });
    return res.status(200).send({ user_data: rows[0] });
}

async function create(req, res, next) {
    const username = req.body["username"];
    const password = req.body["password"];
    if(!username) return res.status(400).send({ message: "No username provided" });
    if(!password) return res.status(400).send({ message: "No password provided" });
    const passwordHash = await bcryptHash(password);
    const rows = await query("INSERT INTO users (username, password_hash) VALUES (?, ?);", [username, passwordHash]);
    return res.status(201).send({ message: "201 New user created successfully." });
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
