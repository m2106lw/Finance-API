// We will grab the log level from the config. Not implmented currently
var mode = require("../config.js" ).loggingLevel || "info";
const { createLogger, format, transports } = require('winston');

const logger = createLogger({
    level: mode,
    format: format.combine(
        format.timestamp(),
        //format.printf(info => `${info.timestamp} ${info.level}: ${info.message}`),
        format.printf(info => `${info.timestamp} ${info.level} ${JSON.stringify(info.message)}`),
    ),
    transports: [
        new transports.Console()
    ],
    exitOnError: false,
    timestamp: true,
    json: true
});

// This function will simply print out the API call that was made for logging purposes
// Since I do this for every API all I figured I would repurpose this function for logging with winston
const logAPICall = function(path) {
    var apiCallInfo = {"category": "apicall", "path": path, "status": "start"};
    logger.info(apiCallInfo);
}

const logAPICallStatus = function(path, status) {
    if (status) {
        logger.info({"category": "apicall", "path": path, "status": "success"});
    }
    else {
        logger.info({"category": "apicall", "path": path, "status": "failure"});
    }
}

module.exports = {
    logger, logAPICall, logAPICallStatus
}