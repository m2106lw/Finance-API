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
	
// Might need to be a get
authRoutes.post("/login", asyncHandler(async (req, res, next) => {
	let credentials = auth(req);
	let username = credentials["name"];
	let password = credentials["pass"];

	let results = await executeSP('GET_user_id', [username], "dbConfig");
	if (results["success"]) {
		let user_id = results["data"][0][0]["user_id"];

		results = await executeSP('GET_user_password', [user_id], "dbConfig");
/* 		if (results["success"]) {

		}
 */
		let hash = "TEST";
		// Figure out how to get something returned from the database in another api module
		let compare = await bcrypt.compare(password, hash)
			.then(res => res)
			.catch(err => err)

		//res.send(compare);
		if (compare) {
 			jwt.sign({ "user_id": user_id }, secretKey, { algorithm: 'HS512', expiresIn: '8h' }, (err, token) => {
				if (err) {
					res.status(401);
					res.send({"success": false, "error": err});
				}
				else {
					res.json({"success": true, "token": token});
				}
			})
		}
		else {
			// TODO: Work on improving this failure
			res.status(401);
			res.json(compare);
		}
	}
	else {
		res.status(401);
		res.send("USERNAME IS BAD");
	}
}));

authRoutes.post("/user", asyncHandler(async (req, res, next) => {
	let credentials = auth(req);
	let password = credentials["pass"];

	let hash = await bcrypt.hash(password, saltRounds)
		.then(hash => {
			console.log("hash", hash);
			return hash;
		})
		.catch(err => {
			console.log("error", err);
			return err;
		});
	res.send(hash);
	//next();
}));

module.exports = authRoutes;