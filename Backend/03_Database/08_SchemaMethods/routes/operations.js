const express = require('express');

const opRouter = express.Router();

// Importing the token verification middleware
const userAuth = require('../middleware/userAuth');

// Importing bcrypt to hash the password
const bcrypt = require('bcrypt');

// Importing Collection class to process the CRUD operations
const UserCollection = require('../Models/users');

// Retreive all the users
opRouter.get('/getusers', async (request, response)=>{
    try{
        const users = await UserCollection.find({});
        response.send(users);
    }
    catch(err){
        response.send("Error: "+err.message);
    }
});

// Retrieve a particular user using the ID from cookies (consider - viewing the 
// profile) - Will not work if the user is not logged in
opRouter.get('/getuser', userAuth, async (request, response)=>{
    try{
        response.send(request.result);
    }
    catch(err){
        response.send("Error: "+err.message);
    }
});

// Remove a user by unique Id using query parameter
opRouter.delete('/deleteuser', async (request, response)=>{
    try{
        const deleted = await UserCollection.findByIdAndDelete(request.query.id);
        response.send(`User: ${deleted._id} Removed Successfully`);
    }
    catch(err){
        response.send("Error Occurred: "+err.message);
    }
})

// Updating a user details
// We can send the id from the cookies rather than sending it from request.body (actual apps implementation)
opRouter.patch('/updateuser', userAuth, async(request, response)=>{
    try{
        const {_id, ...update} = request.body;
        if(update.password)
            update.password = await bcrypt.hash(update.password,10);
        const updatedUser = await UserCollection.findByIdAndUpdate(_id, update, {"runValidators":true, new: true});
        // using new: true returns the updated document, by default it returns the document before updating
        response.send(`Updated User: ${updatedUser._id}`);
    }
    catch(err){
        response.status(500).send("Error occurred: "+err.message);
    }
})

module.exports = opRouter;