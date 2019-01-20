const transaction = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');
	
/**
@api {get} /api/transaction/transactions Return a list transactions for a user
@apiName getTransactions
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
@apiParam {Number} year The year that data will be loaded for
**/
// TODO: Change allow year to be null so we can filter or get everything
transaction.get("/transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id; 
	var year = req.query.year;

	var storedProcedure = 'GET_transactions_by_year';
	params = [user_id, year];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send(result["data"][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));
	
/**
@api {get} /api/transaction/years Get all distinct years for the user's transactions
@apiName getTransactionsYears
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
**/
transaction.get("/years", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id;

	var storedProcedure = 'GET_transaction_years';
	params = [user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send(result["data"][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

// TODO: Add specific GET /:transaction_id
	
/**
@api {post} /api/transaction/transactions Insert a transaction
@apiName Add new transaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Object} transaction Object with transaction information
**/
// TODO: Modify so that this only inserts new transactions - POST transactions
transaction.post("/transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var transaction = req.body.transaction; 

	var storedProcedure = 'POST_transaction';
	params = [transaction["amount"], transaction["account_id"], transaction["transaction_type_id"], 
			  transaction["date"], transaction["description"], (transaction["transaction_id"] || -1)];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send(result["data"]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

/**
@api {delete} /api/transaction/:transaction_id Deletes a transaction
@apiName Delete Transaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} transaction_id ID of Transaction that will be removed
**/
transaction.delete("/:transaction_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id; 
	var transaction_id = req.query.transaction_id

	var storedProcedure = 'DELETE_transaction';
	params = [transaction_id, user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			// TODO: Make this show something more useful maybe?
			res.send(true);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

// TODO: Add PUT /:transaction_id

module.exports = transaction;