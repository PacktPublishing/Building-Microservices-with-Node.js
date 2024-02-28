// index.js
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

// Middleware for role-based authorization
function authorize(role) {
  return (req, res, next) => {
    if (req.user && req.user.role === role) {
      return next(); // User has the required role
    }
    res.status(403).send('Forbidden'); // User does not have the required role
  };
}

// Example route that requires a specific role
app.get('/api/admin/resource', authenticateToken, authorize('admin'), (req, res) => {
  // Process the request for users with the 'admin' role
  res.json({ message: 'Admin access granted!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
