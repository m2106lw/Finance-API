const transaction_types = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');
	
/**
@api {get} /api/transaction_types Return a list of balances for the account
@apiName Get Transaction Types
@apiGroup /Transaction Types/
@apiVersion 1.0.0
*/
transaction_types.get("/transaction_types", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;

	var storedProcedure = 'GET_transaction_types';
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

/**
@api {post} /api/transaction_types Create a user's transaction category
@apiName Create a new Transaction Type
@apiGroup /Transaction Types/
@apiVersion 1.0.0
*/
transaction_types.post("/transaction_types", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let transaction_type = req.body;

	var storedProcedure = 'POST_transaction_type';
	params = [user_id, transaction_type["type_name"], transaction_type["type_description"]];
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
@api {put} /api/transaction_type/:transaction_type_id Update a user's transaction category
@apiName Update a Transaction Type
@apiGroup /Transaction Types/
@apiVersion 1.0.0
*/
transaction_types.put("/transaction_type/:transaction_type_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let transaction_type_id = req.params.transaction_type_id
	let transaction_type = req.body;

	var storedProcedure = 'PUT_transaction_type';
	params = [user_id, transaction_type["type_name"], transaction_type["type_description"], transaction_type_id];
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
@api {delete} /api/transaction_type/:transaction_type_id Delete a user's transaction category
@apiName Delete a Transaction Type
@apiGroup /Transaction Types/
@apiVersion 1.0.0
*/
transaction_types.delete("/transaction_type/:transaction_type_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let transaction_type_id = req.params.transaction_type_id

	var storedProcedure = 'DELETE_transaction_type';
	params = [user_id, transaction_type_id];
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

module.exports = transaction_types;