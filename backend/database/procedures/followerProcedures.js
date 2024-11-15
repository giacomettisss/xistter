const db = require('../../config/db');

async function createFollowUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE follow_user(IN follower_id INT, IN following_id INT)
      BEGIN
        IF follower_id != following_id THEN
          INSERT IGNORE INTO followers (follower_id, following_id, followed_at)
          VALUES (follower_id, following_id, NOW());
        END IF;
      END
    `);
    console.log('[followerProcedures.js] follow_user procedure created successfully');
  } catch (err) {
    console.error('[followerProcedures.js] Error creating follow_user procedure:', err.message);
  }
}

async function createUnfollowUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE unfollow_user(IN follower_id INT, IN following_id INT)
      BEGIN
        DELETE FROM followers WHERE follower_id = follower_id AND following_id = following_id;
      END
    `);
    console.log('[followerProcedures.js] unfollow_user procedure created successfully');
  } catch (err) {
    console.error('[followerProcedures.js] Error creating unfollow_user procedure:', err.message);
  }
}

async function createGetFollowersProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_followers(IN user_id INT)
      BEGIN
        SELECT users.* FROM followers
        JOIN users ON followers.follower_id = users.id
        WHERE followers.following_id = user_id;
      END
    `);
    console.log('[followerProcedures.js] get_followers procedure created successfully');
  } catch (err) {
    console.error('[followerProcedures.js] Error creating get_followers procedure:', err.message);
  }
}

async function createGetFollowingProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_following(IN user_id INT)
      BEGIN
        SELECT users.* FROM followers
        JOIN users ON followers.following_id = users.id
        WHERE followers.follower_id = user_id;
      END
    `);
    console.log('[followerProcedures.js] get_following procedure created successfully');
  } catch (err) {
    console.error('[followerProcedures.js] Error creating get_following procedure:', err.message);
  }
}

async function createFollowerProcedures() {
    if (process.env.REPO_TYPE === 'mysql') {
      console.log('[followerProdecures.js] Creating stored procedures...');
    await createFollowUserProcedure();
    await createUnfollowUserProcedure();
    await createGetFollowersProcedure();
    await createGetFollowingProcedure();
    console.log('[followerProdecures.js] All procedures created successfully');
    } else {
    console.log('[followerProdecures.js] Skipping procedure creation: REPO_TYPE is not set to mysql.');
    }
}


module.exports = { createFollowerProcedures };
