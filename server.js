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
	else if (err.code === ' ELIFECYCLE') {
		console.log(getTimestamp() + ": Server Stopped");
	}
	else {
		console.error(getTimestamp() + ": Got error of " + err.code);
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

// TODO: Fix the routing to be better
// Routes Middleware
// Secure the api calls
var authRoutes = express.Router();
app.use('/login', authRoutes);
var tokenRoutes = express.Router(); 
app.use('/api', tokenRoutes);


// Any auth will have to go here
var loginAPI = require('./lib/routes/login');
loginAPI(authRoutes);
var tokenAPI = require('./lib/routes/tokens');
tokenAPI(tokenRoutes);

// Load up the api modules
// Accounts
const accountsAPI = require('./lib/routes/accounts');
accountsAPI(tokenRoutes);
// Balance
const balanceAPI = require('./lib/routes/balance');
balanceAPI(tokenRoutes);
// Balance
var car = require('./lib/routes/car');
// Gas
var gas = require('./lib/routes/gas');
// Transactions
var transactionsAPI = require('./lib/routes/transactions');
transactionsAPI(tokenRoutes);
// TransactionTypes
var transactionTypesAPI = require('./lib/routes/transaction_types');
transactionTypesAPI(tokenRoutes);
// Users
var usersAPI = require('./lib/routes/users');
usersAPI(tokenRoutes);