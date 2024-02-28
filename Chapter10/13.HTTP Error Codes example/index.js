const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Example route for handling resource not found
app.get('/api/resource', (req, res, next) => {
  const error = new Error('Resource not found');
  error.status = 404;
  next(error);
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).send(err.message || 'Something went wrong!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});