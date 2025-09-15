const express = require('express');
const app = express();

const auth = require('./middleware/auth');

// Parsing Json string to Js Object (without this null will be pushed to FoodMenu 
// array when post operation is performed)
app.use(express.json());

// Making a dummy database
const FoodMenu = [
    {id: 1, food: 'Chowmin', category: 'veg', price: 199},
    {id: 2, food: 'Paneer Masala', category: 'veg', price: 249},
    {id: 3, food: 'Chicken Biryani', category: 'non-veg', price: 299},
    {id: 4, food: 'Masala Dosa', category: 'veg', price: 180},
    {id: 5, food: 'Fish Curry', category: 'non-veg', price: 320},
    {id: 6, food: 'Fried Rice', category: 'veg', price: 160},
    {id: 7, food: 'Butter Naan', category: 'veg', price: 60},
    {id: 8, food: 'Chicken Dehati', category: 'non-veg', price: 350},
    {id: 9, food: 'Tandoori Chicken', category: 'non-veg', price: 280},
    {id: 10, food: 'Gulab Jamun', category: 'dessert', price: 90},
    {id: 11, food: 'Ice Cream ', category: 'dessert', price: 120},
    {id: 12, food: 'Lassi', category: 'beverage', price: 80},
    {id: 13, food: 'Cold Coffee', category: 'beverage', price: 110},
    {id: 14, food: 'Spring Rolls', category: 'veg', price: 150},
    {id: 15, food: 'Egg Curry', category: 'non-veg', price: 230},
];

// User's Cart (Initially Empty)
const cart = [];

// Sending all the food details to display when user requests /food url
app.get('/food',(request, response)=>{
    response.status(200).send(FoodMenu);
})

// Now, We can differentiate between admin and user accessing a link to a page by 
// authentication and authorize to perform operation only when it is authenticated
// admin.

// Authenticating admin before giving access to manipulate database(POST/PATCH/DELETE)
// We are keeping the main file neat and clean by keeping the middleware (authorizat
// -ion) code in another file inside middleware folder
// app.use('/admin', auth); // Or we can directly write auth function in each route
// handler after the url link as it can have multiple route handlers.

// Route Handler for Adding Food by admin
app.post('/admin/addFood', auth, (request, response)=>{
    FoodMenu.push(request.body);
    response.status(201).send("Food Added Successfully.");
})

// Route Handler for Deleting Food by admin using params query in the Url
app.delete('/admin/deleteFood', auth, (request, response)=>{
    const id = parseInt(request.query.id);
    const foodIdx = FoodMenu.findIndex(food=> food.id === id);
    if(foodIdx === -1){
        response.status(404).send("Item Doesn't Exist")
    }else{
        FoodMenu.splice(foodIdx,1);
        response.status(200).send("Food Deleted Successfully.");
    }
})

// Route Handler for Updating Food By Admin Using request.body
app.patch('/admin/updateFood', auth, (request, response)=>{
    const {id,price} = request.body;
    const food = FoodMenu.find(food=>food.id === Number(id));
    if(food){
        if(price){
            food.price = parseInt(price);
            response.send("Food Price Having Id "+id+" Updated Successfully.");
        }
    }
    else{
        response.status(404).send("Item Doesn't Exist");
    }
})


// Route Handler for adding items to cart by user using params
app.post('/user/addToCart/:id', (request, response)=>{
    const id = parseInt(request.params.id);
    const food = FoodMenu.find(food => food.id === id);
    if(food){
        const alreadyInCart = cart.some(food => food.id === id);
        if(alreadyInCart){
            response.status(400).send(food.food+" already added to cart");
        }
        else{
            cart.push(food);
            response.status(201).send(food.food+" added to cart");
        }
    }
    else{
        response.status(404).send("Item is not available in restaurant");
    }

})

// Route Handler for seeing the products added in cart by the user
app.get('/user/viewCart',(request, response)=>{
    if(cart.length)
        response.status(200).send(cart);
    else{
        response.status(404).send("No items to display");
    }
})

// Route Handler to delete items from the cart by the User using query params
app.delete('/user/removeFromCart',(request, response)=>{
    if(cart.length){
        const id = parseInt(request.query.id);
        const foodIdx = cart.findIndex(food=>food.id === id);
        if(foodIdx === -1){
            response.status(404).send("Item Not Found");
        }
        else{
            const removed = cart.splice(foodIdx,1);
            response.status(200).send(removed[0].food+" removed from cart");
        }
    }
    else{
        response.status(404).send("No Items in the Cart");
    }
})


// Now let's try to simulate Error Handling
app.use('/dummy',(req, res)=>{
    try{
        // JSON.parse('{"name": "Ayush", "age": 20}'); // valid Json
        JSON.parse("Invalid Json"); // Throws error in this way
        // throw new Error("Invalid Json Format");
    }
    // Without this catch Block there will be internal Server Error
    catch(err){ // the error is catched here
        res.send("Some Error Occurred, "+err);
        // We can send custom message when an error occurs and save our 
        // website from failure.
    }
})

// Now why do we use express.json() when JSON.parse() also does the same work?
// - express.json() also used JSON.parse() internally, but it makes the parsing
//   easy for us as the data comes in stream of bytes (0110100...) and JSON.parse()
//   need whole JSON string together to do the parsing but express.json() handles
//   all of the operations like parsing, attaching the result to req.body, etc.,
//   internally and makes the parsing easy for us.

// Route Handler for accessing invalid Url
app.use((req, res) => {
    res.status(404).send("Invalid Url");
});

app.listen(2002,()=>{
    console.log("Running at port: 2002");
})