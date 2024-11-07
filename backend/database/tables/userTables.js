const db = require('../../config/db');

function createUsersTable() {
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT NOT NULL,
      password TEXT NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) {
      console.error('Error creating users table:', err.message);
    } else {
      console.log('Users table created successfully');
    }
  });
}

function initializeDatabase() {
  if (process.env.REPO_TYPE === 'sqlite') {
    db.serialize(() => {
      createPostsTable();
      createUsersTable();
    });
  } else {
    console.log('Skipping table creation: REPO_TYPE is not set to sqlite.');
  }
}

initializeDatabase();

module.exports = db;
