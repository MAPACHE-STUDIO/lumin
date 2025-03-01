const { Message, Conversation, User } = require('../models');
const ConversationController = require('./conversation.controller');
const MessageController = {

  async sendMessage (req, res) {
    try {
      let { conversationId, content, receiverId, senderId } = req.body;
      if (conversationId === null) {
        const userIds = [senderId, receiverId].sort();
        const conversationName = userIds.join("_")
        const newConversation = await ConversationController.createConversation({conversationName, userIds})
        conversationId = newConversation.id
      } else {
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) {
          return res.status(404).json({ error: 'Conversación no encontrada.' });
        }
      }
      // Verificar que el receptor exista
      const receiver = await User.findByPk(receiverId);
      if (!receiver) {
        return res.status(404).json({ error: 'Receptor no encontrado.' });
      }
      // Crear el mensaje
      const message = await Message.create({ content, conversationId, senderId, receiverId });
      const updateConversation = await ConversationController.updateConversation({ lastMessage: content, conversationId })
      res.status(201).json({ message, conversationId });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
  async getMessages (req, res) {
    try {
      const { conversationId } = req.params;
      
      if (conversationId  === "null") {
        res.status(200).json({ res: "Nueva conversacion" });
      } else {
          // Verificar que la conversación exista
        const conversation = await Conversation.findByPk(conversationId);
        if (!conversation) {
          return res.status(404).json({ error: 'Conversación no encontrada.' });
        }
    
        // Obtener los mensajes de la conversación
        const messages = await Message.findAll({
          where: { conversationId },
          include: [
            {
              model: User,
              as: 'sender',
              attributes: ['id', 'username'], // Información básica del remitente
            },
            {
              model: User,
              as: 'receiver',
              attributes: ['id', 'username'], // Información básica del receptor
            },
          ],
          order: [['createdAt', 'ASC']], // Ordenar por fecha de creación
        });
    
        res.status(200).json({ messages });
      }
  
      
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
};

module.exports = MessageController;