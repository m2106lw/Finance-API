#!/usr/bin/env node

//Initializing node modules
// Config file
const config = require('./config');
// Log what the server does
const { logger } = require('./lib/logging');
// The express app
const app = require('./lib/app')();

// This will create a server with the app listening on the port specified in the config file
var server = app.listen(config.port || 8080, function () {
    var port = server.address().port;
	logger.info({"category": "server", "status": "running", "description": `App now running on ${port}`, "environment": config.NODE_ENV});
});

// If the server recieves an error then we long the type and then shut everything down
server.once('error', function(err) {
	if (err.code === 'EADDRINUSE') {
		logger.error({"category": "server", "status": "failure", "error": "EADDRINUSE", "description": `Port ${config.port} is already in use.`});
	}
	else if (err.code === 'EACCES') {
		logger.error({"category": "server", "status": "failure", "error": "EACCES", "description": `Permission denied for port ${config.port}`});
	}
	else {
		logger.error({"category": "server", "status": "failure", "error": err.code, "description": err});
	}
	shutDown(err.code);
});
let connections = [];

/* setInterval(() => server.getConnections(
    (err, connections) => logger.info(`${connections} connections currently open`)
), 1000); */

server.on('connection', connection => {
    connections.push(connection);
    connection.on('close', () => connections = connections.filter(curr => curr !== connection));
});

// TODO: Close down any connections remaining since they will stop the server from closing
// https://stackoverflow.com/questions/43003870/how-do-i-shut-down-my-express-server-gracefully-when-its-process-is-killed
// Close down everything and log the shutdown code
function shutDown(shutdownCode) {
    server.close(() => {
		if (shutdownCode == undefined) {
			logger.info({"category": "server", "status": "shutdown", "error": "Undefined, probably due to use on Windows"});
			process.exit(1);
		}
		else if ("SIG" === shutdownCode.substring(0,3)) {
			logger.info({"category": "server", "status": "shutdown", "type": shutdownCode});
			process.exit(0);
		}
		else {
			logger.info({"category": "server", "status": "shutdown", "error": shutdownCode});
			process.exit(1);
		}
	});
	
	connections.forEach(curr => curr.end());
    setTimeout(() => connections.forEach(curr => curr.destroy()), 5000);
}

// Specific process ending calls
process.on('SIGTERM', shutDown);
process.on('SIGINT', shutDown);

// Export the server
module.exports = function() {
	return server;
}