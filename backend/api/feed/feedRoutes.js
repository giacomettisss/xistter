const express = require('express');
const router = express.Router();
const feedController = require('./feedController');

router.get('/:userId', feedController.getFeed);

module.exports = router;
