const express = require("express");
const http = require("http"); // To create an HTTP server for Socket.IO
const { Server } = require("socket.io"); // Import the Server class from socket.io
const app = express();
const cors = require("cors");

app.use(cors()); // For cross-origin resource sharing (React <-> Node)

const server = http.createServer(app); // Create an HTTP server

const io = new Server(server, {
    cors: {
      origin: "http://localhost:3000", // Allow requests from React app
      methods: ["GET", "POST"],
    },
  });

  io.on('connection',(socket)=>{
    console.log(`a new client connected :${socket.id}`);

    socket.on('message',(message)=>{
        console.log(`client :${socket.id} says :${message}`);
        io.emit('message',message);
    })

    socket.on('disconnet',()=>{
        console.log("A user disconnected");
    })
  });

  app.get('/',(req,res)=>{
    res.send('get method on server running')
  })

  server.listen(5000, () => {
    console.log("Server is running on port 5000");
  });
  