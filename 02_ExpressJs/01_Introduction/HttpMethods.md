> Frontend and Backend Communication using HTTP Methods:

 -> Most of the time, the frontend (client-side) sends requests to the backend server to either retrieve or manipulate data using API (Application Programming Interface) calls. These requests use standard HTTP methods to perform specific CRUD operations (Create, Read, Update, Delete).
  1. GET Method:
    - Used to retrieve data from the backend server, such as displaying user information or fetching a list of products. For example, loading a homepage with content from the database.
  2. POST Method:
    - Used to send new data to the backend server to be saved in the database. A common example is user registration (sign up), where user details are sent to the server and stored.
  3. PATCH Method:
    - Used to update part of an existing resource in the database. For example, if a user wants to change their username, a PATCH request is made with just the updated data.
    - When multiple fields like username, dob, etc. are to be updated then PUT is used in place of PATCH.
  4. DELETE Method:
    - Used to remove a resource from the database. For instance, deleting a user account or removing a product from inventory. 

Note: These four HTTP methods — GET, POST, PATCH, and DELETE — are commonly used in building a REST API (Representational State Transfer Application Programming Interface).

A REST API is a set of rules and conventions for building and interacting with web services. It uses standard HTTP methods to perform CRUD operations on resources. These methods are part of REST.