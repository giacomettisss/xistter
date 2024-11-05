const express = require('express');
const router = express.Router();
const postController = require('./postController');

router.post('/', postController.addPost);

router.get('/', postController.getAllPosts);

router.get('/:postId', postController.getPostById);

router.delete('/:postId', postController.deletePost);

module.exports = router;
