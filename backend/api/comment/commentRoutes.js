const express = require('express');
const router = express.Router();
const commentController = require('./commentController');

router.post('/', commentController.addComment);

router.get('/:postId', commentController.getAllCommentsByPostId);

router.get('/:commentId', commentController.getCommentById);

router.delete('/:commentId', commentController.deleteComment);

module.exports = router;