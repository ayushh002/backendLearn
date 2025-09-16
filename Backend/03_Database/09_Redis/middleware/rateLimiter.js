// Import Redis for performing Rate Limiter Operations
const redisClient = require('../config/redis');
const crypto = require('crypto');

const windowSize = 3600; // 60 Minutes
const maxRequests = 60;
const coolDownTime = 5;

// ---------------------------------------------------------------------------------


// // 1. Fixed Rate Limiter without cooldown between requests
// const rateLimiter = async (request, response, next)=>{
//     try{
//         const ip = `IP:${request.ip}`;
//         // this increment function increments the request count if the ip exists
//         // in the redis server and sets its count to 1 if it doesn't
//         const totalRequests = await redisClient.incr(ip);
        
//         // If the request comes for the first time for an ip, set it to expire
//         // after 60 minutes.
//         if(totalRequests==1){
//             await redisClient.expire(ip,windowSize);
//         }

//         // Stop sending the response if the maximum request limit is reached.
//         if(totalRequests>maxRequests)
//             throw new Error("Maximum Request Limit Reached. Try again in an hour.");

//         // Allow the request to pass to other handlers if it's limit isn't reached
//         next();
//     }
//     catch(err){
//         response.status(429).send("Error: "+err.message);
//     }
// }


// --------------------------------------------------------------------------------------

// // 2. Fixed Rate Limiter with cooldown between requests
// const rateLimiter = async (request, response, next)=>{
//     try{
//         const ip = `IP:${request.ip}`;
//         // Current time when the latest request is made
//         const currTime = Math.floor(Date.now() / 1000);

//         // Try to get the data
//         const data = await redisClient.get(ip);

//         // If the data is available
//         if(data){ // The request is not made for the first time
            
//             // Get the total requests and the last time request made
//             let [totalRequests, time] = data.split(':').map(Number);
            
//             // Check request limit
//             if(totalRequests>=maxRequests)
//                 throw new Error("Maximum request limit reached. Try again later.");
            

//             // If user is sending requests too fast (gap < 5s)
//             if(currTime-time<=coolDownTime)
//                 throw new Error("Requesting too frequently. Please wait a few seconds.");

//             // Update request count & timestamp
//             totalRequests++;
//             await redisClient.set(ip,`${totalRequests}:${currTime}`);


//         }
//         else{ // If the request made for the first time
//             await redisClient.set(ip,`1:${Math.floor(Date.now()/1000)}`);
//             await redisClient.expire(ip,windowSize); // auto reset after 60 mins
//         }

//         // Pass the request to other handlers if it's limit isn't reached
//         next();
//     }
//     catch(err){
//         response.status(429).send("Error: " +err.message);
//     }
// }


// -------------------------------------------------------------------------------------------------------

// 3. Sliding Window Rate Limiter
const rateLimiter = async(request, response, next)=>{
    try{
        const key = `sliding_window:IP:${request.ip}`;
        const curr_time = Math.floor(Date.now()/1000); // if curr_time is 1:20 PM
        const window_time = curr_time - windowSize; // It has a value = 12:20 PM

        // Range query - `z` indicates sorted set // It removes the requests 
        // from redis server which are before past hour 
        await redisClient.zRemRangeByScore(key, 0, window_time);

        // count the number of requests
        const number_of_request = await redisClient.zCard(key);

        // Send the error message if limit is exceeded
        if(number_of_request>maxRequests)
            throw new Error("Maximum Request Limit Exceeded");

        // Adding a cooldown period between two consecutive requests
        const lastRequest = await redisClient.zRange(key, -1, -1, { WITHSCORES: true });
        console.log(lastRequest);
        if (lastRequest.length) {
            let [lastTimestamp, randomData] = lastRequest[0].split(':');
            lastTimestamp = Number(lastTimestamp);
            if (curr_time - lastTimestamp < coolDownTime) {
                throw new Error(`Cooldown: wait ${coolDownTime - (curr_time - lastTimestamp)}s`);
            }
        }

        // Generate unique value using crypto for better randomness
        const uniqueValue = crypto.randomBytes(16).toString('hex');
        // console.log(uniqueValue);

        // Add the request if the request is in the limit
        await redisClient.zAdd(key, [{score:curr_time, value: `${curr_time}:${uniqueValue}`}]);

        // Set the TTL for every request made - this shifts the window dynamically
        await redisClient.expire(key,windowSize);
        
        // Call the next route handler if everything goes well
        next();
    }
    catch(err){
        response.status(429).send("Error: " +err.message);
    }
}

// -------------------------------------------------------------------------------------------------------

module.exports = rateLimiter;
// import rateLimiter in index.js and mount it above every other routes.