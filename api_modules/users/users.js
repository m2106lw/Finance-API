module.exports = function(tokenRoutes, functions, dbConfig) {
	// We need this to handle the sql data types we pass
	var mysql = require("mysql");
	
	var executeSP = functions.executeSP;

/**
@api {post} /api/insertAllocation Insert a new allocation
@apiName insertAllocation
@apiGroup /Allocation/
@apiVersion 1.0.0

@apiParam {Number} account_id Account ID
@apiParam {Number} type_id Type ID
@apiParam {Number} client_id Client ID
@apiParam {Number} cost_center Cost Center ID
@apiParam {String{255}} description Allocation description
@apiParam {Number} rate Allocation Rate
@apiParam {String} date Allocation Date (Should be beginning of the month)
*/
	tokenRoutes.get("/getUsers", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);

		var storedProcedure = 'GET_usernames';
		params = [];
		executeSP(res, storedProcedure, params, null, dbConfig);
	});		
	
}