const authRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
// Add basic-auth
var auth = require('basic-auth');
	
// Might need to be a get
authRoutes.post("/login", asyncHandler(async (req, res, next) => {
	// TEMPORARY
	var credentials = auth(req);
	if (!credentials) {
		res.status(401);
		res.setHeader('WWW-Authenticate', 'Basic realm="example"');
		res.end('Access denied');
	}
	else {
		// Do stuff
		// Figure out how to get something returned from the database in another api module
		next();
	}
	// grab user's credentials
	// see if they are in the database
	// if so then make token
	// otherwise return issue
}));

authRoutes.post("/newUser", asyncHandler(async (req, res, next) => {
	// create user in database, if they do not already exist
	// send a token or error
	next();
}));

module.exports = authRoutes;