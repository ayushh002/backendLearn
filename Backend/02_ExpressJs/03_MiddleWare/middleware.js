// First, refer to the `index.js` file

// Use Case of Middleware: It can be used to perform operations like logging, authe
// -ntication, parsing, etc., before the request reaches the actual route handler.

const express = require('express');
const app = express();

// Middleware to parse json to Js object for every request
app.use(express.json());

// For each request (GET, POST, PATCH) made to the server, we can maintain a log or
// perform other tasks using middleware.
// The logs can include useful details such as:
// - The time when the request was received
// - The URL that was accessed
// - The HTTP method used (GET, POST, PATCH, etc.)
// - Any other relevant metadata (e.g., IP address, headers, etc.)

// Logging middleware Example
app.use((req, res, next) => {
  const currentTime = new Date().toISOString();
  console.log(`[${currentTime}] ${req.method} request made to ${req.url}`);
  // Authentication/Authorization code can also be written here
  next(); // Passes control to the next middleware/route handler
}); 
// This middleware will automatically log the details for every request before
// it reaches any specific route like /user. 

// Defining route handlers for different HTTP methods on the '/user' route
app.get('/user',(request, response)=>{
  response.status(200).send("Sending User Details");
})
app.post('/user',(request, response)=>{
  response.status(201).send("Adding New User");
})
app.patch('/user',(request, response)=>{
  response.status(200).send("Updating User Details");
})

// Note:
// 1. Storing Logs helps us keep the details and debug problems when server crashes.
// 2. Consider a case where another user (e.g., from a different Instagram account)
// tries to change my username directly using a PATCH request.
// Allowing such operations without any checks is unsafe.
// This is why authentication and authorization are important:
// - Authentication ensures the user is who they claim to be (e.g., via login/token)
// - Authorization ensures that only authenticated users have permission to peform
//   the requested action. In simple terms, it means granting access to data or 
//   functionality only to the rightful, authenticated user. 
//   For example, allowing a user to change their own username, but restricting them
//   from changing someone else's username.
// So, Always verify identity and permissions before allowing any sensitive CRUD 
// operations.


app.listen(2001, ()=>{
  console.log("Listening at 2001");
})