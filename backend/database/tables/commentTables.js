// const db = require('../../config/db');

// async function createCommentTable() {
//   try {
//     await db.query(`
//       CREATE TABLE IF NOT EXISTS comments (
//         id INT AUTO_INCREMENT PRIMARY KEY,
//         post_id INT,
//         user_id INT,
//         content TEXT NOT NULL,
//         created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
//       )
//     `);
//     console.log('Comments table created successfully');
//   } catch (err) {
//     console.error('Error creating Comments table:', err.message);
//   }
// }

// async function createCommentTables() {
//   await createCommentTable();
// }

// module.exports = { createCommentTables };
