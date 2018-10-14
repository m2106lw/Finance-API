const mysql = require('promise-mysql');
const config = require('../config');

////Initiallising connection string
var dbConfig = mysql.createPool({
	user: config.financeDatabase.databaseUser,
	password: config.financeDatabase.databasePass,
	host: config.financeDatabase.databaseServer,
	database: config.financeDatabase.databaseName,
	port: 3306
});

// The idea behind this is we need to use multiple dbs
poolMap = {
	"dbConfig": dbConfig	
}

module.exports = {
	poolMap
}