METHODS IN MONGOOSE SCHEMAS

> Defining methods in a Mongoose schema’s collection class isn’t mandatory, but it’s a good practice when certain operations are repetitive or frequently needed across multiple route handlers.
 • For example, in our case:
  - `getJWT` method contains the logic to generate a JWT (access token).
  - `verifyPassword` method contains the logic to verify a user’s password.
  • Note: Placing this logic inside schema methods keeps the code cleaner, reusable, and more maintainable.

> Calling getJWT or verifyPassword does not trigger a new database query. These methods work on the Mongoose document already fetched into memory (for example, via findOne). Once a document is retrieved, it has both:
  • The stored field values
  • The defined instance methods


ENVIORNMENT VARIABLES

> The example code shown is not production-ready, because it contains sensitive values directly in the source code:
  • The database connection string (which can be misused to connect to the DB).
  • The private key used to sign and verify JWTs.
  • Such sensitive values should be stored in environment variables.

> To do this:
   • Create a .env file in the project root.
   • Add all the sensitive data in key value pair.
   • Install dotenv (`npm i dotenv`), a zero-dependency module that loads .env values into `process.env` - a global object.
   • In the code, load dotenv before accessing environment variables - `require('dotenv').config()`
   • It can now be accessed in any file using `process.env.key_Name`


> We are keeping the private key used for digital signature, the database connection string and the port number in the `.env` file.
  • Never push the .env file to GitHub — it contains private credentials.
  • Environment variables also make switching between testing and production environments much easier — we can simply change the .env values instead of editing multiple places in our code.
  


EXPRESS ROUTER

> If all route handlers are placed in index.js, the file can quickly become very large and hard to manage — especially in production-level applications where 50+ routes are common (e.g., register, login, logout, getProfile, editProfile, comment, deletePost, etc.).
  • To make the code cleaner, modular, and maintainable, Express provides the Router feature. This allows grouping related routes into separate files.
  • To do so:
   - Create a `routes` folder
   - Place authentication-related routes in `auth.js` (e.g., login, register)
   - Place other operations in `operations.js`
  • Then import these routers into `index.js` and mount them on specific paths. This keeps the main server file concise and organized, making teamwork easier.