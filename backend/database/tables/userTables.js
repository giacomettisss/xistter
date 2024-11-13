const db = require('../../config/db');

async function createUserTable() {
  try {
    await db.query(`
      CREATE TABLE users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      );
    `);
    console.log('Posts table created successfully');
  } catch (err) {
    console.error('Error creating posts table:', err.message);
  }
}

async function createUserTables() {
  await createUserTable();
}

module.exports = { createUserTables };
