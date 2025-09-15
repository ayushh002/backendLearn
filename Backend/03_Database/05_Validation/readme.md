> In this lecture, we’ll learn how to perform data `Validation` and `Sanitization` in a MongoDB database using Mongoose, by working with dummy Instagram user data.

> Mongoose has many built in functionalities for performing CRUD operations in our database: find(), findById(), findByIdAndDelete(), findByIdAndUpdate(), exists(), findOneAndDelete(), findOneAndUpdate(), etc.
  : Difference between findOneAndDelete() and deleteOne():
   - findOneAndDelete() returns the deleted document.
   - deleteOne() returns only an acknowledgment with metadata (e.g., deletedCount), but not the actual document.


> Schema-Level Validation
  : In our project, we applied Schema-Level Validation using Mongoose’s schema definition. This ensures:
   - Only valid values (e.g., required fields, enum values, min/max constraints) are accepted.
   - Validation happens when a database operation (e.g., save(), update()) is triggered.


> API-Level Validation
  : API-Level Validation refers to validating the incoming data in the route handler before it reaches the database.
  : This can Include Sanitizing input (e.g., trimming, escaping), Ensuring the structure or format (e.g., valid email format), etc.


> Why API-Level Validation if Schema Validation Exists?

  - API-Level Validation is still necessary even when schema validation is present:

   1. Performance Efficiency: API-level validation prevents invalid data from reaching the database layer, avoiding unnecessary database calls reducing cost.

   2. Faster Feedback for Clients: Invalid requests can be rejected instantly, without waiting for Mongoose to process and return errors.

   3. Better Error Messages for Users: We can catch and handle errors more gracefully at the API level with custom messages, rather than relying on Mongoose’s default error responses.

   4. Security & Sanitization: API validation helps in sanitizing input (removing harmful or unnecessary data) and prevents injection attacks before hitting your database.
   
   5. Complex Validation Rules: Some rules (e.g., matching passwords, conditional fields) are easier to implement at the API level.

> Instagram is the name of folder inside Postman