const gas = require('express').Router()
const { executeSP } = require('../database');
const {logAPICall} = require('../logging');

/**
@api {get} /api/gas/getGasByYear Returns a user's cars
@apiName getGasByYear
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID of the owner of the transaction
@apiParam {Number} year The year that data will be loaded for
**/
gas.get("/getGasByYear", function(req, res) {
	logAPICall(req.baseUrl + req.route.path);
    var userId = req.query.user_id; // Need to grab from token
    var year = req.query.year;

	var storedProcedure = 'GET_gas_by_year';
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
@api {get} /api/gas/getGasYears Returns a user's cars
@apiName getGasYears
@apiGroup Gas
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID of the owner of the transaction
**/
gas.get("/getGasYears", function(req, res) {
	logAPICall(req.baseUrl + req.route.path);
    var userId = req.query.user_id; // Need to grab from token

	var storedProcedure = 'GET_gas_years';
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

module.exports = gas;