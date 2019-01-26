const users = require('express').Router();
const asyncHandler = require('express-async-handler');
const { executeSP } = require('../../database');
const {logAPICall} = require('../../logging');

// TODO: Add change password call
// TODO: Modify delete user
/**
@api {post} /api/users/getUsers Insert a new allocation
@apiName getUsers
@apiGroup /Users/
@apiVersion 1.0.0

@apiParam {Boolean} None N/A
*/
/* users.get("/getUsers", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);
	var storedProcedure = 'GET_usernames';
	params = [];
	executeSP(storedProcedure, params, "dbConfig").then(result => {
	if (result["success"]) {
		res.status(200);
		res.send(result["data"]);
	}
	else {
		res.send(result["error"]);
		}
	})
})); */
	
users.delete("/user", asyncHandler(async (req, res, next) => {
	logAPICall(req.baseUrl + req.route.path, req.decoded.user_id);

	let user_id = req.decoded.user_id;

	var storedProcedure = '';
	params = [user_id];
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

module.exports = users;