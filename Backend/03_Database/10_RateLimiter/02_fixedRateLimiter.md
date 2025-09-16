> Approach 2: Fixed Window 
  
  • The Denial-of-Service (DoS) vulnerability in the simple token bucket arises from its centralized nature, which tracks all requests collectively. A more robust solution must track the request count per user to prevent one user from exhausting the quota for everyone.

  • A Redis server is ideal for storing this data. We can use Redis to store the count of total number of requests made by each user seperately along with a Time-to-Live (TTL). This TTL defines the fixed window (e.g., one hour), after which the record automatically expires and the count resets. For storing this data we would need a unique identifier which can be set along with the above value to uniquely identify it. The unique identifier can be id assigned to each user.
  
  • However, a challenge arises for endpoints like login, where a user ID is not available in cookies or session data. To address this, we can use the user's IP address (accessible via request.ip) as the identifier. This allows us to track number of requests even for unauthenticated users.
  
  • We will now implement this rate limiter by creating a middleware function inside 09_Redis. This middleware will check the rules defined above and only pass control to the next route handler if the user's request count is within the defined limit.

  • The middleware logic is as follows: 
   - for each request, we check if a record for the IP address exists in Redis.
   - If it does not exist, this is the first request of the user. So, We create a new record with a count of 1 and set the TTL.
   - If it exists, we check the current count. If the count is below the limit, we increment it and allow the request. If the count has reached the limit, we block the request.
  
  • To enforce a cooldown period between consecutive requests (e.g., to prevent rapid submissions like on LeetCode), we can store the timestamp of the last request. This can be combined with the count in a single Redis value (e.g., as a string like "count:lastTimestamp") that can be parsed using the split method and converted into numbers for evaluation. The last request can be stored in seconds (new Date(Date.now()/1000)).

  •  This algorithm is called the Fixed Window counter. The "window" is a fixed time interval (e.g., 12:00 PM - 1:00 PM), and the maximum number of requests allowed within that window is fixed. The counter resets abruptly at the start of the next window (e.g., at 1:01 PM). 
