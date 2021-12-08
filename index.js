const express = require('express');
const app = express();
const path = require("path")
const http = require('http');
const mongoose = require('mongoose')
const Message = require('./public/models/message')
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let users_list = []

app.set("port", process.env.PORT || 3000);
app.use(express.static(path.join(__dirname, "public")));

mongoose.connect('mongodb+srv://siproject:siproject@siproject.g8owq.mongodb.net/chat_db?retryWrites=true&w=majority')
  .then(db => console.log('db connected'))
  .catch(err => console.log(err))

io.on('connection', (socket) => {
    console.log('a user connected');

    socket.on('disconnect', () => {
      if (!socket.user) return
      users_list.splice(users_list.indexOf(socket.user), 1)
      io.sockets.emit('users:list', users_list)
    });

    socket.on('chat:message', async (data) => {
        await new Message({
          user: socket.user,
          msg: data.message
        }).save()

        io.sockets.emit('res:message', data)
    })

    socket.on('new:user_conn', async (data, cb)=>{
      if(users_list.indexOf(data) != -1){
        cb(false)
      }else{
        cb(true)
        socket.user = data
        users_list.push(socket.user)
        io.sockets.emit('users:list', users_list)

        let old_messages = await Message.find()
        console.log(old_messages);
        socket.emit('old:messages', old_messages)
      }
    })
  });


server.listen(app.get("port"));
console.log(`servidor iniciado:${app.get("port")}`);