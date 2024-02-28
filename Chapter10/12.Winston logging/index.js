const winston = require('winston');

winston.error('Error message', { error: err, request: req });