const balance = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');
	
/**
@api {get} /api/account/:account_id/balance Return a list of balances for the account
@apiName Get Account Balance
@apiGroup /Accounts/
@apiVersion 1.0.0
*/
balance.get("/account/:account_id/balance", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	var account_id = req.params.account_id;

	var storedProcedure = 'GET_account_balances';
	params = [user_id, account_id];
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

// TODO: Maybe add a GET /balances call for all accounts. Not sure of the usage

module.exports = balance;