const pool = require('../../config/db');

class PostPostgreSQLRepository {
  async addPost(userId, content) {
    await pool.query('CALL add_post($1, $2);', [userId, content]);
  }

  async getPostById(postId) {
    const result = await pool.query('CALL get_post($1)', [postId]);
    return result.rows[0] || null;
  }

  async getAllPosts() {
    const result = await pool.query('CALL get_posts()');
    return result.rows;
  }

  async deletePost(postId) {
    const result = await pool.query('CALL delete_post($1);', [postId]);
    return result.rowCount;
  }
}

module.exports = new PostPostgreSQLRepository();
