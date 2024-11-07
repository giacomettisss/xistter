const pool = require('../../config/db');

class PostMySQLRepository {
  async addPost(userId, content) {
    const [result] = await pool.query('CALL add_post(?, ?);', [userId, content]);
    const postId = result[0] && result[0][0].postId;
    return postId;
  }

  async getPostById(postId) {
    const [rows] = await pool.query('CALL get_post(?);', [postId]);
    return rows[0] || null;
  }

  async getAllPosts() {
    const [rows] = await pool.query('CALL get_posts();');
    return rows;
  }

  async deletePost(postId) {
    const [result] = await pool.query('CALL delete_post(?);', [postId]);
    return result.affectedRows;
  }
}

module.exports = new PostMySQLRepository();
