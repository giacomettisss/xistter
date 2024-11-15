const db = require('../../config/db');

async function createPostTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS posts (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        content TEXT,
        post_type ENUM('tweet', 'retweet', 'comment') NOT NULL,
        parent_id INT DEFAULT NULL,
        likes_count INT DEFAULT 0,
        retweet_count INT DEFAULT 0,
        reply_count INT DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (parent_id) REFERENCES posts(id) ON DELETE CASCADE
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
