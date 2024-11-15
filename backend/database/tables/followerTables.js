const db = require('../../config/db');

async function createFollowerTable() {
  try {
    await db.query(`
      CREATE TABLE IF NOT EXISTS followers (
        follower_id INT NOT NULL,
        following_id INT NOT NULL,
        followed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        PRIMARY KEY (follower_id, following_id),
        FOREIGN KEY (follower_id) REFERENCES users(id) ON DELETE CASCADE,
        FOREIGN KEY (following_id) REFERENCES users(id) ON DELETE CASCADE
      )
    `);
    console.log('Followers table created successfully');
  } catch (err) {
    console.error('Error creating followers table:', err.message);
  }
}

async function createFollowerTables() {
  await createFollowerTable();
}

module.exports = { createFollowerTables };
