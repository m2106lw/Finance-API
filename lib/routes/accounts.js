module.exports = function(tokenRoutes) {
	const { executeSP } = require('../database');
	
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
	tokenRoutes.get("/getAccounts", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
		var userName = req.query.username;

		var storedProcedure = 'GET_accounts';
		//params = [{"type": mysql.VARCHAR(255), "value": userName, "name": "userName"}];
		params = [userName];
		executeSP(res, storedProcedure, params, null, dbConfig);
	});	
}