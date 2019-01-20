const authRoutes = require('express').Router();
const asyncHandler = require('express-async-handler');
const bcrypt = require('bcrypt');
const saltRounds = process.env.SALT || require('../../config').SALT || 10;
// Add basic-auth
var auth = require('basic-auth');
var jwt = require('jsonwebtoken');
let secretKey = process.env.SECRET || require('../../config').SECRET;
const {executeSP} = require('../database');

authRoutes.use(asyncHandler(async (req, res, next) => {
	let credentials = auth(req);
	if (!credentials) {
		res.status(401);
		res.setHeader('WWW-Authenticate', 'Basic realm="example"');
		res.end('Access denied');
	}
	else {
		//req.credentials = credentials;
		next();
	}
}));

// This is if the user has an account already. They will send their login info and we will return a jwt
authRoutes.post("/login", asyncHandler(async (req, res, next) => {
	let credentials = auth(req);
	let username = credentials["name"];
	let password = credentials["pass"];

	// TODO: We need to handle errors better
	// We are going to grab the user's ID based on their username
	let results = await executeSP('GET_user_id', [username], "dbConfig");
	if (results["success"]) {
		let user_id = results["data"][0][0]["user_id"];
		// Now we grab the user's password based on their user ID
		results = await executeSP('GET_user_password', [user_id], "dbConfig");
 		if (results["success"]) {			 
			let password_hash = results["data"][0][0]["password_hash"];

			// Now make sure that the password is the same that the user has saved
			let compare = await bcrypt.compare(password, password_hash)
				.then(res => res)
				.catch(err => err)

			if (compare) {
				req.user_id = user_id;
				next();
			}
			else {
				res.status(401);
				res.json(results["error"]);
			}
		 }
		 else {
			res.status(401);
			res.json(results["error"]);
		}
	}
	else {
		res.status(401);
		res.send("USERNAME IS BAD");
	}
}));

// This if for is the user is new and needs to have their account setup. A jwt will be returned at the end, just like above.
authRoutes.post("/users", asyncHandler(async (req, res, next) => {
	let credentials = auth(req);
	let username = credentials["name"];
	let password = credentials["pass"];

	let hash = await bcrypt.hash(password, saltRounds)
		.then(hash => {
			return {"success": true, "hash": hash}
		})
		.catch(err => {
			return {"success": false, "error": err}
		})

	if (hash["success"]) {
		// This should return the user_id and then we will proceed to the creation of the jwt
		let results = await executeSP('POST_user', [username, hash["hash"]], "dbConfig");
		if (results["success"]) {
			let user_id = results["data"][0][0]["user_id"];
			req.user_id = user_id;
			next();
		}
		else {
			res.status(401);
			res.json(results["error"]);
		}
	}
	else {
		// TODO: Actually figure out what the errors could be
		res.status(401);
		res.json(results["error"])
	}
}));

// This will return the token to the user, whether they are new or logging in for the first time
authRoutes.use(asyncHandler(async (req, res, next) => {
	let user_id = req.user_id;
	// Now create the token and store their user_id inside for later calls
	jwt.sign({ "user_id": user_id }, secretKey, { algorithm: 'HS512', expiresIn: '8h' }, (err, token) => {
		if (err) {
			res.status(401);
			res.send({"success": false, "error": err});
		}
		else {
			res.json({"success": true, "token": token});
		}
	});
}));

module.exports = authRoutes;