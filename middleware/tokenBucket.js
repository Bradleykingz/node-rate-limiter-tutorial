const ms = require('ms');

const RateLimiter = require('limiter').RateLimiter;
// Allow 150 requests per hour (the Twitter search limit). Also understands
// 'second', 'minute', 'day', or a number of milliseconds
const limiter = new RateLimiter(2, ms('1min'));

module.exports = function (req,res, next) {
    limiter.removeTokens(1, function(err, remainingRequests) {
        if (remainingRequests < 1) {
            res.status(429).send({message: "Too many requests"});
        } else {
            next();
        }
    });
}
