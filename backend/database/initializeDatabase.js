const db = require('../config/db');
const { createPostTables } = require('./tables/postTables');
const { createUserTables } = require('./tables/userTables');
const { createFollowerTables } = require('./tables/followerTables');
const { createLikeTables } = require('./tables/likeTables');
const { createPostProcedures } = require('./procedures/postProcedures');
const { createUserProcedures } = require('./procedures/userProcedures');
const { createFollowerProcedures } = require('./procedures/followerProcedures');
const { createLikeProcedures } = require('./procedures/likeProcedures');

async function initializeDatabase() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('[initializeDatabase.js] Connected to MySQL. Creating tables and procedures...');

    await createPostTables();
    await createUserTables();
    await createFollowerTables();
    await createLikeTables();
    await createPostProcedures(db);
    await createUserProcedures(db);
    await createFollowerProcedures(db);
    await createLikeProcedures(db);

    console.log('[initializeDatabase.js] All tables and procedures created successfully');
  } else {
    console.log('[initializeDatabase.js] Skipping database initialization: REPO_TYPE is not set to mysql.');
  }
}

initializeDatabase().catch(err => {
  console.error('[initializeDatabase.js] Error initializing database:', err);
});
module.exports = db;
