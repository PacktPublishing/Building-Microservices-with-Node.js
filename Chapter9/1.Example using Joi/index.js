//Firstly, we need to import the required library

const Joi = require('joi');

// We define the schema using Joi library with its parameters

const schema = Joi.object({
  username: Joi.string().alphanum().min(3).max(30).required(),

  email: Joi.string().email().required(),
});

// Validate request data

const { error, value } = schema.validate(req.body);

if (error) {
  // Handle validation error
}