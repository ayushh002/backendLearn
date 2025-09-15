const mongoose = require('mongoose');
const {Schema} = mongoose;

// Define the schema for the user collection
const userSchema = new Schema({
    name:String,
    age:Number,
    gender:String,
    city:String
})

// Create a model based on the schema which acts as a class for the collection and
// is used to create and manage documents.
const UserCollection = mongoose.model('users',userSchema);

// Exporting the collection 
module.exports = UserCollection;