const db = require('../../config/db');

async function createLikesTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS likes (
        user_id INT NOT NULL,
        post_id INT NOT NULL,
        liked_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (user_id, post_id),
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (post_id) REFERENCES posts(id) ON DELETE CASCADE
      )
    `);
    console.log('Likes table created successfully');
  } catch (err) {
    console.error('Error creating likes table:', err.message);
  }
}

async function createLikeTables() {
  await createLikesTable();
}

module.exports = { createLikeTables };
