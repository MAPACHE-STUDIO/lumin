// controllers/groupController.js
const { Op, Sequelize } = require('sequelize');
const { Conversation, User } = require('../models');

const ConversationController = {
    async createConversation ( {conversationName, userIds}) {
        try {
            // Verificar que los usuarios existan
            const users = await User.findAll({ where: { id: userIds } });
            if (users.length !== userIds.length) {
              throw Error ({ error: 'Uno o más usuarios no existen.' });
            }
        
            // Crear la conversación
            const conversation = await Conversation.create({ conversationName });
        
            // Asociar usuarios a la conversación
            await conversation.addUsers(userIds);
            return conversation ;
          } catch (error) {
            console.log(error.message)
            throw Error ({ error: error.message });
          }
    },
    async getUserConversations (req, res) {
        try {
            const userId = req.user.id; // ID del usuario autenticado
            
            // Obtener todas las conversaciones del usuario
            const conversations = await Conversation.findAll({
                include: [
                    {
                        model: User,
                        //   where: { id: userId }, // Filtrar conversaciones del usuario actual
                        attributes: ['id', 'username', 'profileImage'], // Atributos visibles de los usuarios
                        where: {
                            id: {
                                [Op.ne]: userId, // Excluimos al usuario autenticado
                            },
                        },
                        through: { attributes: [] },
                    },
                ],
                where: {
                    id: {
                        [Op.in]: Sequelize.literal(`(
                            SELECT "conversationId"
                            FROM "UserConversation"
                            WHERE "userId" = '${userId}'
                            )`),
                        },
                    },
                });
        
            res.status(200).json({ conversations });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },
    async getConversationById (req, res) {
        try {
            const { id } = req.params; // ID de la conversación
        
            const conversation = await Conversation.findOne({
              where: { id },
              include: [
                {
                  model: User,
                  attributes: ['id', 'username'],
                },
              ],
            });
        
            if (!conversation) {
              return res.status(404).json({ error: 'Conversación no encontrada.' });
            }
        
            res.status(200).json({ conversation });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    },

    async updateConversation ({ unreadCount, isFavorite, lastMessage, conversationId }) {
      try {
          const conversation = await Conversation.findOne({
              where: { id: conversationId }
          });
          if (!conversation) {
              return ({ message: 'Conversation not found' });
          }
          console.log("actualizando en back", isFavorite)
          // Actualizamos solo los campos proporcionados
          const updatedConversation = await conversation.update({
            unreadCount: unreadCount === "reset" ? 0 : conversation.unreadCount +1,
            isFavorite: isFavorite !== undefined ? isFavorite : conversation.isFavorite,
            lastMessage: lastMessage !== undefined ? lastMessage : conversation.lastMessage,
          });
          await conversation.save();
          return updatedConversation;
      } catch (error) {
          console.error(error);
          return({ message: 'Internal server error' });
      }
    },

    async deleteConversation (req, res) {
        try {
            const { id } = req.params; // ID de la conversación
        
            const conversation = await Conversation.findByPk(id);
        
            if (!conversation) {
              return res.status(404).json({ error: 'Conversación no encontrada.' });
            }
        
            await conversation.destroy(); // Eliminar la conversación
            socket.emit("conversationDeleted", id);
            res.status(200).json({ message: 'Conversación eliminada con éxito.' });
          } catch (error) {
            res.status(500).json({ error: error.message });
          }
    }
};

module.exports = ConversationController;
