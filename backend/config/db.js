const mysql = require('mysql2/promise');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

require('dotenv').config();

let db;

if (process.env.REPO_TYPE === 'mysql') {
  db = mysql.createPool({
    host: process.env.MYSQL_HOST,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 10,
    queueLimit: 0
  });

  db.getConnection()
    .then(() => {
      console.log('[db.js] Connected to the MySQL database');
    })
    .catch(err => {
      console.error('[db.js] Error connecting to the MySQL database:', err.message);
    });

} else if (process.env.REPO_TYPE === 'sqlite') {
  db = new sqlite3.Database(path.resolve(__dirname, '../db/xistter.db'), (err) => {
    if (err) {
      console.error('[db.js] Error opening SQLite database:', err.message);
    } else {
      console.log('[db.js] Connected to the SQLite database');
    }
  });
} else {
  console.error('[db.js] No valid REPO_TYPE set in environment variables.');
}

module.exports = db;
