const pool = require('../../config/db');

class CommentMySQLRepository {
  async addComment(postId, userId, content) {
    await pool.query('CALL add_comment(?, ?, ?);', [postId, userId, content]);
  }

  async getCommentById(commentId) {
    console.log('CommentMySQLRepository', commentId)
    const [result] = await pool.query('CALL get_comment_by_id(?)', [commentId]);
    const result_data = result[0]
    const result_info = result[1]
    console.log('CommentMySQLRepository - result', result)
    console.log('CommentMySQLRepository - result[0]', result[0])
    return result_data || null;
  }

  async getAllCommentsByPostId(postId) {
    const [result] = await pool.query('CALL get_all_comments_by_post_id(?)', [postId]);
    const result_data = result[0]
    const result_info = result[1]
    console.log('CommentMySQLRepository - getAllCommentsByPostId - result_data', result_data)
    console.log('CommentMySQLRepository - getAllCommentsByPostId - result[0]', result_info)
    return result_data;
  }

  async deleteComment(commentId) {
    const result = await pool.query('CALL delete_comment(?);', [commentId]);
    return result.rowCount;
  }
}

module.exports = new CommentMySQLRepository();
