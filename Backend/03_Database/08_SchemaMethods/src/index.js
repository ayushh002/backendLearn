// Import Express to create the backend server
const express = require('express');
const app = express();

// Import the function to establish the database connection
const main = require('./database');

// Import authentication-related routes (register, login, etc.)
const authRouter = require('../routes/auth');

// Import other operation-related routes
const opRouter = require('../routes/operations')

// Load environment variables from .env file
require('dotenv').config();

// Import cookie-parser to extract JWT from cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware to parse incoming JSON request bodies
app.use(express.json());


// Mount route handlers - attaching the router to a specific path
app.use("/", authRouter); // or just app.use(authRouter) – matches from "/"
app.use(opRouter); // will check routes in each express router one by one

// Better: assign different base paths to avoid unnecessary checks
// app.use("/auth", authRouter); // Access via /auth/login
// app.use("/operation", opRouter); // Access via /operation/getuser
// How it works internally - working.md


// Connect to the database, then start the server
main()
.then(()=>{
    console.log("Connected to the Database");
    app.listen(process.env.PORT, ()=>{
        console.log("Server is active at port 3001");
    })
})
.catch((err)=>console.log(err));