const pool = require('../../config/db');

class FeedMySQLRepository {
  async getFeed(userId, offset = 0, limit = 20) {
    const [rows] = await pool.query('CALL get_feed(?, ?, ?);', [userId, offset, limit]);
    return rows[0];
  }
}

module.exports = new FeedMySQLRepository();
