const balance = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');
	
/**
@api {get} /api/balance/getAccountBalances Return a list of balances for the account
@apiName getAccountBalances
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} account_id Account's ID
*/
balance.get("/getAccountBalances", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	var accountId = req.query.account_id;

	var storedProcedure = 'GET_account_balances';
	params = [accountId];
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

module.exports = balance;