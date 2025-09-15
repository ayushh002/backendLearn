// Importing JWT for generating tokens
const jwt = require('jsonwebtoken');

// Importing Collection class to process the CRUD operations
const UserCollection = require('../Models/users');

async function userAuth(request, response, next) {
    try {
        // Check if the token is available, i.e., request is made after login
        if (!request.cookies.token)
            throw new Error("Token doesn't exist");

        // Verify user using private key and cookies from the request
        // Automatically throws an error if the signature doesn't match
        const payload = jwt.verify(request.cookies.token, "Ayush");
        console.log(payload);

        const user = await UserCollection.findById(payload._id);

        if (!user)
            throw new Error("No user found");

        // Append the user object to the request for reuse in the route handler
        // This avoids making another database call later
        request.result = user;

        // Continue to the next middleware or handler
        next();
    }
    catch (err) {
        response.send("Error: " + err.message);
    }
}

module.exports = userAuth;