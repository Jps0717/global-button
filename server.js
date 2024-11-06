const express = require('express');
const http = require('http');
const socketIo = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

let globalCount = 0;

// Serve the HTML file
app.use(express.static('public'));

// Listen for button press events
io.on('connection', (socket) => {
  console.log('A user connected');
  
  // Send the current global count to the new user
  socket.emit('updateCount', globalCount);

  // When a user presses the button
  socket.on('buttonPressed', () => {
    globalCount++;
    io.emit('updateCount', globalCount);  // Broadcast updated count to all users
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// Start server
server.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});
