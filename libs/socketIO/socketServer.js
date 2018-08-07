const Server = require('socket.io');

function socketServer(httpServer) {
  if (httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
      console.log(`Client connected ${socket.id}`);

      socket.on('sendMessage', (data) => {
        console.log(`Socket data: ${data}`);
      });

      socket.on('disconnect', (reason) => {
         console.log(`Client disconnected ${socket.id} - reason: ${reason}`);
      });

      socket.on('error', (error) => {
        console.log('Socket Error: ', error);
      });
    });
  }
}

module.exports = socketServer;