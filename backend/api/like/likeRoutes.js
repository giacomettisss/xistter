const express = require('express');
const router = express.Router();
const likeController = require('./likeController');

router.post('/:postId/like', likeController.likePost);
router.post('/:postId/unlike', likeController.unlikePost);
router.get('/:postId/likes', likeController.getPostLikes);

module.exports = router;
