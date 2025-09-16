> We have implemented a logout functionality in the auth route inside 08_SchemaMethods/routes/auth.js. by deleting the token from the cookies by sending null as a token which is expired using Date.now().

> But this logout route handler has a flaw: If a user has saved the token before logout, i.e., before deleting it from the cookies, which has not been expired until now, then he/she can still access the data even after logout and without reauthenticating, simply by using that old token, since a token cannot be invalidated in any way until its expiry time is reached.

> So, we need to store it somewhere before logging out, so that we can block users from accessing the data by verifying it against an invalid token list. We only need to store the token until its expiry time, not permanently.

> If we store it in the database, frequent database calls will be required for every request, which is not efficient as each database operations takes time. Instead, we can store them in-memory (RAM) using an array, list, or any other data structure, which avoids frequent database calls.

> But this also introduces several overheads: first, traversing through all stored tokens to check their expiry and removing them if expired; and second, maintaining synchronization between all replicas of the server, since, for an invalid token, the request must be declined by every replica, and it should not happen that any replica responds instead of declining the request.

> To overcome all these problems, Redis is used. It is a super-fast database that responds in microseconds by storing data in RAM (in-memory), whereas other databases typically take milliseconds since they store data in secondary memory (SSD).

> Redis does not store data permanently, which fits perfectly for handling tokens. It is an independent database that can scale as needed and manages operations such as deleting tokens, checking token validity, and distributing data to all replicas (something normal databases cannot do, since RAM data is not automatically shared across replicas).

> Note: 
 - Redis also uses secondary memory to back up in-memory data, preventing data loss in case of failure or crashes.
 - The Redis server and the backend database server are kept separate to avoid competing for RAM and to prevent race conditions.
 -  Redis can also be used to cache data fetched from the database, avoiding repeated database fetches on refresh since databases generally take longer to respond.
 - Redis is expensive because it stores data in RAM.
 - It stores data in key value pair where key should be unique for faster retrieval, updation and deletion (i.e., in O(1) time).