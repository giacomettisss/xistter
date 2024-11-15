const express = require('express');
const userController = require('./userController');
const authMiddleware = require('../auth/authMiddleware');

const router = express.Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUserPassword);

router.delete('/:id', userController.deleteUser);

module.exports = router;
