const db = require('../../config/db');

async function createUserTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        email VARCHAR(100) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        name VARCHAR(100),
        bio TEXT,
        location VARCHAR(100),
        website VARCHAR(100),
        profile_picture VARCHAR(255),
        cover_photo VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Users table created successfully');
  } catch (err) {
    console.error('Error creating users table:', err.message);
  }
}

async function createUserTables() {
  await createUserTable();
}

module.exports = { createUserTables };
