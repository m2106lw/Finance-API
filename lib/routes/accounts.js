module.exports = function(tokenRoutes) {
	const { executeSP } = require('../database');
	
/**
@api {get} /api/getAccounts Return a list of Accounts for the User
@apiName getAccounts
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
*/
	tokenRoutes.get("/getAccounts", function(req, res) {
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

/**
@api {post} /api/postAccount Insert a new Account
@apiName postAccount
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} user_id User's ID
@apiParam {String{255}} account_name Account Name
@apiParam {String{255}} account_description Account Description
*/
	tokenRoutes.post("/postAccount", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
		var user_id = req.body.user_id || req.query.user_id; // Also grab this from the decoded jwt
		var account_name = req.body.account_name || req.query.account_name;
		var account_description = req.body.account_description || req.query.account_description;

		var storedProcedure = 'INSERT_account';
		params = [user_id, account_name, account_description];
		console.log(params);
		executeSP(storedProcedure, params, "dbConfig").then(result => {
			if (result["success"]) {
				res.status(200);
				res.send();
			}
			else {
				res.send(result["error"]);
			}
		})
	});	
}