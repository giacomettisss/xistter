const express = require('express');
const router = express.Router();
const followerController = require('./followerController');

router.post('/follow', followerController.followUser);
router.post('/unfollow', followerController.unfollowUser);
router.get('/:userId/followers', followerController.getFollowers);
router.get('/:userId/following', followerController.getFollowing);

module.exports = router;
