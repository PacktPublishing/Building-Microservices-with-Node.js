const winston = require('winston'); 

const logger = winston.createLogger({ 

  format: winston.format.simple(), 

  transports: [ 

    new winston.transports.Console(), 

    new winston.transports.File({ filename: 'error.log', level: 'error' }), 

    new winston.transports.File({ filename: 'combined.log' }), 

  ], 

  // Filtering to include only error logs in a specific file 

  exceptionHandlers: [ 

    new winston.transports.File({ filename: 'exceptions.log' }), 

  ], 

}); 

logger.info('This will be logged'); 

logger.error('This will be logged as an error'); 

// Manually throw an exception to trigger the exception handler 

try { 

  throw new Error('This is a manually triggered exception'); 

} catch (error) { 

  logger.error('Caught an exception:', error); 

} 