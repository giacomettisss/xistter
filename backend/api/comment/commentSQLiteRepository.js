const db = require('../../config/db');

class CommentSQLiteRepository {
  async addComment(postId, userId, content) {
    return new Promise((resolve, reject) => {
      db.run('INSERT INTO comments (post_id, user_id, content) VALUES (?, ?, ?)', [postId, userId, content], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.lastID);
      });
    });
  }

  async getCommentById(commentId) {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM comments WHERE id = ?', [commentId], (err, row) => {
        if (err) {
          return reject(err);
        }
        resolve(row);
      });
    });
  }

  async getCommentsByPostId(postId) {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM comments WHERE post_id = ?', [postId], (err, rows) => {
        if (err) {
          return reject(err);
        }
        resolve(rows);
      });
    });
  }

  async deleteComment(commentId) {
    return new Promise((resolve, reject) => {
      db.run('DELETE FROM comments WHERE id = ?', [commentId], function (err) {
        if (err) {
          return reject(err);
        }
        resolve(this.changes);
      });
    });
  }
}

module.exports = new CommentSQLiteRepository();
