// Object containing the database connectios we need to make. Probably won't go beyond one
const { poolMap } = require('./sql');
// For logging
const { logger } = require('./logging');

// Maybe have the functions return the routes???

// This function will quickly format the variables for use by mysql library
// Basically make a comma separated list of ?'s for each variable
const formatVariables = (params) => {
	let variables = "";
	for (param in params) {
		variables += "?,";
	}
	variables = "(" + variables.replace(/,\s*$/, "") + ")";
	return variables;
}

// TODO: Return error codes based on server failure or database failure
// Function to execute stored procedure
var executeSP = async (storedProcedure, params, poolName) => {
	// Make a connection and make a query call which will call the stored procedure along with all the needed variables
	return await poolMap[poolName].getConnection().then(connection => {
		// Grab the right form for the variables based on the params passed, ex: (?, ?, ?)
		variables = formatVariables(params);
		return connection.query("CALL " + storedProcedure + variables, params).then(rows => {
				logger.verbose({"success": true, "category": "storedprocedure", "storedprocedure": storedProcedure});
				connection.release();
				return {"success": true, "data": rows};
			})
			.catch(err => {
				logger.warn({"success": false, "category": "storedprocedure", "storedprocedure": storedProcedure, "error": err});
				return {"success": false, "error": err};
			})
		})
		.catch(err => {
			// This should only occur if we cannot connect to the database
			return {"success": false, "error": err};
		})
}

// Function to perform bulk insert
// Need to figure out to bulk insert and if it is worth doing it the way I am thinking about it
// CURRENTLY NOT IMPLEMENTED
/* var executeSPBulk = function(table, storedProcedure, params, poolName) {
    mysql.connect(dbConfig, function (err) {
         if (err) {
            console.log(getTimestamp() + ": Error while connecting database :- " + err);
			res.send({"success": false, "error": err});
         }
         else {
            // create Request object
            var request = new mysql.Request();
            // run the bulk insert function
            request.bulk(table, function(err, result, returnValue) {
                if(err) {
                    console.log(getTimestamp() + ": Error while running bulk insert into database :- " + err);
					res.send({"success": false, "error": err});
                }
                else {
					console.log(getTimestamp() + ": Records Inserted :- " + result);
					executeSP(res, storedProcedure, params, functionName, dbConfig);
                }
            });
        }
    });
} */

module.exports = {
	executeSP //, executeSPBulk
}