const express = require('express');
const rateLimit = require('express-rate-limit');

const app = express();
const PORT = process.env.PORT || 3000;

// Create the rate limit rule
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
});

// Apply rate limiting to the API Gateway routes
app.use('/api', apiLimiter);

// Your other routes and middleware go here

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
