const accounts = require('express').Router();
const { executeSP } = require('../database');
const {logAPICall} = require('../logging');
	
/**
@api {get} /api/account/getAccounts Return a list of Accounts for the Specified User
@apiName getAccounts
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
*/
accounts.get("/getAccounts", function(req, res) {
	logAPICall(req.baseUrl + req.route.path);
	var userId = req.query.user_id; // Also grab this from the decoded jwt
	var storedProcedure = 'GET_accounts';

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
@api {get} /api/account/getAccountById Get an accounts info through its ID
@apiName getAccountById
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} account_id Account's ID
*/
accounts.get("/getAccount", function(req, res) {
	logAPICall(req.baseUrl + req.route.path);
	var accountId = req.query.account_id;
	var userId = req.query.user_id;

	var storedProcedure = 'GET_account';
	params = [accountId, userId];
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
@api {post} /api/account/postAccount Insert a new Account
@apiName postAccount
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
@apiParam {String{255}} account_description Account Description
@apiParam {String{255}} account_name Account Name
@apiParam {Number} accountId ID of the Account to update
*/
accounts.post("/postAccount", function(req, res) {
	logAPICall(req.baseUrl + req.route.path);
	var userId = req.body.user_id || req.query.user_id; // Also grab this from the decoded jwt
	var accountDescription = req.body.account_description || req.query.account_description;
	var accountName = req.body.account_name || req.query.account_name;
	var accountId = req.body.account_id || req.query.account_id;

	var storedProcedure = 'POST_account';
	params = [userId, accountDescription, accountName, accountId];
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

module.exports = accounts;