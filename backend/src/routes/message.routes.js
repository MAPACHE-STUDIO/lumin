const express = require('express');
const MessageController = require('../controllers/message.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', authMiddleware, MessageController.sendMessage);
router.get('/:conversationId', authMiddleware, MessageController.getMessages);

module.exports = router;
