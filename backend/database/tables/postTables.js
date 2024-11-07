const db = require('../../config/db');

async function createPostTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Posts table created successfully');
  } catch (err) {
    console.error('Error creating posts table:', err.message);
  }
}

async function createPostTables() {
  await createPostTable();
}

module.exports = { createPostTables };
