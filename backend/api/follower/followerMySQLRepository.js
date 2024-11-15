const pool = require('../../config/db');

class FollowerMySQLRepository {
  async followUser(followerId, followingId) {
    await pool.query('CALL follow_user(?, ?);', [followerId, followingId]);
    return true;
  }

  async unfollowUser(followerId, followingId) {
    await pool.query('CALL unfollow_user(?, ?);', [followerId, followingId]);
    return true;
  }

  async getFollowers(userId) {
    const [rows] = await pool.query('CALL get_followers(?);', [userId]);
    return rows[0];
  }

  async getFollowing(userId) {
    const [rows] = await pool.query('CALL get_following(?);', [userId]);
    return rows[0];
  }
}

module.exports = new FollowerMySQLRepository();
