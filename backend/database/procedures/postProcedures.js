const db = require('../../config/db');

async function createAddPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE add_post(IN user_id INT, IN content TEXT)
      BEGIN
        INSERT INTO posts (user_id, content, post_type, created_at) VALUES (user_id, content, 'tweet', NOW());
        SELECT LAST_INSERT_ID() AS postId;
      END
    `);
    console.log('[postProcedures.js] add_post procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating add_post procedure:', err.message);
  }
}

async function createDeletePostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE delete_post(IN user_id INT, IN post_id INT)
      BEGIN
        DELETE FROM posts WHERE id = post_id AND user_id = user_id;
        SELECT ROW_COUNT() AS affected_rows;
      END
    `);
    console.log('[postProcedures.js] delete_post procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating delete_post procedure:', err.message);
  }
}

async function createRetweetPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE re_post(IN user_id INT, IN parent_post_id INT)
      BEGIN
        INSERT INTO posts (user_id, post_type, parent_id, created_at) VALUES (user_id, 'retweet', parent_post_id, NOW());
        UPDATE posts SET retweet_count = retweet_count + 1 WHERE id = parent_post_id;
        SELECT LAST_INSERT_ID() AS retweetId;
      END
    `);
    console.log('[postProcedures.js] re_post procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating re_post procedure:', err.message);
  }
}

async function createCommentPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE comment_post(IN user_id INT, IN parent_post_id INT, IN content TEXT)
      BEGIN
        INSERT INTO posts (user_id, content, post_type, parent_id, created_at) VALUES (user_id, content, 'comment', parent_post_id, NOW());
        UPDATE posts SET reply_count = reply_count + 1 WHERE id = parent_post_id;
        SELECT LAST_INSERT_ID() AS commentId;
      END
    `);
    console.log('[postProcedures.js] comment_post procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating comment_post procedure:', err.message);
  }
}

async function createGetCommentsProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_comments(IN parent_post_id INT)
      BEGIN
        SELECT * FROM posts WHERE parent_id = parent_post_id AND post_type = 'comment' ORDER BY created_at ASC;
      END
    `);
    console.log('[postProcedures.js] get_comments procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating get_comments procedure:', err.message);
  }
}

async function createGetUserPostsProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_user_posts(IN p_user_id INT, IN offset INT, IN limit INT)
      BEGIN
        SELECT posts.*, users.username, users.profile_picture
        FROM posts
        JOIN users ON posts.user_id = users.id
        WHERE posts.user_id = p_user_id
        ORDER BY posts.created_at DESC
        LIMIT offset, limit;
      END
    `);
    console.log('[postProcedures.js] get_user_posts procedure created successfully');
  } catch (err) {
    console.error('[postProcedures.js] Error creating get_user_posts procedure:', err.message);
  }
}


async function createPostProcedures() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('[postProdecures.js] Creating stored procedures...');
    await createAddPostProcedure();
    await createDeletePostProcedure();
    await createRetweetPostProcedure();
    await createCommentPostProcedure();
    await createGetCommentsProcedure();
    await createGetUserPostsProcedure();
  } else {
    console.log('[postProdecures.js] Skipping procedure creation: REPO_TYPE is not set to mysql.');
  }
}

module.exports = { createPostProcedures };


// const db = require('../../config/db');

// async function createAddPostProcedure() {
//   try {
//     await db.query(`
//       CREATE PROCEDURE add_post(IN user_id INT, IN content TEXT)
//       BEGIN
//         INSERT INTO posts (user_id, content, created_at) VALUES (user_id, content, NOW());
//         SELECT LAST_INSERT_ID() AS postId;
//       END
//     `);
//     console.log('[postProdecures.js] add_post procedure created successfully');
//   } catch (err) {
//     console.error('[postProdecures.js] Error creating add_post procedure:', err.message);
//   }
// }

// async function createGetPostProcedure() {
//   try {
//     await db.query(`
//       CREATE PROCEDURE get_post(IN post_id INT)
//       BEGIN
//         SELECT * FROM posts WHERE id = post_id;
//       END
//     `);
//     console.log('[postProdecures.js] get_post procedure created successfully');
//   } catch (err) {
//     console.error('[postProdecures.js] Error creating get_post procedure:', err.message);
//   }
// }

// async function createGetPostsProcedure() {
//   try {
//     await db.query(`
//       CREATE PROCEDURE get_posts()
//       BEGIN
//         SELECT * FROM posts;
//       END
//     `);
//     console.log('[postProdecures.js] get_posts procedure created successfully');
//   } catch (err) {
//     console.error('[postProdecures.js] Error creating get_posts procedure:', err.message);
//   }
// }

// async function createDeletePostProcedure() {
//   try {
//     await db.query(`
//       CREATE PROCEDURE delete_post(IN post_id INT)
//       BEGIN
//         DELETE FROM posts WHERE id = post_id;
//       END
//     `);
//     console.log('[postProdecures.js] delete_post procedure created successfully');
//   } catch (err) {
//     console.error('[postProdecures.js] Error creating delete_post procedure:', err.message);
//   }
// }

// async function initializeProcedures() {
//   if (process.env.REPO_TYPE === 'mysql') {
//     console.log('[postProdecures.js] Creating stored procedures...');
//     await createAddPostProcedure();
//     await createGetPostProcedure();
//     await createGetPostsProcedure();
//     await createDeletePostProcedure();
//     console.log('[postProdecures.js] All procedures created successfully');
//   } else {
//     console.log('[postProdecures.js] Skipping procedure creation: REPO_TYPE is not set to mysql.');
//   }
// }

// module.exports = { initializeProcedures };
