const tokenRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcryptjs = require('bcryptjs');
	
tokenRoutes.use(asyncHandler(async (req, res, next) => {
	next();
}));

tokenRoutes.use('/account', require('../api_calls/accounts'));
tokenRoutes.use('/balance', require('../api_calls/balance'));
tokenRoutes.use('/car', require('../api_calls/car'));
tokenRoutes.use('/gas', require('../api_calls/gas'));
tokenRoutes.use('/transaction', require('../api_calls/transactions'));
tokenRoutes.use('/transaction_types', require('../api_calls/transaction_types'));
tokenRoutes.use('/users', require('../api_calls/users'));

module.exports = tokenRoutes;