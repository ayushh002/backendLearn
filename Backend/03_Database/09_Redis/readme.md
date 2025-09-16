> We will implement the logout feature using Redis to store invalidated tokens. This ensures that users cannot access data using previously invalidated tokens.

> To set this up, we first create a Redis Cloud account (https://redis.io) and use the free trial on AWS Cloud to host our Redis database. This makes our code production-ready since the service will already be deployed on a cloud platform, similar to how we use MongoDB for persistence.

> We are extending the logout functionality existing in 03_Database/08_SchemaMethods to demonstrate the redis usage.
  - Setup:
  • Install Redis for Node.js: `npm i redis`
  • Create a config folder with a `redis.js` file and connect it to the Redis server using `createClient`.
  • Ensure Redis server connection is established before starting the Express server. This orchestration is handled in index.js.


> Now, we will implement the logout feature with the help of Redis. Before performing logout, we first need to verify that the user is valid using the userAuth middleware. This ensures that no unauthorized person can log out on behalf of another user through backdoor channels.

> Additionally, we must extend the userAuth middleware to check Redis for invalidated tokens. If the token exists in Redis, it will be considered invalid, and access will be denied.

> Typically, Redis keys are set in a human-readable format, such as: `token:erongoirknpeowfnergr`. From this, it’s clear that the key corresponds to a token. The value can be anything—like invalid, blocked, or even the username associated with that token.
  
> The system also adds the iat (Issued At) field to the token payload. This is important because if we used same or no expiry time, every token generated for a user would be identical. The iat field ensures that each token is unique, even for the same user.

> In the next lecture, we will study the Rate Limiter.