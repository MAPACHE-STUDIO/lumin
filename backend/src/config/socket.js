const socketIO = require('socket.io');
const ConversationController = require('../controllers/conversation.controller');

const setupSocket = (server) => {
  const io = socketIO(server, {
    cors: {
      origin: process.env.CLIENT_URL || "http://localhost:3000",
      methods: ["GET", "POST"]
    }
  });

  io.on('connection', (socket) => {
    const userId = socket.handshake.query.userId;
    console.log(`Usuario conectado con ID: ${userId}`);

    socket.on("sendMessage", (data) => {
      io.emit("newMessage", data)
      io.emit("updateMessages")
    })

    socket.on("newConversation", () => {
      io.emit("updateConversation")
    })

    socket.on("resetNotifications", (conversationId) => {
      ConversationController.updateConversation({conversationId, unreadCount : "reset"})
      io.emit("notificacionReaded")
    })

    socket.on("deleteConversation", () => {
      io.emit("conversationDeleted")
    })

    socket.on("favorito", (conversationId) => {
      ConversationController.updateConversation({conversationId, isFavorite : "true"})
      io.emit("isFavorite")
    })

    socket.on("upload", () => {
      io.emit("uploadCompleted")
    })

    socket.on('disconnect', () => {
      console.log('Usuario desconectado:', socket.id);
    });
  });

  return io;
};

module.exports = setupSocket;