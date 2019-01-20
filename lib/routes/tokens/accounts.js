const accounts = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');
	
/**
@api {get} /api/account/accounts Return a list of Accounts for the Specified User
@apiName Get Accounts
@apiGroup /Accounts/
@apiVersion 1.0.0
*/
accounts.get("/accounts", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id;

	var storedProcedure = 'GET_accounts';
	params = [user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			res.json(result["data"][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

/**
@api {get} /api/account/:account_id Get an accounts info through its ID
@apiName Get Account
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} :account_id Account's ID
*/
accounts.get("/:account_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var account_id = req.params.account_id;
	var user_id = req.decoded.user_id;

	var storedProcedure = 'GET_account';
	params = [account_id, user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
			let account = result["data"][0][0] || {};
			// We need to check if data was found or not to set the right status
			if (Object.keys(account).length === 0) {
				res.status(404);
			}
			res.json(account);
		}
		else {
			res.status(400);
			res.send(result["error"]);
		}
	})
}));

/**
@api {post} /api/account/accounts Insert a new Account
@apiName Create Account
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {String{255}} account_description Account Description
@apiParam {String{255}} account_name Account Name
*/
accounts.post("/accounts", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id;
	var account_description = req.body.description;
	var account_name = req.body.name;

	var storedProcedure = 'POST_account';
	params = [user_id, account_description, account_name];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(201);
			// TODO: Maybe check if we got an ID or not
			res.send(result["data"][0][0]);
		}
		else {
			res.send(result["error"]);
		}
	})
}));

/**
@api {put} /api/account/:account_id Update an Account
@apiName Update Account
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {String{255}} account_description Account Description
@apiParam {String{255}} account_name Account Name
@apiParam {Number} :account_id ID of the Account to update
*/
accounts.put("/:account_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	
	var user_id = req.decoded.user_id;
	var account_description = req.body.description;
	var account_name = req.body.name;
	var account_id = req.body.account_id;

	var storedProcedure = 'PUT_account';
	params = [user_id, account_description, account_name, account_id];
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
@api {delete} /api/account/:account_id Delete an Account
@apiName Delete Account
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} :account_id ID of the Account to update
*/
accounts.delete("/:account_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);
	
	var user_id = req.decoded.user_id;
	var account_id = req.params.account_id

	var storedProcedure = 'DELETE_account';
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

module.exports = accounts;