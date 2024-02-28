const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Generate a unique request ID (you can replace this with your own logic)
function generateRequestId() {
  return Math.random().toString(36).substr(2, 9);
}

// Middleware to add context to requests
app.use((req, res, next) => {
  req.requestId = generateRequestId();
  console.log(`[${new Date()}] Start processing request ${req.requestId}`);
  next();
});

// Middleware for logging requests
app.use((req, res, next) => {
  console.log(`[${new Date()}] ${req.method} ${req.url} - Request ID: ${req.requestId}`);
  next();
});

// Other middleware and routes go here

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(`[${new Date()}] Error processing request ${req.requestId}: ${err.message}`, err);
  res.status(500).send('Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
