import express from "express";
import mysql from "mysql2/promise";
import dotenv from 'dotenv';

dotenv.config();

const db_credentials = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    port: process.env.DB_PORT
};

const PORT = process.env.SERVER_PORT;
const app = express();

async function connectToDatabase() {
    try {
        const connection = await mysql.createConnection(db_credentials);
        console.log("Succesfully connected to the database.");
        return connection;
    } catch (error) {
        console.error("Error connecting to the database:", error.message);
        process.exit(1);
    }
}

app.get('/', (req, res) => {
    res.json({
        message: "Hello there! xd"
    });
});

app.get('/users', async (req, res) => {
    const connection = await connectToDatabase();
    const [rows, fields] = await connection.execute('SELECT * FROM users');
    res.json(rows)
    connection.end();
});

app.get('/users/:id', async (req, res) => {
    const { id } = req.params;
    const connection = await connectToDatabase();
    const [rows] = await connection.execute(`SELECT * FROM users WHERE id=${id}`);
    res.json(rows[0])
    connection.end();
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
