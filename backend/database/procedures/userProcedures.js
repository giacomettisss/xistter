const db = require('../../config/db');

async function createAddUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE add_user(IN username VARCHAR(50), IN email VARCHAR(100), IN password VARCHAR(255))
      BEGIN
        INSERT INTO users (username, email, password, created_at) 
        VALUES (username, email, password, NOW());
        SELECT LAST_INSERT_ID() AS userId;
      END
    `);
    console.log('[userProdecures.js] add_user procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating add_user procedure:', err.message);
  }
}

async function createGetUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_user(IN user_id INT)
      BEGIN
        SELECT id, username, email, created_at FROM users WHERE id = user_id;
      END
    `);
    console.log('[userProdecures.js] get_user procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating get_user procedure:', err.message);
  }
}

async function createGetUserByEmailProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_user_by_email(IN email_requested VARCHAR(100))
      BEGIN
        SELECT id, username, email, password, created_at FROM users WHERE email = email_requested;
      END
    `);
    console.log('[userProdecures.js] get_user_by_email procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating get_user_by_email procedure:', err.message);
  }
}

async function createGetUsersProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE get_users()
      BEGIN
        SELECT id, username, email, created_at FROM users;
      END
    `);
    console.log('[userProdecures.js] get_users procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating get_users procedure:', err.message);
  }
}

async function createDeleteUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE delete_user(IN user_id INT)
      BEGIN
        DELETE FROM users WHERE id = user_id;
      END
    `);
    console.log('[userProdecures.js] delete_user procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating delete_user procedure:', err.message);
  }
}

async function createUpdateUserProcedure() {
  try {
    await db.query(`
      CREATE PROCEDURE update_user_password(IN user_id INT, IN new_password VARCHAR(255))
      BEGIN
        UPDATE users SET password = new_password WHERE id = user_id;
      END
    `);
    console.log('[userProdecures.js] update_user_password procedure created successfully');
  } catch (err) {
    console.error('[userProdecures.js] Error creating update_user_password procedure:', err.message);
  }
}

async function createUserProcedures() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('[userProdecures.js] Creating user stored procedures...');
    await createAddUserProcedure();
    await createGetUserProcedure();
    await createGetUserByEmailProcedure();
    await createGetUsersProcedure();
    await createDeleteUserProcedure();
    await createUpdateUserProcedure();
    console.log('[userProdecures.js] All user procedures created successfully');
  } else {
    console.log('[userProdecures.js] Skipping user procedure creation: REPO_TYPE is not set to mysql.');
  }
}

module.exports = { createUserProcedures };
