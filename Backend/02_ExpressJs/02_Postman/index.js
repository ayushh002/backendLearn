// Creating a server in express
const express = require('express');

const app = express();

// Middleware which does the parsing (converts Json string into Js object)
// When the conversion is done, most of the times it keeps the number type
// values as string as it doesn't know which field is number inside string
// So, it is better to check type of that value before using it.
app.use(express.json()); 

// We can route to different paths
// Home Page
app.get("/",(request, response)=>{
    // Sending response as a json format
    response.send("Welcome to Home Page");
})
// Api Response Page
app.get("/response",(request, response)=>{
    // Sending response as a json format
    response.send({"name":"Ayush", "Age":20, "id":83});
})
// About Page 
app.get("/about",(request, response)=>{
    // Sending response as a json format
    response.send("Welcome to About Page");
})
// Contact Page - params are used here (multiple params can be sent)
// sending data to the server through postman (Body -> raw)
app.post("/contact/:id/:user",(request, response)=>{
    // console.log(request.params);

    console.log(request.body); // prints undefined
    // To get body sent from postman we need to use middleware
    // in express which parse data into json
    response.send("Welcome to Contact Page");
})

// Make the server listen at port 4000
app.listen(4000, ()=>{
    console.log('Listening at 4000');
})
