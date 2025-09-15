// Importing express for backend server
const express = require('express');
const app = express();

// Importing the database main function to connect to Database
const main = require('./database');

// Importing Collection class to process the CRUD operations
const UserCollection = require('../Models/users');

// Importing validate function to validate the inputs
const validate = require('../utils/validation');

// Importing bcrypt to hash the password
const bcrypt = require('bcrypt');

// Importing JWT for generating tokens
const jwt = require('jsonwebtoken');

// Importing the token verification middleware
const userAuth = require('../middleware/userAuth');

// Importing cookie parser to parse the jwt from cookie
const cookieParser = require('cookie-parser');
app.use(cookieParser());

// For parsing the incoming data from request to Json format
app.use(express.json());

// Register new user through request body from postman
app.post('/register', async (request, response)=>{
    try{   
        // Api Level Validation (in separate file)
        validate(request);

        // Convert the password into hash code
        request.body.password = await bcrypt.hash(request.body.password,10); 

        await UserCollection.create(request.body);
        response.send('User Registered Successfully');
    }
    catch(err){
        response.send("Error: "+err.message);
    }
});

// User Login 
app.post('/login', async (request, response)=>{
    
    try{
        // validation of the input code goes here

        // Get user details from database by the user email Id (each email is unique)
        const user = await UserCollection.findOne({emailId: request.body.emailId});

        if(!user)
            // If the emailId is not available in our database
            // responding email id not registered is not considered as a good practice
            throw new Error("Invalid User Credentials");

        // check that the password is correct or not
        const isValid = await bcrypt.compare(request.body.password, user.password);

        if(isValid){
            // Sending JWT token in the form of a cookie when the user login
            // jwt.sign({payload}, "privateKey", expiration Time - Optional);
            const token = jwt.sign({_id:user._id, emailId:user.emailId}, "Ayush", {expiresIn:"1d"});
            // The payload contains a iat field which is it's creation time
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

// Retreive all the users
app.get('/getusers', async (request, response)=>{
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
app.get('/getuser', userAuth, async (request, response)=>{
    try{
        // this userAuth middleware can be applied to delete and update but for 
        // that, first the user needs to login and we have to change our code there
        // for the particular user delete and update operations which currently
        // deletes or updates any user not the logged in user.
        response.send(request.result);
    }
    catch(err){
        response.send("Error: "+err.message);
    }
});

// Remove a user by unique Id using query parameter
app.delete('/deleteuser', async (request, response)=>{
    try{
        // await UserCollection.findOneAndDelete({firstName:"Anshuman", lastName:"Sharma"});
        const deleted = await UserCollection.findByIdAndDelete(request.query.id);
        response.send(`User: ${deleted._id} Removed Successfully`);
    }
    catch(err){
        response.send("Error Occurred: "+err.message);
    }
})

// Updating a user details
// We can send the id from the cookies rather than sending it from request.body (actual apps implementation)
app.patch('/updateuser', userAuth, async(request, response)=>{
    try{
        const {_id, ...update} = request.body;
        // Third argument ensures schema validations are applied during the update.
        // Without it, validations defined in the schema (e.g., trim, enum) will be 
        // skipped during the update, even though they apply during creation (POST).
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

main()
.then(()=>{
    console.log("Connected to the Database");
    app.listen(3001,()=>{
        console.log("Server is active at port 3001");
    })
})
.catch((err)=>console.log(err));