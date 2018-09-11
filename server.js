var express = require('express');
var app = express();
// Might try passing this around
var mysql = require('mysql');
// Remove this later probably
var http = require('http');

const hostname = '127.0.0.1';
const port = 8080;

const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'text/plain');
  res.end('Hello World\n');
});

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}/`);
});

var dbconfig = {
	username: "",
	password:  "",
	host: "",
	database: ""	
};

// Any auth will have to go here

// Load up the api modules
// Functions - Might be needed earlier
var functions = require('./api_modules/functions/functions');
// Accounts
var accounts = require('./api_modules/accounts/accounts');
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
var users = require('./api_modules/users/users');

