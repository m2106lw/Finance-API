module.exports = function(tokenRoutes) {
	const bcryptjs = require('bcryptjs');

	tokenRoutes.use(function(req, res, next) {
		// Catch preflight
		if (req.method == 'OPTIONS') {
			res.send()
		}
		else {
			next();
		}
	});
	
	tokenRoutes.use(function(req, res, next) {
		next();
	});
}