const { createLogger, format, transports } = require('winston');
const { combine, timestamp, label, printf } = format;

const myFormat = printf(info => {
    return `${info.timestamp} ${info.level}: ${info.message}`;
  });

  // TODO: Look into better exception handling
const logger = createLogger({
   format: combine(
        timestamp(),
        myFormat,
        //colorzie()
    ),
    transports: [new transports.Console({handleExceptions: true})],
    exitOnError: false
});

// This function will simply print out the API call that was made for logging purposes
const logAPICall = function(path) {
    logger.info(`Call to ${path} made`)
}

module.exports = {
    logger, logAPICall
}