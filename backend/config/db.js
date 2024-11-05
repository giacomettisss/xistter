const { Pool } = require('pg');
const sqlite3 = require('sqlite3').verbose();
const path = require('path');

let db;

if (process.env.REPO_TYPE === 'postgresql') {
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
  });

  db.on('connect', () => {
    console.log('Connected to the PostgreSQL database');
  });

  db.on('error', (err) => {
    console.error('Error connecting to the PostgreSQL database:', err);
  });

} else if (process.env.REPO_TYPE === 'sqlite') {
  db = new sqlite3.Database(path.resolve(__dirname, '../xistter.db'), (err) => {
    if (err) {
      console.error('Error opening SQLite database:', err.message);
    } else {
      console.log('Connected to the SQLite database');
    }
  });
}

module.exports = db;
