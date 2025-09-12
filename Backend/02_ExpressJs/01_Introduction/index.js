// Creating a server in express
const express = require('express');

const app = express();

// We can route to different paths
// Api Response Page
app.use("/response",(request, response)=>{
    // Sending response as a json format
    response.send({"name":"Ayush", "Age":20, "id":83});
})
// About Page - params are used here (multiple params can be sent)
app.use("/about/:id/:user",(request, response)=>{
    // Sending response as a json format
    console.log(request.params);
    response.send("Welcome to About Page");
})
// Contact Page
app.use("/contact",(request, response)=>{
    // Sending response as a json format
    response.send("Welcome to Contact Page");
})
// If we write this default page above all the other specific routes it will catch all the routed
// requests since `/` is a prefix to everything so it goes to that page by assuming that the nested
// path is handled inside that's why it is better to use .get, .post etc, in place of .use (it accepts
// every request such as get, post, etc., i.e, it ignores the request method)
// Home Page
app.use("/",(request, response)=>{
    // Sending response as a json format
    response.send("Welcome to Home Page");
})

// But why do we handle routing in backend if we can do it from react?
// -> Read RoutingInBackend.md

// Make the server listen at port 4000
app.listen(4000, ()=>{
    console.log('Listening at 4000');
})
