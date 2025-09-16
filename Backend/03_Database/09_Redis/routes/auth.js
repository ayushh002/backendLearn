const express = require('express');

const authRouter = express.Router();

// Importing validate function to validate the inputs
const validate = require('../utils/validation');

// Importing bcrypt to hash passwords
const bcrypt = require('bcrypt');

// Import UserCollection model to handle CRUD operations
const UserCollection = require('../Models/users');

// Import JWT for signing and decoding tokens
const jwt = require('jsonwebtoken');

// Import Redis client to store invalidated tokens
const redisClient = require('../config/redis');

// Import middleware to authenticate user before logout
const userAuth = require('../middleware/userAuth');


// Register new user through request body from postman
authRouter.post('/register', async (request, response)=>{
    try{   
        // Api Level Validation (in separate file)
        validate(request);

        // Convert the password into hash code
        request.body.password = await bcrypt.hash(request.body.password,10); 

        await UserCollection.create(request.body);
        response.status(201).send('User Registered Successfully');
    }
    catch(err){
        response.send("Error: "+err.message);
    }
});

// User Login 
authRouter.post('/login', async (request, response)=>{
    
    try{
        // Fetch user details from the database using the unique emailId
        // This is the only database call in this route
        const user = await UserCollection.findOne({emailId: request.body.emailId});

        if(!user)
            // If no matching emailId is found in the database
            throw new Error("Invalid User Credentials");

        // Verify the password using the schema method - No Database calls
        // Must use 'await' — without it, the method returns a Promise,
        // which is always true, allowing login with any password
        const isValid = await user.verifyPassword(request.body.password);

        if(isValid){
             // Generate a JWT token using the schema method (no DB query)
            const token = user.getJWT(); // No Database calls
            
            // Send the JWT token as a cookie upon successful login
            response.cookie("token", token);
            response.send("User Login Successfull");
        }
        else{
            response.send("Invalid User Credentials");
        }
    }
    catch(err){
        response.send("Error: "+err.message);
    }
})

// User Logout
authRouter.post('/logout', userAuth, async (request, response)=>{
    try{
        const {token} = request.cookies;

        // Mark the token as invalid (blacklist it in Redis)
        await redisClient.set(`token:${token}`, "Blocked");

        // Decode the JWT payload to get the expiry time (userAuth middleware
        // already attach this to request, but we decode here for clarity)
        const payload = jwt.decode(token);

        // Automatically expire the token after 30 minutes - total time to live
        // await redisClient.expire(`token:${token}`, 1800); // not correct as it
        // is relative to the current time.

        // Expires the token by checking validity from 1 Jan 1970 (UNIX timestamp)
        // Ensure Redis key expires exactly when the JWT expires
        await redisClient.expireAt(`token:${token}`, payload.exp);

        // Clear the token cookie immediately on the client
        response.cookie("token",null,{expires: new Date(Date.now())});
        response.send("Logged Out Successfully");
    }
    catch(err){
        response.send("Error: "+err.message);
    }
})


module.exports = authRouter;