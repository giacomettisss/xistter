const pool = require('../../config/db');

class PostMySQLRepository {
  async addPost(userId, content) {
    const [result] = await pool.query('CALL add_post(?, ?);', [userId, content]);
    const postId = result[0] && result[0][0].postId;
    return postId;
  }

  async deletePost(userId, postId) {
    const [result] = await pool.query('CALL delete_post(?, ?);', [userId, postId]);
    const affectedRows = result[0] && result[0][0].affected_rows;
    return affectedRows > 0;
  }

  async rePost(userId, parentPostId) {
    const [result] = await pool.query('CALL re_post(?, ?);', [userId, parentPostId]);
    const retweetId = result[0] && result[0][0].retweetId;
    return retweetId;
  }

  async commentPost(userId, parentPostId, content) {
    const [result] = await pool.query('CALL comment_post(?, ?, ?);', [userId, parentPostId, content]);
    const commentId = result[0] && result[0][0].commentId;
    return commentId;
  }

  async getComments(parentPostId) {
    const [rows] = await pool.query('CALL get_comments(?);', [parentPostId]);
    return rows[0];
  }
  
  async getUserPosts(userId, offset = 0, limit = 20) {
    const [rows] = await pool.query('CALL get_user_posts(?, ?, ?);', [userId, offset, limit]);
    return rows[0];
  }
}

module.exports = new PostMySQLRepository();


// const pool = require('../../config/db');

// class PostMySQLRepository {
//   async addPost(userId, content) {
//     const [result] = await pool.query('CALL add_post(?, ?);', [userId, content]);
//     const postId = result[0] && result[0][0].postId;
//     return postId;
//   }

//   async getPostById(postId) {
//     const [rows] = await pool.query('CALL get_post(?);', [postId]);
//     return rows[0] || null;
//   }

//   async getAllPosts() {
//     const [rows] = await pool.query('CALL get_posts();');
//     return rows;
//   }

//   async deletePost(postId) {
//     const [result] = await pool.query('CALL delete_post(?);', [postId]);
//     return result.affectedRows;
//   }
// }

// module.exports = new PostMySQLRepository();
