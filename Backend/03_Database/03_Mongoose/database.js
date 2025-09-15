const mongoose = require('mongoose');
const {Schema} = mongoose;

// Url to connect to MongoDB cluster - includes the database name.
// If the specified database doesn't exist, MongoDB will automatically create it.
const url = 'mongodb+srv://ayushh002:userPassword@codingclub.4tygwex.mongodb.net/backend';

async function main() {

    await mongoose.connect(url);

    // Defining a schema for our user collection
    const userSchema = new Schema({
        name:String,
        age:Number,
        gender:String,
        city:String
    })
    // Documents with fewer fields than specified are allowed,
    // but any extra fields not defined in the schema will be rejected.

    // Create a model (i.e., a class) based on the schema.
    // This model acts as a blueprint that can be instantiated to construct documents
    const UserCollection = mongoose.model('users',userSchema);


    // Insert a document using an instance of the model
    const user1 = new UserCollection({name:"Ayush",age:21,gender:"male",city:"Patna"});
    await user1.save();

    // Alternate method to insert a single document
    await UserCollection.create({name:"Raj",age:22,gender:"male",city:"Bihta"});

    // Insert multiple documents at once
    await UserCollection.insertMany([
        {name:"Shristy",age:23,gender:"female"},
        {name:"Shreya",age:24,gender:"female",city:"Delhi", vill: "Raghopur"}
        ]); // Note: The 'vill' field in the second document will be ignored, as it
           // isn't defined in schema. Other fields will be inserted without error.

    // Mongoose automatically adds a `__v` field to each document.
    // This is a version key used internally for document versioning.
    // It starts at 0 and increments with each document update.


    // Retrieve all documents from the collection
    const users = await UserCollection.find({});
    console.log(users);
    
    // // Retrieve documents matching a specific field
    // const ladyUsers = await UserCollection.find({gender:"female"});
    // console.log(ladyUsers); 

}

main()
.then(()=>console.log("All operations are Completed."))
.catch((err)=>console.log(err));
// .finally()


// Note: Mongoose automatically converts collection names to lowercase and pluralizes
// them. For example, if you define the model name as 'User', Mongoose will use the
// 'users' collection. If a 'user' collection already exists, Mongoose will still 
// create and use a new 'users' collection.


// Now, to make the code cleaner, we will  be seperating the schema and model 
// definitions into a different file - `users.js` inside `Models` folder.
// And instead of using this database script directly for operations, we will
// use an Express server (e.g., an `index.js` file inside a `src` folder) to
// perform CRUD operations.



// Mongoose is the name of folder inside Postman
