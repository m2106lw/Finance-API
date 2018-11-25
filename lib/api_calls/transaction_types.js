const transaction_types = express.Router();
const { executeSP } = require('../database');
	
/**
@api {get} /api/transaction_types/getTransactionTypes Return a list of balances for the account
@apiName getTransactionTypes
@apiGroup /Transaction Types/
@apiVersion 1.0.0

@apiParam {Number} account_id Account's ID
*/
transaction_types.get("/getTransactionTypes", function(req, res) {
	//logAPICall(req.baseUrl + req.route.path);
	console.log(req.baseUrl + req.route.path);

	var storedProcedure = 'GET_transaction_types';
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

module.exports = transaction_types;