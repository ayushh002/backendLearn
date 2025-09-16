 // Importing JWT for generating tokens
const jwt = require('jsonwebtoken');

// Importing Collection class to process the CRUD operations
const UserCollection = require('../Models/users');

// Import redis client to check for invalid tokens 
const redisClient = require('../config/redis');

// Import .env 
require('dotenv').config()

async function userAuth(request, response, next) {
    try {
        const token = request.cookies.token;
        // Check if the token is available, i.e., request is made after login
        if (!token)
            throw new Error("Token not found. Please login.");

        // Check if token is blacklisted in Redis (invalidated at logout)
        const isInvalidToken = await redisClient.exists(`token:${token}`);
        if(isInvalidToken){
            throw new Error("Invalid Token");
        }

        // Verify token via secret key (throws error if invalid signature/expired)
        const payload = jwt.verify(token, process.env.SECRET_KEY);
        console.log(payload);

        // Fetch user from database using ID in payload
        const user = await UserCollection.findById(payload._id);
        if (!user)
            throw new Error("User not found.");

        // Attach user object to request for later use in route handlers - avoids
        // making another database call later
        request.result = user;

        // Continue to the next middleware or handler
        next();
    }
    catch (err) {
        response.status(401).send("Error: " + err.message);
    }
}

module.exports = userAuth;