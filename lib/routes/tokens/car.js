const car = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');

// IDEA: Connect auto transactions to a car, then make a page for a car and display expenses related to it
/**
@api {get} /api/car/getCars Returns a user's cars
@apiName getCars
@apiGroup Cars
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID of the owner of the transaction
**/
car.get("/cars", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path);

	var user_id = req.decoded.user_id;

	var storedProcedure = 'GET_cars';
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

module.exports = car;