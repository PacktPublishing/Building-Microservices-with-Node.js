// import the validator module 

var validator = require('validator'); 

// check if the example email is a true email 

validator.isEmail('foo@bar.com'); //=> true 