const transaction = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../database');
const {logAPICall} = require('../logging');
	
/**
@api {get} /api/transaction/getTransactions Return a list transactions for a user
@apiName getTransactions
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
@apiParam {Number} year The year that data will be loaded for
**/
transaction.get("/getTransactionsByYear", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	var userId = req.query.user_id; // Need to grab from token
	var year = req.query.year;

	var storedProcedure = 'GET_transactions_by_year';
	params = [userId, year];
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
@api {get} /api/transaction/getTransactionsYears Get all distinct years for the user's transactions
@apiName getTransactionsYears
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
**/
transaction.get("/getTransactionsYears", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	var userId = req.query.user_id; // Need to grab from token

	var storedProcedure = 'GET_transaction_years';
	params = [userId];
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
@api {get} /api/transaction/postTransaction Update or Insert a transaction
@apiName postTransaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Object} transaction Object with transaction information
**/
transaction.post("/postTransaction", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	var transaction = req.body.transaction; // Need to grab from token

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
@api {get} /api/transaction/deleteTransaction Deletes a transaction
@apiName deleteTransaction
@apiGroup /Transactions/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID of the owner of the transaction
@apiParam {Number} transaction_id ID of Transaction that will be removed
**/
transaction.delete("/deleteTransaction", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	var userId = req.query.user_id; // Need to grab from token
	var transactionId = req.query.transaction_id

	var storedProcedure = 'DELETE_transaction';
	params = [transactionId, userId];
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

module.exports = transaction;