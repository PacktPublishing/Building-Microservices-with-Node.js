const winston = require('winston');  

const logger = winston.createLogger({  

  level: 'info',  

  format: winston.format.simple(),  

  transports: [  

    new winston.transports.Console(),  

    new winston.transports.File({ filename: 'error.log', level: 'error' }),  

  ],  

});  

logger.info('This is an info message');  

logger.error('This is an error message'); 