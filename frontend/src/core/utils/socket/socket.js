// src/socket.js
import { io } from 'socket.io-client';

const socket = io("https://lumin-cgtj.onrender.com", {
  transports: ["websocket"],
  query: {
    userId: "123456",  // Aquí pones el ID del usuario
  },
});

socket.on('connect', () => {
  console.log('Conectado al servidor de Socket.IO',);
});

export default socket;
