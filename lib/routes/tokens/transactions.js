const transaction = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const { logAPICall } = require('../../logging');
	
/**
@api {get} /api/transactions Return a list transactions for a user
@apiName Get Transactions
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} year The year that data will be loaded for
**/
transaction.get("/transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id; 
	let year = req.query.year;
	let transaction_type_id = req.query.transaction_type_id;

	let storedProcedure = 'GET_transactions';
	params = [user_id, year, transaction_type_id];
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
@api {get} /api/transaction/:transaction_id Return a transaction
@apiName Get Transaction
@apiGroup /Transactions/
@apiVersion 1.0.0
**/
transaction.get("/transaction/:transaction_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id; 
	let transaction_id = req.params.transaction_id;

	let storedProcedure = 'GET_transaction';
	params = [user_id, transaction_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send(result["data"][0][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));
	
/**
@api {get} /api/transactions/years Get all distinct years for the user's transactions
@apiName Get Transaction Years
@apiGroup /Transactions/
@apiVersion 1.0.0
**/
transaction.get("/transactions/years", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;

	let storedProcedure = 'GET_transaction_years';
	params = [user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			// We remove the years from their objects since we it's just extra formatting we don't need
			let years = result["data"][0].map(year => year["year"]);
			res.send(years);
		}
		else {
			res.send(result["error"]);
		}
	})
}));
	
/**
@api {post} /api/transactions Insert a transaction
@apiName Add Transaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Object} transaction Object with transaction information
**/
transaction.post("/transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	//let user_id = req.decoded.user_id; 
	let transaction = req.body.transaction;

	let storedProcedure = 'POST_transaction';
	params = [transaction["amount"], transaction["account_id"], transaction["transaction_type_id"], 
			  transaction["date"], transaction["description"]];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send(result["data"][0][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

/**
@api {put} /api/transaction/:transaction_id Insert a transaction
@apiName Update transaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Object} transaction Object with transaction information
**/
transaction.put("/transaction/:transaction_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	//let user_id = req.decoded.user_id;
	let transaction_id = req.params.transaction_id;
	let transaction = req.body;

	let storedProcedure = 'PUT_transaction';
	params = [transaction["amount"], transaction["account_id"], transaction["transaction_type_id"], 
			  transaction["date"], transaction["description"], transaction_id];
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
@api {delete} /api/transaction/:transaction_id Deletes a transaction
@apiName Delete a Transaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} transaction_id ID of Transaction that will be removed
**/
transaction.delete("/transaction/:transaction_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id; 
	let transaction_id = req.params.transaction_id;

	let storedProcedure = 'DELETE_transaction';
	params = [transaction_id, user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.send();
		}
		else {
			res.send(result["error"]);
		}
	})
}));

module.exports = transaction;