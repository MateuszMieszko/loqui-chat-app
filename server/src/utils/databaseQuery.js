import mysql from "mysql2/promise";
import { db_credentials } from "../configs/db.config.js";

const pool = mysql.createPool(db_credentials);

export async function query(sql, params=null) {
    let connection;
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return rows;
    } catch(error) {
        console.error("Database query error:", error);
        throw error;
    }
}

export function dateToTimestamp(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}