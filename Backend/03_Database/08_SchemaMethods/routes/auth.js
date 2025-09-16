const express = require('express');

const authRouter = express.Router();

// Importing validate function to validate the inputs
const validate = require('../utils/validation');

// Importing bcrypt to hash the password
const bcrypt = require('bcrypt');

// Importing Collection class to process the CRUD operations
const UserCollection = require('../Models/users');


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
        response.status(400).send("Error: "+err.message);
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
// Sending null as the token with expiry = Date.now() - clears the cookie.
// Sending another token replaces the old one.
authRouter.post('/logout', async (request, response)=>{
    try{
        // Now, the user must re-login to access anything.
        // But consider this: if the previous token hasn’t expired and the user
        // saved that token before logout, they can still access everything after
        // logout using that token, since it remains valid until its expiry.
        // To prevent this, we need to store the logged-out token somewhere 
        // (as discussed in 04_Redis/01_Introduction).
        response.cookie("token",null,{expires: new Date(Date.now())});
        response.send("Logged Out Successfully");
    }
    catch(err){
        response.send("Error: "+err.message);
    }
})


module.exports = authRouter;