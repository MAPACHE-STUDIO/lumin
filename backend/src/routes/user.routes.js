const express = require('express');
const UserController = require('../controllers/user.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/register', UserController.register);
router.post('/login', UserController.login);
router.get('/:id', authMiddleware, UserController.getUser);
router.put('/', UserController.updateUser);
router.delete('/:id', UserController.deleteUser);

module.exports = router;