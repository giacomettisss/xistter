const db = require('../config/db');
const { createPostTables } = require('./tables/postTables');
const { initializeProcedures } = require('./procedures/postProcedures');

async function initializeDatabase() {
  if (process.env.REPO_TYPE === 'mysql') {
    console.log('Connected to MySQL. Creating tables and procedures...');

    await createPostTables();
    await initializeProcedures();

    console.log('All tables and procedures created successfully');
  } else {
    console.log('Skipping database initialization: REPO_TYPE is not set to mysql.');
  }
}

initializeDatabase().catch(err => {
  console.error('Error initializing database:', err);
});
module.exports = db;
