const express = require('express');
const router = express.Router();
const commentController = require('./commentController');
const authMiddleware = require('../auth/authMiddleware');

router.post('/', commentController.addComment);

router.get('/post/:postId', commentController.getAllCommentsByPostId);

router.get('/:commentId', commentController.getCommentById);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;
