const mongoose = require('mongoose');
const {Schema} = mongoose;

// Importing JWT for generating tokens
const jwt = require('jsonwebtoken');
// Importing the bcrypt to verify password
const bcrypt = require('bcrypt');

// Import .env 
require('dotenv').config()

// Creating Schema of collection along with validation (Schema Level Validation)
const userSchema = new Schema({
    firstName:{
        type:String,
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
        min:16,
        max:60
    },
    gender:{
        type:String,
        required:true,
        
        validate(value){
            if(!["male", "female", "others"].includes(value)){
                throw new Error("Invalid Gender");
            }
        }
        // // Alternatively, enum can be used:
        // enum: ["male", "female", "others"]
    },
    emailId:{
        type:String,
        required:true,
        unique:true,
        trim:true, 
        lowercase:true,
        immutable:true 

    },
    password:{
        type:String,
        required:true
    },
    photo:{
        type:String,
        default:"dummyuser.jpg"
    }
}, {timestamps:true});

// We are defining methods in the schema

// Method to generate token 
userSchema.methods.getJWT = function(){
    // using this operator to access the fields from the object created
    const token = jwt.sign({_id:this._id, emailId:this.emailId}, process.env.SECRET_KEY, {expiresIn:"7 days"});
    return token;
}

// Method to verify password
userSchema.methods.verifyPassword = async function(userPass){
    const isValid = await bcrypt.compare(userPass, this.password);
    return isValid;
}

// a class of collection which can have fields and methods
const UserCollection = mongoose.model('instausers',userSchema);

module.exports = UserCollection;