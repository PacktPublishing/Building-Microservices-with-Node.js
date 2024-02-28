const { CloudWatchLogTransport } = require('winston-aws-cloudwatch'); 

new CloudWatchLogTransport({ 

  logGroupName: 'your-log-group-name', 

  logStreamName: 'your-log-stream-name', 

  level: 'info', 

  formatLog: (info) => `${info.timestamp} ${info.message}`, 

}) 