const express = require('express');
const router = express.Router();
const postController = require('./postController');

router.post('/', postController.addPost);
router.delete('/:postId', postController.deletePost);
router.post('/:postId/repost', postController.rePost);
router.post('/:postId/comment', postController.commentPost);
router.get('/:postId/comments', postController.getComments);
router.get('/user/:username', postController.getUserPosts);

module.exports = router;