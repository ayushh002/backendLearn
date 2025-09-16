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

// Import redisClient to connect to redis server
const redisClient = require('../config/redis');

// Import Rate Limiter
const rateLimiter = require('../middleware/rateLimiter');

// Import cookie-parser to extract JWT from cookies
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// Middleware to parse incoming JSON request bodies
app.use(express.json());


// Mount Rate Limiter before any other requests
app.use(rateLimiter);

// Mount route handlers - attaching the router to a specific path
app.use("/", authRouter); 
app.use(opRouter);



// Connect to the redis server then connect the database and start the server
// - In a better way - without chaining in the old way
const Connection = async () => {
    try{
        // // connect to redis server
        // await redisClient.connect();
        // console.log("Connected to Redis Server");
        
        // // Connect to the database
        // await main();
        // console.log("Connected to the Database");

        // Connect both the databases in parallel
        await Promise.all([redisClient.connect(), main()]);
        console.log("Connected to Database");

        // Start the express server
        app.listen(process.env.PORT, ()=>{
            console.log("Server is active at port 3001");
        })
    }
    catch(err){
        console.log("Error: "+err.message);
    }
}

Connection();