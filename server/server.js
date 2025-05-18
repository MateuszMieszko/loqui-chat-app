import express from "express";
import dotenv from 'dotenv';
import { query } from "./src/services/db.service.js";

dotenv.config();

const PORT = process.env.SERVER_PORT;
const app = express();

app.get('/', (req, res) => {
    res.json({
        message: "Hello there! xd"
    });
});

app.get('/users', async (req, res) => {
    const rows = await query('SELECT * FROM users');
    res.json(rows)
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const rows = await query(`SELECT * FROM users WHERE id=${id}`);
    res.json(rows[0])
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
