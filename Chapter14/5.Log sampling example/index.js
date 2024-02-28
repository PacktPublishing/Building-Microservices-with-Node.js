const winston = require('winston'); 

const logger = winston.createLogger({ 

  format: winston.format.simple(), 

  transports: [ 

    new winston.transports.Console(), 

    new winston.transports.File({ filename: 'sampled.log' }), 

  ], 

}); 

// Custom sampling function to log only 10% of the messages 

const samplingFunction = (info) => Math.random() < 0.1 ? info : false; 

logger.add( 

  new winston.transports.File({ 

    filename: 'sampled.log', 

    format: winston.format.combine( 

      winston.format(info => samplingFunction(info))(), 

      winston.format.simple() 

    ), 

  }) 

); 

for (let i = 0; i < 100; i++) { 

  logger.info(`Log message ${i}`); 

} 