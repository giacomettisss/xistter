const db = require('../../config/db');

class postSQLiteRepository {
  async addPost(userId, content) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO posts (user_id, content) VALUES (?, ?)', [userId, content], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID); 
      });
    });
  }

  async getPostById(postId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM posts WHERE id = ?', [postId], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }
  
  async getAllPosts() {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM posts', [], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }
  
  async deletePost(postId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM posts WHERE id = ?', [postId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes); 
      });
    });
  }
}

module.exports = new postSQLiteRepository();
