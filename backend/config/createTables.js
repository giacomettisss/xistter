const db = require('./db');

if (process.env.REPO_TYPE === 'sqlite') {
  db.serialize(() => {
    db.run(`
      CREATE TABLE IF NOT EXISTS posts (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_id INTEGER,
        content TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating posts table', err.message);
      } else {
        console.log('Posts table created');
      }
    });
  });
} else {
  console.log('Skipping table creation: REPO_TYPE is not set to sqlite.');
}

module.exports = db;
