const express = require('express');
const userRoutes = require('./user.routes');
const messageRoutes = require('./message.routes');
const roomRoutes = require('./room.routes');
const contactRoutes = require('./contact.routes');
const conversationRoutes = require('./conversation.routes');
const translateRoutes = require('./translate.routes');
const uploadRoutes = require('./upload.routes');

const router = express.Router();

router.use('/users', userRoutes);
router.use('/messages', messageRoutes);
router.use('/conversations', conversationRoutes);
router.use('/contacts', contactRoutes);
// router.use('/contacts', groupRoutes);
router.use('/translate', translateRoutes);
router.use('/upload', uploadRoutes);

module.exports = router;
