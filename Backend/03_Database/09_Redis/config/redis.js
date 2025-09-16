const redis = require('redis');

// Import the enviornment variable
require('dotenv').config();

// Create a Redis client instance
const redisClient = redis.createClient({
    username: 'default',
    password: process.env.REDIS_PASSWORD, // stored in env variable for security
    socket: {
        host: 'redis-12826.crce182.ap-south-1-1.ec2.redns.redis-cloud.com',
        port: 12826
    }
})


// We do not connect to the redis server here directly. The connection will be 
// handled in index.js so that Redis and database connects first, followed by 
// the express server.


module.exports = redisClient;