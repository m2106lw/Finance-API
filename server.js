var express = require('express');
var bodyParser = require("body-parser");
var app = express();
// Might try passing this around
var mysql = require('mysql');
// Config file for info
const config = require('./config');

// Functions - Needed throughout
var functions = require('./lib/functions');
// Needed functions
const {logger, logAPICall} = require('./lib/logging');

//Setting up server
var server = app.listen(config.serverConfig.port || 8080, function () {
    var port = server.address().port;
	//console.log(getTimestamp() + ": App now running on port", port);
	logger.info(`App now running on port ${port}`)
});

server.once('error', function(err) {
	if (err.code === 'EADDRINUSE') {
		logger.error(`Port ${config.serverConfig.port} is already in use.`);
	}
	else if (err.code === 'EACCES') {
		logger.error(`Permission denied for port ${config.port}`);
	}
	else if (err.code === ' ELIFECYCLE') {
		logger.error(`Server Stopped`);
	}
	else {
		logger.error(`Recieved error of ${err.code}`);
	}
});

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ### We need to set this in the environment variables ###
//app.set('superSecret', config.secret_key); // secret variable

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "DELETE,GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token");
    next();
});

// Routes Middleware
// Secure the api calls
app.use('/login', require('./lib/routes/login'));
app.use('/api', require('./lib/routes/tokens'));