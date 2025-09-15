// Importing MongoClient Class for connection
const { MongoClient } = require("mongodb");

// url to connect to the cluster of databases
// const url = 'mongodb+srv://ayushh002:Anshuman@1104@codingclub.4tygwex.mongodb.net/';
const url = 'mongodb+srv://ayushh002:Anshuman%401104@codingclub.4tygwex.mongodb.net/';

// Making an object of mongoDb with the url
const client = new MongoClient(url);

// Database Name
const dbName = 'backend';

// async function to connect to the database
async function main(){
    // Establishing connection to MongoDb cluster
    await client.connect();
    console.log('Server Connected successfully');

    // Selecting the required database from the cluster - it doesn’t verify if it 
    // exists until we perform some operation (like insert or read). No await used.
    const db = client.db(dbName);

    // Selecting a particular collection from the database - this does not check if 
    // the collection actually exists. It just prepares a reference. No await used.
    const collection = db.collection('user');

    // Insertion, deletion, or updation code goes here...

    // Inserting a document
    const insertedItem = await collection.insertOne({name:"Reet", age:20});
    console.log("Inserted the Document: ", insertedItem);

    // Inserting Many Documents
    const manyInsertedItem = await collection.insertMany([
        {name:"Raj", age:21},
        {name:"Mohan", age:23},
    ]);
    console.log("Inserted the Document: ", manyInsertedItem);

    // View all the documents from user collection

    // During this operation it is checked that the database/collections exists
    // If the collection doesn't exist, MongoDB won’t throw an error.
    // It will return an empty array because there's nothing there yet.
    // const result = await collection.find({}).toArray();
    // console.log(result);
    
    const result = collection.find({});
    for await (const doc of result)
        console.log(doc);
    

    return 'All Operations Completed.';
}

// calling the function
main()
.then(console.log)            // Logs success message if all goes well
.catch(console.error)         // Logs error if something goes wrong
.finally(()=>client.close()); // Always closes MongoDB connection


// refer database.md