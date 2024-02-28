// app.js
const express = require('express');
const app = express();

// Example route
app.get('/api/resource', (req, res) => {
  res.status(200).json({ message: 'Resource found!' });
});

module.exports = app;