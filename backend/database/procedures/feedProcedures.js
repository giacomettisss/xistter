const db = require('../../config/db');

async function createGetFeedProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_feed(IN user_id INT, IN offset INT, IN limit INT)
      BEGIN
        SELECT posts.*, users.username FROM posts
        JOIN followers ON posts.user_id = followers.following_id
        JOIN users ON posts.user_id = users.id
        WHERE followers.follower_id = user_id
        ORDER BY posts.created_at DESC
        LIMIT offset, limit;
      END
    `);
    console.log('[feedProcedures.js] get_feed procedure created successfully');
  } catch (err) {
    console.error('[feedProcedures.js] Error creating get_feed procedure:', err.message);
  }
}

async function createFeedProcedures() {
  await createGetFeedProcedure();
}

module.exports = { createFeedProcedures };
