const winston = require('winston');

const fs = require('fs');
const { createLogger, format, transports } = winston;

const logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: 'error.log',
      level: 'error',
      format: winston.format.json()
    }),
    new transports.Http({
      level: 'warn',
      format: winston.format.json()
    }),
    new transports.Console({
      level: 'info',
      format: winston.format.combine(winston.format.colorize(), winston.format.simple())
    })
  ]
});

module.exports = logger;
