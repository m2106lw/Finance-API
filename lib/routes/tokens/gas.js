const gas = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const { logAPICall } = require('../../logging');

/**
@api {get} /api/gas_transactions Returns a user's gas transactions
@apiName Get Gas Transactions
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} year The year that data will be loaded for
**/
gas.get("/gas_transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

    var user_id = req.decoded.user_id;
    var year = req.query.year;

	var storedProcedure = 'GET_gas_transactions';
	params = [user_id, year];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"][0]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

/**
@api {get} /api/gas_transactions/years Returns a user's cars
@apiName Get Gas Transaction Years
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID of the owner of the transaction
**/
gas.get("/gas_transactions/years", asyncHandler(async (req, res) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

    let user_id = req.decoded.user_id; // Need to grab from token

	var storedProcedure = 'GET_gas_years';
	params = [user_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

/**
@api {get} /api/gas_transactions/:gas_id Returns a user's gas transactions
@apiName Get a Gas Transaction
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} year The year that data will be loaded for
**/
gas.get("/gas_transaction/:gas_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

    let user_id = req.decoded.user_id;
    let gas_id = req.params.gas_id;

	var storedProcedure = 'GET_gas_transaction';
	params = [user_id, gas_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"][0]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

/**
@api {post} /api/gas_transactions Returns a user's gas transactions
@apiName Add a new Gas Transaction
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} year The year that data will be loaded for
**/
gas.post("/gas_transactions", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

    //var user_id = req.decoded.user_id;
    var gas_transaction = req.body;

	var storedProcedure = 'POST_gas_transaction';
	params = [gas_transaction["car_id"], gas_transaction["account_id"], gas_transaction["gas_price"], gas_transaction["gas_gallons"],
			  gas_transaction["gas_milage"], gas_transaction["transaction_date"]];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"][0]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

/**
@api {delete} /api/gas_transactions/:gas_id Returns a user's gas transactions
@apiName Modify a Gas Transaction
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {JSON} body Update this
**/
gas.delete("/gas_transaction/:gas_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let gas_id = req.params.gas_id;
	let transaction_id = req.query.transaction;

	var storedProcedure = 'DELETE_gas_transaction';
	params = [user_id, gas_id, transaction_id];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"][0]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

/**
@api {put} /api/gas_transactions/:gas_id Returns a user's gas transactions
@apiName Modify a Gas Transaction
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {JSON} body Update this
**/
gas.put("/gas_transaction/:gas_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let gas_id = req.params.gas_id;
    let gas_transaction = req.body;

	var storedProcedure = 'PUT_gas_transaction';
	params = [gas_id, gas_transaction["car_id"], gas_transaction["account_id"], gas_transaction["gas_price"], gas_transaction["gas_gallons"],
			  gas_transaction["gas_milage"], gas_transaction["transaction_date"], gas_transaction["transaction_id"]];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
		if (result["success"]) {
			res.status(200);
            res.send(result["data"][0]);
		}
		else {
			res.status(500);
			res.send(result["error"]);
		}
	})
}));

module.exports = gas;