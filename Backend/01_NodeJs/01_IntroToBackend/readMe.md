> What is Node Js?
 :> It is an open source, cross-platform that provides a Js runtime environment which allows us to run Js code outside any web browser (It’s the same engine used in the Chrome browser).
    : V8 engine is just a cpp code which understands our javascript code(specific program designed to understand js code). It takes our js code as input and converts it into Machine code which the computer can understand.
    : It can be implemented in any cpp applications as that applications understands cpp code and the V8 engine is written in cpp.
    : It is capable of executing asynchronous Input/Output task.

 :> What Can You Build with Node.js?
   We can Build Web servers and APIs (e.g., RESTful services), Real-time chat apps (e.g., with WebSockets), Command-line tools (e.g., custom scripts), Microservices, Backend for mobile apps and Streaming services (like Netflix uses Node.js).

> The server is an intermediate to connect the frontend with the Database. We don't directly give the access of database to frontend(In UI) as it will expose our database which should be forbidden for security reasons. Server code is not exposed in the browser while the frontend code is exposed if one inspects it.
 : For example all the business logic of a company is written in the backend like the Uber logic to calculate its fare for a particular distance and uber don't want to disclose that logic.
 : All the authentication, authorization, validation codes are also written in backend.
 : Earlier Js was only used for frontend and the backend code was written in Java, C++, Python etc. After the Introduction of Node Js, Js is also used in writing backend code now. Using Js for the Backend has more benefits as the Node Js has extra functionalities like Global Object, setTimeout(), fetch() console.log and connection to the database.

> Now we will learn how to run the code of a different file using require(synchronous). Let's make first.js and second.js file and use require for second.js in the first.js

> But this is an older method, import/export(asynchronous) are latest which we used in React. But, still people use require in backend development and import and exports are used in frontend.
  
> The reason behind this is by default Node supports CommonJs method and using Import and Export directly gives an error. For using import and export we have to use .mjs extension.

> But in react we didn't use that extension and still it worked for us because of the bundler (parcel) we used. It automatically handled those things for us.
  
> Here also if we don't want to use that extension then make a package.json file and declare the -> "type": "module" into that file

> If we want to use require -> keep the type to "commonjs" (by default)