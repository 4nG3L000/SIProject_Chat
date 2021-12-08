const express = require('express');
const app = express();
const path = require("path")
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      console.log('user disconnected');
    });

    socket.on('chat:message', (data) => {
        io.sockets.emit('res:message', data)
    })
  });


server.listen(app.get("port"));
console.log(`servidor iniciado:${app.get("port")}`);