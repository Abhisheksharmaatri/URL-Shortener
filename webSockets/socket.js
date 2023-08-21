// socket.js
const socketio = require('socket.io')

module.exports = function (server) {
  const io = socketio(server, {
    cors: {
      origin: 'http://localhost:3000',
      methods: ['GET', 'POST', 'DELETE']
    }
  })

  // Define WebSocket logic here
  io.on('connection', socket => {
    console.log('A user connected')

    // Handle events here
    socket.on('chat message', message => {
      console.log('Message received:', message)

      // Broadcast the message to all connected clients
      io.emit('chat message', message)
    })

    // Handle disconnections
    socket.on('disconnect', () => {
      console.log('A user disconnected')
    })
  })
  return io
}
