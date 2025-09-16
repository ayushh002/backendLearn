RATE LIMITER 

  - • A rate limiter is used to prevent the system from processing unlimited requests, which could otherwise overwhelm and crash the server if multiple attackers intentionally flood it with excessive requests (using automation or loops). (For example, GitHub’s user API — which we used in React to fetch user details — enforces a limit of 60 API requests per hour for unauthenticated users.)

> Approach 1: Using Token Bucket Algorithm.

  • One approach is to implement it by maintaining a Token Bucket for all the users. In this method, when a user makes a request, it first goes to the token bucket to acquire a token before proceeding to the server. The server only processes requests that has a valid token. 

  • If a user makes a request when the token bucket is empty, the request proceeds to the server without a token and is consequently rejected. Tokens are added to the bucket at a fixed rate (e.g., 1 token every minute) until the bucket reaches its maximum capacity representing the maximum number of requests allowed within a given timeframe.

  • However, this basic approach has a significant flaw, if an attacker rapidly exhausts the entire bucket's capacity, it will become empty. This would cause the rate limiter to deny service not only to the attacker but also to all subsequent legitimate users until new tokens are slowly replenished over time.
