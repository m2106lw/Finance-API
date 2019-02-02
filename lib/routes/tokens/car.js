const car = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');

// IDEA: Connect auto transactions to a car, then make a page for a car and display expenses related to it
/**
@api {get} /api/cars Returns a user's cars
@apiName Get Cars
@apiGroup Cars
@apiVersion 1.0.0
**/
car.get("/cars", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

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

/**
@api {get} /api/car/:car_id Returns a user's cars
@apiName Get info for a Car
@apiGroup Cars
@apiVersion 1.0.0

@apiParam {Number} car_id ID of the Car
**/
car.get("/car/:car_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let car_id = req.params.car_id

	var storedProcedure = 'GET_car';
	params = [user_id, car_id];
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
@api {post} /api/cars Creates a new car for the user
@apiName Create a Car
@apiGroup Cars
@apiVersion 1.0.0

@apiParam {String} car_name Name to assign to the car
@apiParam {String} car_description Description of the car
**/
car.post("/cars", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let car_name = req.body.car_name;
	let car_description = req.body.car_description;

	var storedProcedure = 'POST_car';
	params = [user_id, car_name, car_description];
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
@api {put} /api/car/:car_id Updates a car's info
@apiName Update info for a Car
@apiGroup Cars
@apiVersion 1.0.0

@apiParam {Number} car_id ID of the Car
@apiParam {String} car_name Name to assign to the car
@apiParam {String} car_description Description of the car
**/
car.put("/car/:car_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let car_id = req.params.car_id;
	let car_name = req.body.car_name;
	let car_description = req.body.car_description;
	

	var storedProcedure = 'PUT_car';
	params = [user_id, car_id, car_name, car_description];
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
@api {delete} /api/car/:car_id Delete a Car
@apiName Delete a user's Car
@apiGroup Cars
@apiVersion 1.0.0

@apiParam {Number} car_id ID of the Car
**/
car.delete("/car/:car_id", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;
	let car_id = req.params.car_id;	

	var storedProcedure = 'DELETE_car';
	params = [user_id, car_Id];
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