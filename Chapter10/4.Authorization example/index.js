const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for role-based authorization
function isAdmin(req, res, next) {
  if (req.user && req.user.role === 'admin') {
    return next(); // User is authorized
  }
  res.status(403).send('Forbidden'); // User is not authorized
}

// Example route that requires admin role
app.get('/admin/resource', isAdmin, (req, res) => {
  // Handle the request for admin-only resource
  res.json({ message: 'Admin access granted!' });
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});