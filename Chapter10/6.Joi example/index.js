const express = require('express');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware for parsing JSON requests
app.use(express.json());

// Joi schema for validation
const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),
  password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')),
});

// Example route for registration
app.post('/api/register', (req, res) => {
  const { error, value } = schema.validate(req.body);

  if (error) {
    res.status(400).send(error.details[0].message);
  } else {
    // Process the valid data (e.g., save to database)
    res.json({ message: 'Registration successful!' });
  }
});

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});