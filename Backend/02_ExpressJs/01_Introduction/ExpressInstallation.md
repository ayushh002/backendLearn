> Express Js: Express js is a web application framework for Node.js. It helps us build web servers and RESTful APIs easily and quickly. Think of it as a toolbox for building backend servers in JavaScript.
> Node.js lets us run JavaScript on the server, but writing everything from scratch in Node.js (like routing, middleware, handling JSON) is hard and repetitive. Express simplifies all that by giving us a clean and minimal structure.
> Express also implements http method in its backend for all the communications to the database.
| Feature                   | Purpose                                                        |
| ------------------------  |  ------------------------------------------------------------- |
| 📍 Routing               | Define what happens when a user visits `/home`, `/about`, etc. |
| 📡 REST API              | Build APIs like `GET /users`, `POST /signup`, `DELETE /account` |
| 🧱 Middleware            | Add features like logging, security, error handling            |
| 📁 Serve static files    | Serve HTML, CSS, JS files directly                             |
| 🔐 Handle forms and JSON | Easily parse user input or API requests                        |


> To install Express:  `npm init` -> `npm install express`.

> Now we have to re-run the server everytime when we do some changes in it. So, if we want to make it live server which auto updates upon changing the code we have to install nodeman - `npm i -g nodemon` - installing it globally.
> Then to run it - `nodemon index.js` - now, we just need to refresh the page.
