const express = require('express');
const app = express();

// Importing the model (collection class) based on schema
const UserCollection = require('../Models/users');

// Importing the main function to connect to the database
const main = require('./database');

// Middleware for parsing the data into json format
app.use(express.json());

// Route to fetch all user details from the database and send them to the frontend
app.get('/getusers',async(request,response)=>{
    const users = await UserCollection.find({});
    response.send(users);
})

// Route to add a new user to the database using data sent in the request body
app.post('/adduser',async(request,response)=>{
    try{
        await UserCollection.create(request.body);
        response.status(201).send("Added User Successfully.")
    }
    catch(err){
        response.status(500).send("Some Error Occurred", err);
    }
})

// Route to delete a user with a specific name
app.delete('/deleteuser',async (request, response)=>{
    await UserCollection.deleteOne({name:"Shreya"});
    response.send("Deleted");
})

// Route to update a user's details
// Only updates the first document that matches the condition
app.put('/updateuser',async (request, response)=>{
    const updated = await UserCollection.updateOne({name:"Ayush"}, {$set: {age:40, city:"Gurgaon"}});
    response.send(`Matched: ${updated.matchedCount} , Modified: ${updated.modifiedCount}`);
})


// First, Connect to the database, then start the Express server
main()
.then(async ()=>{
    console.log("Database Connected.");
    app.listen(3002,()=>{
        console.log("Server in active at port 3002");
    })
    // // We can also perform direct DB operations here if needed
    // // Example: Fetch all female users
    // const ladyUsers = await UserCollection.find({gender:"female"});
    // console.log("All the female user details: ",ladyUsers); 
})
.catch((err)=>console.log(err));