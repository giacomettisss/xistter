const db = require('../../config/db');

async function createGetFeedProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_feed(IN p_user_id INT, IN p_offset INT, IN p_limit INT)
      BEGIN
        SELECT posts.*, users.username, user.email
        FROM 
            posts
        JOIN users 
            ON posts.user_id = users.id
        LEFT JOIN followers 
            ON posts.user_id = followers.following_id
            AND followers.follower_id = p_user_id
        WHERE 
            followers.follower_id = p_user_id
            OR posts.user_id = p_user_id
        ORDER BY
            posts.created_at DESC
        LIMIT p_offset, p_limit;
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
