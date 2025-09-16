const validator = require('validator');

function validate(request){
    // API Level Validation for required fields
    const mandatoryFields = ["firstName", "age", "gender", "emailId", "password"];
    const requestFields = Object.keys(request.body);
    const isValid = mandatoryFields.every(field=>requestFields.includes(field));

    if(!isValid)
        throw new Error("Some Required fields are missing");
    
    // Checking the correct format of email & password being used
    // Either we can create our own logic from scratch to handle password and email
    // correct format, or we can use the npm validator which has all the code to 
    // check these formats : `npm i validator`
    // validator documentation: `https://www.npmjs.com/package/validator`

    // Email Validation
    if(!validator.isEmail(request.body.emailId)){
        throw new Error("Invalid Email");
    }
    if(!validator.isStrongPassword(request.body.password)){
        throw new Error("Weak Password");
    }
    if(request.body.firstName)
        if(!(request.body.firstName.length>=3 && request.body.firstName.length<=25)){
            throw new Error("First Name length should be between 3 and 25");
        }
}

module.exports = validate;