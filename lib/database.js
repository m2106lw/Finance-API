const { poolMap } = require('./sql');

// Maybe have the functions return the routes???

// We have this function to quickly format the variables for us by mysql library
const formatVariables = function(params) {
	var variables = "";
	for (param in params) {
		variables += "?,";
	}
	variables = "(" + variables.replace(/,\s*$/, "") + ")";
	return variables;
}

// // Function to connect to database and execute query
// var executeQuery = function(res, query, poolName){
     // mysql.connect(dbConfig, function (err) {
         // if (err) {
            // console.log(getTimestamp() + " Error while connecting database :- " + err);
            // res.send(err);
         // }
         // else {
            // // create Request object
            // var request = new mysql.Request();
            // // query to the database
            // request.query(query, function(err, rs) {
                // if (err) {
                    // console.log(getTimestamp() + " Error while querying database :- " + err);
                    // res.send(err);
                // }
                // else {
                    // res.send(rs);
                // }
            // });
         // }
    // });
// }
// exports.executeQuery = executeQuery;

// Function to execute stored procedure
var executeSP = function(storedProcedure, params, poolName) {
	var promise = new Promise((resolve) =>
		resolve(poolMap[poolName].getConnection().then(connection => {
			variables = formatVariables(params);
			console.log(variables);
			return connection.query("CALL " + storedProcedure + variables, params).then((rows) => {
					console.log("Stored procedure " + storedProcedure + " successful");
					connection.release();
					return {"success": true, "data": rows[0]};
				})
				.catch(err => {
					console.log("Error while running stored procedure " + storedProcedure + " in database :- " + err);
					return {"success": false, "error": err};
				})
		})
		.catch(err => {
			return {"success": false, "error": err};
		}))
	)
	return promise;
}
exports.executeSP = executeSP;

// Function to perform bulk insert
// Need to figure out to bulk insert and if it is worth doing it the way I am thinking about it
var executeSPBulk = function(table, storedProcedure, params, poolName) {
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
}
exports.executeSPBulk = executeSPBulk;

module.exports = {
	executeSP, executeSPBulk
}