const mysql = require("mysql2/promise");
const { db_credentials } = require("../configs/db.config");

const pool = mysql.createPool(db_credentials);

async function query(sql, params=null) {
    let connection;
    try {
        const [rows, fields] = await pool.execute(sql, params);
        return rows;
    } catch(error) {
        console.error("Database query error:", error);
        throw error;
    }
}

function dateToTimestamp(date) {
    return date.toISOString().slice(0, 19).replace('T', ' ');
}

module.exports = {
    query,
    dateToTimestamp
};
