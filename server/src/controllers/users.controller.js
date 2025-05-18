import { query } from "../services/db.service.js";

async function findAll(req, res, next) {
    const rows = await query('SELECT * FROM users');
    if (rows.length == 0) return next();
    return res.status(200).send({ data: rows });
}

async function findOne(req, res, next) {
    const { id } = req.params;
    const rows = await query(`SELECT * FROM users WHERE id=${id}`);
    if (rows.length == 0) return next();
    return res.status(200).send({ data: rows[0] });
}

export default {
    findAll,
    findOne
}