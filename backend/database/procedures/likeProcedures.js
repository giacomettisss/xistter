const db = require('../../config/db');

async function createLikePostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE like_post(IN user_id INT, IN post_id INT)
      BEGIN
        INSERT IGNORE INTO likes (user_id, post_id, liked_at)
        VALUES (user_id, post_id, NOW());
        UPDATE posts SET likes_count = likes_count + 1 WHERE id = post_id;
      END
    `);
    console.log('[likeProcedures.js] like_post procedure created successfully');
  } catch (err) {
    console.error('[likeProcedures.js] Error creating like_post procedure:', err.message);
  }
}

async function createUnlikePostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE unlike_post(IN user_id INT, IN post_id INT)
      BEGIN
        DELETE FROM likes WHERE user_id = user_id AND post_id = post_id;
        UPDATE posts SET likes_count = likes_count - 1 WHERE id = post_id AND likes_count > 0;
      END
    `);
    console.log('[likeProcedures.js] unlike_post procedure created successfully');
  } catch (err) {
    console.error('[likeProcedures.js] Error creating unlike_post procedure:', err.message);
  }
}

async function createGetPostLikesProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_post_likes(IN post_id INT)
      BEGIN
        SELECT users.id, users.name FROM likes
        JOIN users ON likes.user_id = users.id
        WHERE likes.post_id = post_id;
      END
    `);
    console.log('[likeProcedures.js] get_post_likes procedure created successfully');
  } catch (err) {
    console.error('[likeProcedures.js] Error creating get_post_likes procedure:', err.message);
  }
}

async function createHasUserLikedPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE has_user_liked_post(IN in_user_id INT, IN in_post_id INT)
      BEGIN
        SELECT 1 FROM likes WHERE user_id = in_user_id AND post_id = in_post_id LIMIT 1;
      END;
    `);
    console.log('[likeProcedures.js] has_user_liked_post procedure created successfully');
  } catch (err) {
    console.error('[likeProcedures.js] Error creating has_user_liked_post procedure:', err.message);
  }
}

async function createLikeProcedures() {
  await createLikePostProcedure();
  await createUnlikePostProcedure();
  await createGetPostLikesProcedure();
  await createHasUserLikedPostProcedure();
}

module.exports = { createLikeProcedures };
