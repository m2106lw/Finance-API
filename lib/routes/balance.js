module.export = function(tokenRoutes) {
	const { executeSP } = require('../database');
	
/**
@api {get} /api/getAccounts Return a list of Accounts for the User
@apiName getAccounts
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
*/
	tokenRoutes.get("/getBalances", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
		var user_id = req.query.user_id; // Also grab this from the decoded jwt

		var storedProcedure = 'GET_accounts';
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
	});
}