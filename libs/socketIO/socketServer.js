const Server = require('socket.io');
const listUsers = {};

function socketServer(httpServer) {
  if (httpServer) {
    const io = new Server(httpServer);

    io.on('connection', (socket) => {
      listUsers[socket.id] = {
        id: socket.id,
        socket: socket,
        name: 'Guest'
      };
      console.log(`A client connected ${socket.id}`);

      socket.on('userInfo', (data) => {
        if (data && data.name) {
          listUsers[socket.id].name = data.name
          console.log(`A client connected ${socket.id}`);
        }
      });

      socket.on('sendMessage', (data) => {
        let currentUser = listUsers[socket.id];
        if (currentUser) {
          console.log(`User "${currentUser.name}" sent message "${data}"`);
          // send others
          for (id in listUsers) {
            if (listUsers[id] && listUsers[id].id !== socket.id && listUsers[id].socket) {
              listUsers[id].socket.emit('receiveMessage', {
                name: currentUser.name,
                message: data
              });
            }
          }
        }
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