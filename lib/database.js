const mysql = require('mysql');
const { poolMap } = require('./sql');

// Maybe have the functions return the routes???

// Function to connect to database and execute query
var executeQuery = function(res, query, poolName){
     mysql.connect(dbConfig, function (err) {
         if (err) {
            console.log(getTimestamp() + " Error while connecting database :- " + err);
            res.send(err);
         }
         else {
            // create Request object
            var request = new mysql.Request();
            // query to the database
            request.query(query, function(err, rs) {
                if (err) {
                    console.log(getTimestamp() + " Error while querying database :- " + err);
                    res.send(err);
                }
                else {
                    res.send(rs);
                }
            });
         }
    });
}
exports.executeQuery = executeQuery;

// Function to connect to database and execute query
var executeSP = function(res, storedProcedure, params, function_name, poolName) {	
	poolMap[poolName].getConnection(function(err, connection) {
		if (err) {
			console.log(err);
		}
		else {
			var variables = "";
			for (param in params) {
				variables += "?,";
			}
			variables = "(" + variables.replace(/,\s*$/, "") + ")";
			console.log(variables);
			connection.query("CALL " + storedProcedure + variables, params, function(err, result, returnValue) {
				if(err) {
					console.log("Error while running stored procedure " + storedProcedure + " in database :- " + err);
					res.send(err);
				}
				else {
					if (function_name != null) {
						var data = function_name(result[0]);
						res.send(data);
					}
					else {
						res.send(result[0]);
					}
					console.log("Stored procedure " + storedProcedure + " successful");
					connection.release();
				}
			});
		}
	});
}
// var executeSP = async function(res, storedProcedure, params, function_name, poolName){	
	// await poolMap[poolName].getConnection()
	// .then(connection => {
			// var variables = "";
			// for (param in params) {
				// variables += "?,";
			// }
			// variables = "(" + variables.replace(/,\s*$/, "") + ")";
			// console.log(variables);
			// var results = connection.query("CALL " + storedProcedure + variables, params);
			// connection.release();
			// return results;
	// })
	// .then(result => {
		// if (function_name != null) {
			// var data = function_name(result[0]);
			// res.send(data);
		// }
		// else {
			// res.send(result[0]);
		// }
		// console.log(getTimestamp() + ": Stored procedure " + storedProcedure + " successful")	
	// })
	// .catch(err => {
		// console.log(getTimestamp() + ": Error while running stored procedure " + storedProcedure + " :- " + err);
		// res.send(err);
	// })
// }
exports.executeSP = executeSP;

// Function to connect to database and execute query
var executeSPBulk = function(res, table, storedProcedure, params, function_name, poolName){
    mysql.connect(dbConfig, function (err) {
         if (err) {
            console.log(getTimestamp() + ": Error while connecting database :- " + err);
            res.send(err);
         }
         else {
            // create Request object
            var request = new mysql.Request();
            // run the bulk insert function
            request.bulk(table, function(err, result, returnValue) {
                if(err) {
                    console.log(getTimestamp() + ": Error while running bulk insert into database :- " + err);
                    res.send(err);
                }
                else {
					console.log(getTimestamp() + ": Records Inserted :- " + result);
					executeSP(res, storedProcedure, params, function_name, dbConfig);
                }
            });
        }
    });
}
exports.executeSPBulk = executeSPBulk;

module.exports = {
	executeSP, executeSPBulk
}