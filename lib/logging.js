const mode = process.env.LOGGINGLEVEL || require("../config.js" ).LOGGINGLEVEL || "info";
const { createLogger, format, transports } = require('winston');

// We use winston for logger and it is created here:
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
const logAPICall = (path, user_id) => {
    logger.info({"category": "apicall", "path": path, "user_id": user_id});
}


const logAPICallStatus = function(path, status) {
    let log = {"success": status, "category": "apicall", "path": path}
    if (status) {
        logger.info(log);
    }
    else {
        // Maybe log the specific error, but we'll need to pass it to here
        logger.warn(log);
    }
}

module.exports = {
    logger, logAPICall, logAPICallStatus
}