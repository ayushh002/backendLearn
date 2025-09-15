const express = require('express');

const app = express();

// Middleware
app.use(express.json());

app.use('/user',(request, response, next)=>{
    console.log("First "); // gets printed on terminal
    // response.send("Active User One"); // one response is sent
    console.log("Second"); // also gets printed on terminal

    // response.send("Active User One Part 2");
    // Throws error as only one response can be sent per request. If response.send()
    // is called, the request cycle ends there, and next middleware won't run
    // (socket connection is closed after the response is sent).
    
    next(); // Passes control to the next route handler

    // This line runs after the second middleware (route handler) completes,
    // due to JavaScript's synchronous call stack.
    console.log("Fifth");
},
// This function runs only if `next()` is called in the previous middleware
(request, response)=>{
    console.log("Third");
    response.send("Active User Two"); // Response sent to client
    console.log("Fourth"); // Still gets logged, even after sending the response


}
);
// After using next in first callback the second function is run, but remember that
// even though multiple middleware can run, only one should send the final response.

// Important: If no response is sent at all, the client (browser/Postman) will keep
//  waiting indefinitely.

// Route handlers can also be grouped in an array and passed together,
// or defined separately using multiple `app.use()` calls.

// In Express, a callback function that calls `next()` to pass control to the 
// next function in the chain is called a `middleware`.

// The final function in the chain that sends the response using `res.send()` 
// (or similar methods) is known as the `request handler`.


app.listen(2002,()=>{
    console.log("Listening at 2002");
})