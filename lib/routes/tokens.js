const tokenRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');
let secretKey = process.env.SECRET || require('../../config').SECRET;

// So this will protect the routes.
// The user will have to pass their token to do pretty much anything
tokenRoutes.use(asyncHandler(async (req, res, next) => {
	let token = req["headers"]["x-auth-token"];
	// If the token is good then we will continue on to whatever call was made
	// Otherwise just send back the error
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			// TODO: Send the specific jwt errors
			res.send({"success": false, "error": err});
		}
		else {
			req.decoded = decoded;
			next();
		}
	});
}));

// Protected routes
tokenRoutes.use('/', require('./tokens/accounts'));
tokenRoutes.use('/', require('./tokens/balance'));
tokenRoutes.use('/', require('./tokens/car'));
tokenRoutes.use('/', require('./tokens/gas'));
tokenRoutes.use('/', require('./tokens/transactions'));
tokenRoutes.use('/', require('./tokens/transaction_types'));
tokenRoutes.use('/', require('./tokens/users'));

module.exports = tokenRoutes;