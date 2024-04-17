const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for handling errors
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send('Something went wrong!');
});

// Example route
app.get('/', (req, res) => {
  // Simulate an error (for testing purposes)
  throw new Error('Oops, an error occurred!');
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});