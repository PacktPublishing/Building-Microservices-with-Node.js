const winston = require('winston'); 

// Define log levels 

const logLevels = { 

  error: 0, 

  warn: 1, 

  info: 2, 

  debug: 3, 

}; 

// Define log level colors (optional) 

const logColors = { 

  error: 'red', 

  warn: 'yellow', 

  info: 'green', 

  debug: 'blue', 

}; 

// Configure Winston logger 

const logger = winston.createLogger({ 

  levels: logLevels, 

  format: winston.format.combine( 

    winston.format.timestamp(), 

    winston.format.printf(({ level, message, timestamp }) => { 

      return `${timestamp} [${level.toUpperCase()}]: ${message}`; 

    }) 

  ), 

  transports: [ 

    new winston.transports.Console({ 

      level: 'debug', // Log level for the console transport 

      format: winston.format.combine( 

        winston.format.colorize({ all: true }), 

        winston.format.simple() 

      ), 

    }), 

    new winston.transports.File({ filename: 'error.log', level: 'error' }), 

    new winston.transports.File({ filename: 'combined.log' }), 

  ], 

}); 

// Apply colors to log levels (optional) 

winston.addColors(logColors);  

module.exports = logger; 