// Express Modules
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
// Config File
//const config = require('../config');
// For logging
const { logger } = require('./logging');

// Body Parser Middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: false }));
app.use(bodyParser.json({limit: '50mb'}));

// CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token, X-Rundeck-Auth-Token, Set-Cookie");
    next();
});

app.use(asyncHandler(async (req, res, next) => {
	// Catch preflight
	if (req.method == 'OPTIONS') res.send();
	else next();
}));

// Routes Middleware
app.use('/login', require('./routes/login'));
app.use('/api', require('./routes/tokens'));

// If we get a call we can't find then send 404
app.get('*', function(req, res){
	res.sendStatus(404)
});

// Error handling middleware
const errorHandler = function (err, req, res, next) {
	logger.warn({"category": "app", "status": "error", "type": err.name, "description": err.message, "stacktrace": err.stack});
	res.status(500);
	res.send({"error": err.name, "message": err.message, "stacktrace": err.stack});
}
app.use(errorHandler);

// For some reason simply exporting app will not work, but this does
module.exports = function() {
	return app;
}
