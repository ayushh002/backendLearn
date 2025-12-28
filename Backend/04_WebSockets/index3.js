const express = require('express');
const app = express();
const http = require('http');
const path = require('path');
const {Server} = require('socket.io');

// Create HTTP server (required to attach Socket.IO)
const server = http.createServer(app);

// Serve the frontend HTML file at root URL
app.get('/', (req, res)=>{
    res.sendFile(path.join(__dirname, 'index.html'));
})

// Attach Socket.IO to the HTTP server
const io = new Server(server);

// Handle new WebSocket connections (requests)
io.on('connection',(socket)=>{
    console.log('client connected:', socket.id);
    
    socket.on('message', ({message, roomId})=>{

        if(!message.trim()) return;

        if(roomId){
            socket.to(roomId).emit('new-message', message);
        }
        else{
            socket.broadcast.emit('new-message', message);
        }
    })

    // create/join a seperate room
    socket.on('join-room', (roomId)=>{
        socket.join(roomId);
    })
    
    socket.on('disconnect',()=>{
        console.log("Disconnected from Server");
    })
})

server.listen(3000, ()=>{
    console.log("Server listening at port 3000");
});


