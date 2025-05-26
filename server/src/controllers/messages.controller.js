import { query } from "../utils/databaseQuery.js";

async function findConversation(req, res, next) {
    // parametry id uzytkownika
    const { id } = req.params;
    const userId = req.sessionUser.id;
    const rows = await query("SELECT * FROM messages WHERE (sender_id=? AND receiver_id=?) OR (receiver_id=? AND sender_id=?)", [id, userId, id, userId]);
    return res.status(200).send({ content: rows });
}

async function sendMessage(req, res, next) {
    const senderId = req.sessionUser.id;
    const { content, receiver_id } = req.body;
    // if (rows.length == 0) return res.status(406).json({ message: "406 not acceptable." }); 
    
    const rows = await query('INSERT INTO messages (sender_id, receiver_id, content) VALUES (?,?,?)',
         [senderId, receiver_id, content]);
    if (rows.length == 0) return next();
    return res.status(201).send({ message : "201 New message created successfully." });
}

export default {
    findConversation,
    sendMessage 
}