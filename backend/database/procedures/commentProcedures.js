// const db = require('../../config/db');

// async function createAddCommentProcedure() {
//     try {
//       await db.query(`
//         CREATE PROCEDURE add_comment(IN post_id INT, IN user_id INT, IN content TEXT)
//         BEGIN
//           INSERT INTO comments (post_id, user_id, content) 
//           VALUES (post_id, user_id, content);
//         END
//       `);
//       console.log('[commentProdecures.js] add_comment procedure created successfully');
//     } catch (err) {
//       console.error('[commentProdecures.js] Error creating add_comment procedure:', err.message);
//     }
//   }

// async function createGetCommentByIdProcedure() {
//     try {
//         await db.query(`
//         CREATE PROCEDURE get_comment_by_id(IN comment_id INT)
//         BEGIN
//             DECLARE comment_exists BOOLEAN;
//             SET comment_exists = (SELECT EXISTS(SELECT 1 FROM comments WHERE id = comment_id));
            
//             IF comment_exists THEN
//             SELECT * FROM comments WHERE id = comment_id;
//             SELECT CONCAT('[commentProdecures.js] [CommentInMemoryRepository] Found comment with ID ', comment_id) AS LogMessage;
//             ELSE
//             SELECT NULL AS Comment;
//             SELECT '[CommentInMemoryRepository] Comment with ID ' AS LogMessage, comment_id, ' not found' AS Message;
//             END IF;
//         END
//         `);
//         console.log('[commentProdecures.js] get_comment_by_id procedure created successfully');
//     } catch (err) {
//         console.error('[commentProdecures.js] Error creating get_comment_by_id procedure:', err.message);
//     }
// }

// async function createGetAllCommentsByPostIdProcedure() {
//     try {
//       await db.query(`
//         CREATE PROCEDURE get_all_comments_by_post_id(IN post_id INT)
//         BEGIN
//           SELECT * FROM comments WHERE post_id = post_id;
//           SELECT CONCAT('[commentProdecures.js] [CommentInMemoryRepository] Fetched all comments for post ID ', post_id) AS LogMessage;
//         END
//       `);
//       console.log('[commentProdecures.js] get_all_comments_by_post_id procedure created successfully');
//     } catch (err) {
//       console.error('[commentProdecures.js] Error creating get_all_comments_by_post_id procedure:', err.message);
//     }
// }
  
// async function createDeleteCommentProcedure() {
//     try {
//       await db.query(`
//         CREATE PROCEDURE delete_comment(IN comment_id INT, OUT deleted INT)
//         BEGIN
//           DELETE FROM comments WHERE id = comment_id;
//           SET deleted = ROW_COUNT();
  
//           IF deleted > 0 THEN
//             SELECT CONCAT('[commentProdecures.js] [CommentInMemoryRepository] Deleted comment with ID ', comment_id) AS LogMessage;
//           ELSE
//             SELECT CONCAT('[commentProdecures.js] [CommentInMemoryRepository] Comment with ID ', comment_id, ' not found') AS LogMessage;
//           END IF;
//         END
//       `);
//       console.log('[commentProdecures.js] delete_comment procedure created successfully');
//     } catch (err) {
//       console.error('[commentProdecures.js] Error creating delete_comment procedure:', err.message);
//     }
// }

// async function initializeProcedures() {
//   if (process.env.REPO_TYPE === 'mysql') {
//     console.log('[commentProdecures.js] Creating stored procedures...');
//     await createAddCommentProcedure();
//     await createGetCommentByIdProcedure();
//     await createGetAllCommentsByPostIdProcedure();
//     await createDeleteCommentProcedure();
//     console.log('[commentProdecures.js] All procedures created successfully');
//   } else {
//     console.log('[commentProdecures.js] Skipping procedure creation: REPO_TYPE is not set to mysql.');
//   }
// }
  
// module.exports = { initializeProcedures };
