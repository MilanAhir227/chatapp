// socket.js
const { Server } = require("socket.io");
const MESSAGE = require("./model/Message");

function setupSocket(server) {
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  io.on("connect", (socket) => {
    console.log(`User connected`);
    console.log(io.userid);
    socket.on('joinRoom', (roomName) => {
      socket.join(roomName);
      console.log(`User joined room: ${roomName}`);
    });
    socket.on('sendMessage', (roomName, message) => {
      io.to(roomName).emit('message', message);
    });
    const rooms = io.of("/milan").adapter.sids;
    console.log("socket rooms",rooms)
  });
  
  return io;
}

module.exports = setupSocket;
