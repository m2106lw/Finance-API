module.exports = function(tokenRoutes) {
	const { executeSP } = require('../database');

/**
@api {post} /api/getUsers Insert a new allocation
@apiName getUsers
@apiGroup /Users/
@apiVersion 1.0.0

@apiParam {Boolean} None N/A
*/
	tokenRoutes.get("/getUsers", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);

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
	});
	
	tokenRoutes.get("/deleteUser", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);

		var storedProcedure = '';
		params = [];
		executeSP(storedProcedure, params, "dbConfig");
	});	
}