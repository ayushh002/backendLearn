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

    // individual socket device
    socket.on('message', (data)=>{
        // broadcast to ALL connected sockets (including sender)
        // io.emit('new-message', data); 

        // to everyone except sender:
        socket.broadcast.emit('new-message', data);
    })

    
    socket.on('disconnect',()=>{
        console.log("Disconnected from Server");
    })
})

server.listen(3000, ()=>{
    console.log("Server listening at port 3000");
});


