const {limiter} = require("../middleware");
const express = require('express');
const {tokenBucketLimiter} = require("../middleware");
const router = express.Router();

/* GET home page. */
router.post('/login', limiter.prevent, limiter.getMiddleware({
    key: function (req, res, next) {
        // prevent too many attempts for the same username
        next(req.body.username);
    }
}), function (req, res, next) {
    // Super secure login logic
    res.send("Welcome back!");
});

// If you want more control
router.post('/login/v2', tokenBucketLimiter, function (req, res, next) {
    // Super secure login logic
    res.send("Welcome back!");
});



module.exports = router;
