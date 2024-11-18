const express = require('express');
const router = express.Router();
const AuthController = require('./authController');

router.post('/login', AuthController.login);
router.post('/register', AuthController.register);
router.post('/refresh', AuthController.refreshToken);
router.post('/logout', AuthController.logout);

module.exports = router;
