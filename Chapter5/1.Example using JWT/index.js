const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware for authenticating requests
function authenticateToken(req, res, next) {
  const token = req.header('Authorization');

  if (!token) return res.sendStatus(401);

  jwt.verify(token, 'your-secret-key', (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
}

// Example route that requires authentication
app.get('/api/resource', authenticateToken, (req, res) => {
  // Process the request for authenticated users
  res.json({ message: 'Access granted!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
