import { query } from "../utils/databaseQuery.js";

async function findConversation(req, res, next) {
    // parametry id uzytkownika
    const { id } = req.params;
    const rows = await query("SELECT * FROM messages WHERE sender_id=?", [id]);
    return res.status(200).send({ content: rows });
}

async function sendMessage(req, res, next) {
    const { sender_id, reciver_id, content } = req.params;
    if(content.length == 0) console.error(406); // not acceptable
    
    const rows = await query('INSERT INTO messages (sender_id, reciver_id, content) VALUE (sender_id = ?, reciver_id = ?, content = ?)',
         sender_id, reciver_id, content);
    if (rows.length == 0) return next();
    return res.status(200).send({ data: rows[0] });
}

export default {
    findConversation,
    sendMessage 
}