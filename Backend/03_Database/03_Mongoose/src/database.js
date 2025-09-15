const mongoose = require('mongoose');

// Importing the model (collection class) based on schema
const UserCollection = require('../Models/users');

const url = 'mongodb+srv://ayushh002:userPassword@codingclub.4tygwex.mongodb.net/backend';

async function main() {
    // Connect to the MongoDB cluster
    await mongoose.connect(url);

    // Add a document to the collection by making an object of userCollection model
    const user1 = new UserCollection({name:"Ayush",age:21,gender:"male",city:"Patna"});
    await user1.save();

    // Alternate method to insert a single document
    await UserCollection.create({name:"Raj",age:22,gender:"male",city:"Bihta"});

    // Insert multiple documents at once
    await UserCollection.insertMany([
        {name:"Shristy",age:23,gender:"female"},
        {name:"Shreya",age:24,gender:"female",city:"Delhi", vill: "Raghopur"}
        ]); 

    // Retrieve all documents from the collection
    const users = await UserCollection.find({});
    console.log(users); 
    
    // // Retrieve documents matching a specific field
    // const ladyUsers = await UserCollection.find({gender:"female"});
    // console.log(ladyUsers); 

}

// Exporting the main function to be used in other modules (e.g., Express server)
module.exports = main;

