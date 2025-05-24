import { query } from "../utils/databaseQuery.js";

async function findConversation(req, res, next) {
    // parametry id uzytkownika
    const { id } = req.params;
    const rows = await query("SELECT * FROM messages WHERE sender_id=? OR receiver_id=? ORDER BY created_at ASC", [id, id]);
    return res.status(200).send({ content: rows });
}

async function sendMessage(req, res, next) {
    const { sender_id, receiver_id, content } = req.body;
    if (content.length == 0) return res.status(406).json({ message: "406 not acceptable." }); 
    if (!sender_id || !receiver_id) {
        return res.status(406).json({ message: "Missing data." });
    }
    const rows = await query('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?,?,?)',
         [sender_id, receiver_id, content]);
    if (rows.length == 0) return next();
    return res.status(201).send({ message : "201 New message created successfully." });
}

export default {
    findConversation,
    sendMessage 
}