module.exports = function(authRoutes) {
	const bcryptjs = require('bcryptjs');
	// Add basic-auth

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
		// grab user's credentials
		// see if they are in the database
		// if so then make token
		// otherwise return issue
		next();
	});
	
	authRoutes.post("/newUser", function(req, res, next) {
		// create user in database, if they do not already exist
		// send a token or error
		next();
	});
}