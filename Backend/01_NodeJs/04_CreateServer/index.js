// Making a server using the built-in http module in Node.js
const http = require('http');

// Creating a server (returns a server object)
const server = http.createServer((request, response)=>{
    // Sending response by our server
    // Lets try to mimic simple routing based on the requested URL
    if(request.url == '/')
        response.end('Welcome to Home Page');
    else if(request.url === '/contact')
        response.end('Welcome to Contact page');
    else if(request.url === '/about')
        response.end('Welcome to About page');
    else{
        response.statusCode = 404; // It's good practice to set the status code for errors
        response.end('Error to load the url');
    }
    // In a real application, we would typically response with the actual HTML/JS files here
})

// Making the server listen on port 4000
server.listen(4000,()=>{
    console.log("Server is listening at port number 4000");
})

// Now run this file - node index.js - it print - Server is listening....

// Now open this on the web browser `localhost:4000` - We have made the server 
// in our own computer. It shows `Welcome to Home Page` on the screen

// Although, we can create servers directly using Node.js, we often use frameworks like 
// Express.js as they make the process much easier and require fewer lines of code for the 
// same functionality. Express simplifies tasks like routing, handling middleware, & parsing 
// requests. It also makes the codebase more readable, modular, and maintainable.
