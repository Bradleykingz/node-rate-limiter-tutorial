# A NodeJS Rate Limiter Implementation

This repository covers a basic implementation of a login route
protected from brute forcing.

It also contains code for a 'custom' implementation of a rate 
limiter if you'd prefer to use your own logic in the limiter.

For example, in order to use a token bucket directly instead
of the highly-abstracted express-brute code:

```javascript
const BURST_RATE = 1024 * 1024 * 150; // 150KB/sec burst rate
const FILL_RATE = 1024 * 1024 * 50; // 50KB/sec sustained rate

const TokenBucket = require('limiter').TokenBucket;
// We could also pass a parent token bucket in as the last parameter to
// create a hierarchical token bucket
const bucket = new TokenBucket(BURST_RATE, FILL_RATE, 'second', null);

bucket.removeTokens(myData.byteLength, function() {
  sendMyData(myData);
});
```

This is borrowed directly from [node-rate-limiter](https://github.com/jhurliman/node-rate-limiter)

To get more in-depth information on terms like 'burst rate', see 
this [Wikipedia](https://en.wikipedia.org/wiki/Token_bucket#Burst_size) link
or a more practical application of the 
same [here](https://www.cs.ucy.ac.cy/courses/EPL606/slides/Topic3a.pdf).

**Note**: Will update with link once blog post is published.
