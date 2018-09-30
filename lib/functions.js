// If the map is empty then we got our data from the url.
var isEmptyObject = function(obj) {
	return Object.keys(obj).length === 0;
}
exports.isEmptyObject = isEmptyObject;

// This will get the time it is when the function call is made
// For logging at the moment but maybe also for database stuff later on
//function getTimestamp() {
var getTimestamp = function() {
	//return Date.now();
	var time = Date.now();
	return new Date(time);
}
exports.getTimestamp = getTimestamp;

// This will generate a random alphanumeric 5 character sequence
var makeid = function() {
  var text = "";
  var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

  for (var i = 0; i < 5; i++)
    text += possible.charAt(Math.floor(Math.random() * possible.length));

  return text;
}
exports.makeid = makeid;

// This function will simply print out the API call that was made for logging purposes
var logAPICall = function(path) {
	console.log(getTimestamp() + ": Call to " + path + " made.");
}
exports.logAPICall = logAPICall;

// This will hopefully remove the ambiguity of booleans being passed from K2
var checkBoolean = function(value) {
	try {
		// If we recieve 'true' or a value of 0 then we want this account to be active
		if (value.toLowerCase() == 'true' || value > 0) {
			return true;
		}
		// If we recieve 'false' or a value greater than 0 than we want the account disabled.
		else if (value.toLowerCase() == 'false' || value == 0) {
			return false;
		}
		// If we can't figure out what we got then we return false and print out a message.
		else {
			console.log("Error: Could not figure out value of " + value + ". Returning false.");
			return false;
		}
	}
	catch (error) {
		// Checks for boolean
		if (typeof(value) == typeof(true)) {
			//console.log("Value is: " + value + " with type of " + typeof(value));
			//var value2 = value.toString()
			//return checkBoolean(value2);
			return value;
		}
		else {
			console.log("Error of " + error + " for " + value + " with type of " + typeof(value));
			return false;
		}
	}
}
exports.checkBoolean = checkBoolean;

// Simply takes the result we get and remove it from the array it is stored in
var removeFromArray = function(result) {
	var data = result[0];
	return data;
}
exports.removeFromArray = removeFromArray;

// ########################################## SQL FUNCTIONS ##########################################

// ########################################## SQL FUNCTIONS ##########################################