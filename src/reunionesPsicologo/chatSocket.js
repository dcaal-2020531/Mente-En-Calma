// chatSocket.js
export const configureChatSocket = (io) => {
  io.on('connection', (socket) => {
    console.log('🟢 Cliente conectado al chat, id:', socket.id);

    // Cuando un cliente envía un mensaje al chat
    socket.on('chat:mensaje', (msg) => {
      console.log(`Mensaje recibido: ${msg} de ${socket.id}`);
      // Emitir el mensaje a TODOS los clientes conectados
      io.emit('chat:mensaje', msg);
    });

    // Cuando un cliente se desconecta
    socket.on('disconnect', () => {
      console.log('🔴 Cliente desconectado, id:', socket.id);
    });
  });
};
