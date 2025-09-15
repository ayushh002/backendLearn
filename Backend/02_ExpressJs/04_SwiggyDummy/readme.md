> We are trying to simulate swiggy backend CRUD operations by using Postman for API calls in `index.js`.

> The admin (employees) of swiggy can add a new food item, delete an existing item, or update an item for a restaurant. These details will be saved in the database so that it can be viewed by other users. ALl these things can be done by post/patch/delete updates.

> On the other hand, the users can see all the food items, add/remove items to/from cart, or look at my cart, etc. The user can request to see the detailed food list, or add/remove items through different API calls. But the update/delete API calls for users will be entirely different from the admin (here the cart will be updated not the database).