const pool = require('../../config/db');

class LikeMySQLRepository {
  async likePost(userId, postId) {
    await pool.query('CALL like_post(?, ?);', [userId, postId]);
    return true;
  }

  async unlikePost(userId, postId) {
    await pool.query('CALL unlike_post(?, ?);', [userId, postId]);
    return true;
  }

  async getPostLikes(postId) {
    const [rows] = await pool.query('CALL get_post_likes(?);', [postId]);
    return rows[0];
  }
  
  async hasUserLikedPost(userId, postId) {
    const [rows] = await pool.query('CALL has_user_liked_post(?, ?);', [userId, postId]);
    return rows.length > 0;
  }

}

module.exports = new LikeMySQLRepository();
