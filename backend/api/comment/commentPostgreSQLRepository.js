const pool = require('../../config/db');

class CommentPostgreSQLRepository {
  async addComment(postId, userId, content) {
    await pool.query('CALL add_comment($1, $2, $3);', [postId, userId, content]);
  }

  async getCommentById(commentId) {
    const result = await pool.query('CALL get_comment($1)', [commentId]);
    return result.rows[0] || null;
  }

  async getCommentsByPostId(postId) {
    const result = await pool.query('CALL get_comments_by_post($1)', [postId]);
    return result.rows;
  }

  async deleteComment(commentId) {
    const result = await pool.query('CALL delete_comment($1);', [commentId]);
    return result.rowCount;
  }
}

module.exports = new CommentPostgreSQLRepository();
