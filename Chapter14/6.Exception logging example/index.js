const winston = require('winston'); 

const logger = winston.createLogger({ 

  format: winston.format.simple(), 

  transports: [ 

    new winston.transports.Console(), 

    new winston.transports.File({ filename: 'error.log', level: 'error' }), 

  ], 

  exceptionHandlers: [ 

    new winston.transports.File({ filename: 'exceptions.log' }), 

  ], 

}); 

// Example of logging an exception 

try { 

  // Some code that might throw an exception 

  throw new Error('This is an exception'); 

} catch (error) { 

  logger.error('Caught an exception:', error); 

} 