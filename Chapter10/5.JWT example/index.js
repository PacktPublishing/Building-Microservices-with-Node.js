const jwt = require('jsonwebtoken'); 

// Generate a token 

const token = jwt.sign({ userId: '123' }, 'secretKey', { expiresIn: '1h' }); 

// Verify a token 

jwt.verify(token, 'secretKey', (err, decoded) => { 

  if (err) { 

    // Token is invalid 

  } else { 

    // Token is valid, use decoded data 

  } 

}); 