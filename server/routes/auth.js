var express    = require('express');
var bcrypt     = require('bcrypt');
var jwt        = require('jsonwebtoken');
var authRouter = express.Router();
var User       = require('../models/userModel');
authRouter
	.route('/signup')
	.post(signupPostHandler);

authRouter
	.route('/login')
	.post(loginPostHandler);


///////////////////
function signupPostHandler(req, res) {
	//	todo:call rest api endpoint,for now just inline
	var username = req.body.username,
	    password = req.body.password,
	    email    = req.body.email;
	User.findOne({username: username}, function (err, user) {
		if (err) {
			console.error(err);
			res.status(500).json({message: err});
		}
		if (user) {
			res.status(400).json({message: 'You are already an existing user ! Please Login'});
		} else {
			//	todo:do a post request to rest_api signup
			user = new User({username: username, email: email, password: password});

			user.save(function (err, user) {
				if (err) {
					console.error(err);
					res.status(500).json({message: err});
				} else {
					res.status(200).json({message: 'success'});
				}
			});
		}
	});

}

function loginPostHandler(req, res) {
	var username = req.body.username;
	var password = req.body.password;

	User.findOne({username: username}, function (err, user) {
		if (err) {
			res.status(500).json({message: err});
		}
		if (user) {
			bcrypt.compare(password, user.password, function (err, result) {
				if (result) {
					var jwtToken = user.generateJwt();
					res.status(200).json({token: jwtToken});
				} else {
					res.status(400).json({message: 'Username or password is incorrect'});
				}
			});
		} else {
			res.status(400).json({message: 'Username you typed doesn\'t exist'});
		}
	});
}

module.exports = authRouter;