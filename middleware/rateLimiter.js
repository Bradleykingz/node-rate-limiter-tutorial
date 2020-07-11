const ms = require('ms');
const redis = require('redis');
const ExpressBrute = require('express-brute'),
    RedisStore = require('express-brute-redis');

const handleStoreError = function (error) {
    console.error(error); // log this error so we can figure out what went wrong
    // cause node to exit, hopefully restarting the process fixes the problem
    throw {
        message: error.message,
        parent: error.parent
    };
};

const redisClient = redis.createClient();

redisClient.on('connect', function () {
    console.log("Connected to redis")
});

redisClient.on('error', function () {
    console.log("Redis crashed.")

})

const store = new RedisStore({
    client: redisClient,
});

module.exports = new ExpressBrute(store, {
    freeRetries: 1,
    minWait: ms('1s'),
    maxWait: ms('10s'),
    handleStoreError
});

