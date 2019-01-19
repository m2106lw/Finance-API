const tokenRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
	
tokenRoutes.use(asyncHandler(async (req, res, next) => {
	next();
}));

tokenRoutes.use('/account', require('./tokens/accounts'));
tokenRoutes.use('/balance', require('./tokens/balance'));
tokenRoutes.use('/car', require('./tokens/car'));
tokenRoutes.use('/gas', require('./tokens/gas'));
tokenRoutes.use('/transaction', require('./tokens/transactions'));
tokenRoutes.use('/transaction_types', require('./tokens/transaction_types'));
tokenRoutes.use('/users', require('./tokens/users'));

module.exports = tokenRoutes;