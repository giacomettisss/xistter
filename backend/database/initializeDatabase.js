const db = require('../config/db');
const { createPostTables } = require('./tables/postTables');
const { createCommentTables } = require('./tables/commentTables');
const { createUserTables } = require('./tables/userTables');
const { initializeProcedures: initializePostProcedures } = require('./procedures/postProcedures');
const { initializeProcedures: initializeCommentProcedures } = require('./procedures/commentProcedures');
const { initializeProcedures: initializeUserProcedures } = require('./procedures/userProcedures');

async function initializeDatabase() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('Connected to MySQL. Creating tables and procedures...');

    await createPostTables();
    await createCommentTables();
    await createUserTables();
    await initializePostProcedures(db);
    await initializeCommentProcedures(db);
    await initializeUserProcedures(db);

    console.log('All tables and procedures created successfully');
  } else {
    console.log('Skipping database initialization: REPO_TYPE is not set to mysql.');
  }
}

initializeDatabase().catch(err => {
  console.error('Error initializing database:', err);
});
module.exports = db;
