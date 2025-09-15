> Mongoose is an Object Data Modeling (ODM) library for MongoDB and Node Js. It provides a schema-based solution to model application data, along with built-in features like type casting, validation, query building, and middleware hooks.

>  It extends the native MongoDB driver by adding structure, data validation, and helper methods, making it easier to work with MongoDB documents using JavaScript objects.


> Why Prefer Mongoose with MongoDB?

  : Schema Validation: Mongoose enforces a schema structure on otherwise schema-less MongoDB documents.
  : Simpler Syntax: Offers a cleaner, more intuitive syntax for interacting with MongoDB.
  : Middleware: Supports pre/post hooks for operations like saving, deleting, or updating documents.
  : Model Methods: Allows defining custom methods directly on our data models.
  : Population: Simplifies the process of joining related data across collections.
  : Type Casting: Automatically converts data to the specified types based on the schema.
  : Developer Experience: Reduces boilerplate code for common operations.
   - "Boilerplate code" refers to the repetitive, standard code you often write again and again just to perform basic tasks like inserting, validating, querying, or updating documents.
   - Mongoose reduces this effort by providing built-in methods and structure—just like how we use Express instead of writing raw Node.js HTTP server code.

> Mongoose:
  a. handles validation automatically, no need for manual validation.
  b. no need to manage collections or database inter-connections directly.
  c. leads to cleaner, shorter, and more maintainable code.

> The flows works in this way: 
  : Express communicates with Mongoose using clean and concise code. Mongoose, in turn, internally handles the MongoDB queries and connection logic.

> Mongoose allows Express (or any Node.js application) to work with MongoDB data as regular JavaScript objects. This makes it easy to perform operations like create, read, update, and delete by simply creating and manipulating objects of model (collection) — Mongoose handles the interaction with the database behind the scenes.

> Install Mongoose - `npm i mongoose` - also install express, nodemon and mongo db together with mongoose.
> Mongoose Documentation: `https://mongoosejs.com/docs/`