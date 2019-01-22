const tokenRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
var jwt = require('jsonwebtoken');
let secretKey = process.env.SECRET || require('../../config').SECRET;
	
tokenRoutes.use(asyncHandler(async (req, res, next) => {
	//jwt.verify()
	let token = req["headers"]["x-auth-token"];
	jwt.verify(token, secretKey, (err, decoded) => {
		if (err) {
			// TODO: Sent back specific errors
			res.send("Error");
		}
		else {
			req.decoded = decoded;
			next();
		}
	});
}));

tokenRoutes.use('/account', require('./tokens/accounts'));
tokenRoutes.use('/balance', require('./tokens/balance'));
tokenRoutes.use('/car', require('./tokens/car'));
tokenRoutes.use('/gas', require('./tokens/gas'));
tokenRoutes.use('/transaction', require('./tokens/transactions'));
tokenRoutes.use('/transaction_type', require('./tokens/transaction_types'));
tokenRoutes.use('/user', require('./tokens/users'));

module.exports = tokenRoutes;