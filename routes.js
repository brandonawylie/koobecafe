var mongo = require('mongodb');
var monk = require('monk');
var db = monk('localhost:27017/mydb');

//load the main page
exports.index = function(req, res){
	res.render('index')
}

//function to create an account
exports.createaccount = function(req, res){
	//TODO validate form data and modularize database interaction
	
	var collection = db.get('usercollection');
	// Submit to the DB
	collection.insert({
		"email" : req.body.user.email,
		"firstname" : req.body.user.firstname,
		"lastname" : req.body.user.lastname,
		"password" : req.body.user.password
		}, function (err, doc) {
				if (err) {
					// If it failed, return error
					res.send("There was a problem adding the information to the database.");
				}
			}
	);
	var cursor = collection.find({"email": req.body.user.email},{}, function(e, docs){
		console.log(docs);
		databasehelper.insert(docs);
	});
	res.render('createaccount');
}

//login to the system
exports.login =  function (req, res) {
	res.render('login');
}
