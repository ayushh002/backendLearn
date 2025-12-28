const express = require('express');
const app = express();

const {Server} = require('socket.io');

// create a basic http server using express -- will handle normal http requests
const server = app.listen(3000, ()=>{
    console.log("Server listening at port 3000");
});

// upgrade to web socket server using Socket.IO -- will handle web socket requests
const io = new Server(server);

// Here, web socket server are created after the normal server started listening, 
// but when any such request is made in between creation of web socket server &
// making the normal server listen, it won't be able to handle it

// So, first we create a server using http and express and then connect web 
// socket server and finally starts listenting to the express server.
// Refer to the index2.js
