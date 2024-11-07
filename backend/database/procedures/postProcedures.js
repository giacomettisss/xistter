const db = require('../../config/db');

async function createAddPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE add_post(IN user_id INT, IN content TEXT)
      BEGIN
        INSERT INTO posts (user_id, content, created_at) VALUES (user_id, content, NOW());
        SELECT LAST_INSERT_ID() AS postId;
      END
    `);
    console.log('add_post procedure created successfully');
  } catch (err) {
    console.error('Error creating add_post procedure:', err.message);
  }
}

async function createGetPostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_post(IN post_id INT)
      BEGIN
        SELECT * FROM posts WHERE id = post_id;
      END
    `);
    console.log('get_post procedure created successfully');
  } catch (err) {
    console.error('Error creating get_post procedure:', err.message);
  }
}

async function createGetPostsProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_posts()
      BEGIN
        SELECT * FROM posts;
      END
    `);
    console.log('get_posts procedure created successfully');
  } catch (err) {
    console.error('Error creating get_posts procedure:', err.message);
  }
}

async function createDeletePostProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE delete_post(IN post_id INT)
      BEGIN
        DELETE FROM posts WHERE id = post_id;
      END
    `);
    console.log('delete_post procedure created successfully');
  } catch (err) {
    console.error('Error creating delete_post procedure:', err.message);
  }
}

async function initializeProcedures() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('Creating stored procedures...');
    await createAddPostProcedure();
    await createGetPostProcedure();
    await createGetPostsProcedure();
    await createDeletePostProcedure();
    console.log('All procedures created successfully');
  } else {
    console.log('Skipping procedure creation: REPO_TYPE is not set to mysql.');
  }
}

module.exports = { initializeProcedures };
