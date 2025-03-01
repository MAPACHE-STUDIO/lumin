const express = require('express');
const ConversationController = require('../controllers/conversation.controller');
const authMiddleware = require('../middlewares/auth');

const router = express.Router();

router.post('/', ConversationController.createConversation); // Crear conversación
router.get('/', authMiddleware, ConversationController.getUserConversations); // Obtener conversaciones del usuario
router.get('/:id', ConversationController.getConversationById); // Obtener conversación por ID
router.delete('/:id', ConversationController.deleteConversation); // Eliminar conversación

module.exports = router;
