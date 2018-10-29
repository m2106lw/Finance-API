module.exports = function(tokenRoutes) {
	const { executeSP } = require('../database');
	
/**
@api {get} /api/getAccountBalances Return a list of balances for the account
@apiName getAccountBalances
@apiGroup /Accounts/
@apiVersion 1.0.0

@apiParam {Number} account_id Account's ID
*/
	tokenRoutes.get("/getTransactions", function(req, res) {
		//logAPICall(req.baseUrl + req.route.path);
		console.log(req.baseUrl + req.route.path);
		var userId = req.query.user_id; // Need to grab from token

		var storedProcedure = 'GET_transactions';
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
}