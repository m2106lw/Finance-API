var express = require('express');
var bodyParser = require("body-parser");
var app = express();
// Might try passing this around
var mysql = require('mysql');
// Config file for info
const config = require('./config');

// Functions - Needed throughout
var functions = require('./api_modules/functions/functions');
// Needed functions
var getTimestamp = functions.getTimestamp;
var logAPICall = functions.logAPICall;

//Setting up server
var server = app.listen(config.serverConfig.port || 8080, function () {
    var port = server.address().port;
    console.log(getTimestamp() + ": App now running on port", port);
});
server.once('error', function(err) {
	if (err.code === 'EADDRINUSE') {
		console.log(getTimestamp() + ": Port " + config.serverConfig.port + " is already in use.");
	}
	else if (err.code === 'EACCES') {
		console.log(getTimestamp() + ": Permission denied for port " + config.port);
	}
	else {
		console.error(getTimestamp() + ": Got error of " + err.code);
	}
});

////Initiallising connection string
var dbConfig = mysql.createPool({
	user: config.financeDatabase.databaseUser,
	password: config.financeDatabase.databasePass,
	host: config.financeDatabase.databaseServer,
	database: config.financeDatabase.databaseName,
	port: 3306
});
// Might be able to do:
// var dbConfig = {
	// user: config.financeDatabase.databaseUser,
	// password: config.financeDatabase.databasePass,
	// host: config.financeDatabase.databaseServer,
	// database: config.financeDatabase.databaseName,
	// port: 3306
// };

// Body Parser Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// ### We need to set this in the environment variables ###
//app.set('superSecret', config.secret_key); // secret variable

//CORS Middleware
app.use(function (req, res, next) {
    //Enabling CORS
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
    res.header("Access-Control-Allow-Headers", "X-Requested-With, Authorization, Content-Type, Accept, X-Auth-Token, X-Rundeck-Auth-Token");
    next();
});

// Routes Middleware
// Secure the api calls
var authRoutes = express.Router();
app.use('/login', authRoutes);
var tokenRoutes = express.Router(); 
app.use('/api', tokenRoutes);

// We will hide this call behind a tokenRoutes
// Doesn't exist right now
tokenRoutes.use(function(req, res, next) {
	// Catch preflight
	if (req.method == 'OPTIONS') {
		res.send()
	}
	else {
		next();
	}
});

// Any auth will have to go here

// Load up the api modules
// Accounts
var accountsAPI = require('./api_modules/accounts/accounts');
accountsAPI(tokenRoutes, functions, dbConfig);
// Balance
var balance = require('./api_modules/balance/balance');
// Balance
var car = require('./api_modules/car/car');
// Categories
var categories = require('./api_modules/categories/categories');
// Gas
var gas = require('./api_modules/gas/gas');
// Payments
var payments = require('./api_modules/payments/payments');
// Users
var usersAPI = require('./api_modules/users/users');
usersAPI(tokenRoutes, functions, dbConfig);