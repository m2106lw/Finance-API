module.exports = function(tokenRoutes) {
	const { executeSP } = require('../database');
	
/**
@api {get} /api/getTransactions Return a list transactions for a user
@apiName getTransactions
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
**/
	tokenRoutes.get("/getTransactionsByYear", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
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
	});
	
/**
@api {get} /api/getTransactionsYears Get all distinct years for the user's transactions
@apiName getTransactionsYears
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
**/
	tokenRoutes.get("/getTransactionsYears", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
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
	});
	
/**
@api {get} /api/postTransaction Update or Insert a transaction
@apiName postTransaction
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Object} user_id User's ID
**/
	tokenRoutes.post("/postTransaction", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
		var transaction = req.body.transaction; // Need to grab from token
		console.log(transaction);

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
	});
}