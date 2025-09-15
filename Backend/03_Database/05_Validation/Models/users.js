const mongoose = require('mongoose');
const {Schema} = mongoose;

// We can introduce methods in the schema as well for the code reusability. But, 
// why do we need the methods here ? -> Discussed in 08_SchemaMethods where all 
// the code from this 05_Validation folder is copied there

// Creating Schema of collection along with validation (Schema Level Validation)
const userSchema = new Schema({
    firstName:{
        type:String,
        // Required field; throws a validation error if missing
        required:true,
        minLength:3,
        maxLength:25
    },
    lastName:{
        type:String
    },
    age:{
        type:Number,
        required:true,
        // Must be between 16 and 60 (inclusive); otherwise, validation fails
        min:16,
        max:60
    },
    gender:{
        type:String,
        required:true,
        // Custom validator to allow only specific values
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender");
            }
        }
        // // Alternatively, enum can be used:
        // // Throws a validation error if a different value is provided.
        // enum: ["male", "female", "others"]
    },
    emailId:{
        type:String,
        required:true,
        unique:true, // Ensures that each email is unique in the collection
        trim:true, // Removes leading and trailing whitespaces
        lowercase:true, // Converts the email to lowercase before saving
        immutable:true // Cannot be update once registered - doesn't throw err

    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        // Sets a default profile photo if none is provided
        default:"dummyuser.jpg"
    }
}, {timestamps:true}); // The 'timestamps' option automatically adds 'createdAt' and
// 'updatedAt' fields to the document

const UserCollection = mongoose.model('instausers',userSchema);

module.exports = UserCollection;