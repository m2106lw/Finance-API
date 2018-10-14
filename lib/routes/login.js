module.exports = function(authRoutes) {
	const bcryptjs = require('bcryptjs');
	// Add basic-auth
	var auth = require('basic-auth');

	authRoutes.use(function(req, res, next) {
		// Catch preflight
		if (req.method == 'OPTIONS') {
			res.send()
		}
		else {
			next();
		}
	});
	
	// Might need to be a get
	authRoutes.post("/login", function(req, res, next) {
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
	});
	
	authRoutes.post("/newUser", function(req, res, next) {
		// create user in database, if they do not already exist
		// send a token or error
		next();
	});
}