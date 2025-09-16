> Approach 3: Sliding Window
  
  • The fixed-window approach has a drawback: if a user exhausts all their requests at 12:01 PM within the 12:00–1:00 PM window, they cannot make another request until 1:01 PM, resulting in waiting for 59 minutes. Conversely, if a user nearly consumes all the requests at 12:59 PM, they can immediately make the same number of requests again starting at 1:01 PM, since the new window (1:00–2:00 PM) begins. This loophole allows a user to send almost double the intended maximum limit within a short span of two minutes, which defeats the purpose of rate limiting. This issue can be addressed using the Sliding Window approach.

  • The sliding window approach continuously shifts the request limit window. For example, if the maximum number of requests is limited to 60 requests per hour, then instead of being restricted to fixed windows (e.g., 12:00–1:00 PM, 1:00–2:00 PM), the window slides dynamically (12:01–1:01 PM, 12:02–1:02 PM, etc.). This ensures that at any point of time, the user cannot exceed 60 requests within the past hour. However, implementing this method is more complex compared to the fixed window counter.

  • To implement this, we can use a queue data structure provided by Redis. We can store the timestamp of each request to slide the window and remove requests that falls outside the window. However, using a queue requires handling all the logic manually such as checking the timestamp of the request, popping requests that fall outside the window, maintaining the number of requests etc., which requires multiple await calls.

  • An easier approach is to make a single await call that handles all operations automatically. This functionality is provided by a sorted set in Redis, which stores unique values in a sorted manner and rejects duplicate entries.

  • In Redis, a sorted set orders elements based on a score provided alongside the actual value. This is necessary because values can be of any type (e.g., number, string, object), so a numerical score is required for sorting.
  
  • Scores can be duplicate, as they are only used to sort elements in ascending order, but values must be unique. If the same value is provided again with a different score, the previous record is updated with the new score.

  • We can use range queries based on scores to delete records, which benefits in the implementation of the sliding window rate limiter in a single await call. For this, we will store the request timestamp (in seconds) as the score.
  
  • The value of each record stored in a sorted set must be unique. If we only store the timestamp, it may not be unique, as multiple requests can be made by the same user at the same time. One solution is to store the count of number of requests along with the timestamp, which would always be unique. However, this would require calling the Redis server to fetch the request count.

  • A better solution is to store the timestamp along with a randomly generated value which should always be unique. However, the probability of random number collisions increases if hundreds of requests are made by the same IP in the same timeframe, especially if using Math.random, which relies on the system clock as a seed and is not truly random.

  • To avoid collisions, we can use the crypto library to generate random numbers, as it produces cryptographically secure values. This library is commonly used for generating OTPs for verification. 
  
  • Alternatively, we could create a custom random number generator by using an image of a random event (e.g., of a highway, bridge, or aquarium) as a seed, as images are stored in binary form that can be converted to decimal.

  • We can use the built-in method to get the size of the sorted set (i.e., the number of elements), which eliminates the need to maintain the count manually.

  • We are implementing the rate limiter using the sliding window approach in the same middleware folder, in the file named rateLimiter.js inside 03_Database/09_Redis.