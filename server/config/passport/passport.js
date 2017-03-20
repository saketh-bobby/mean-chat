"use strict";
var passport      = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var bcrypt        = require('bcrypt');

var User      = require('../../models/userModel');
module.exports = (function () {
	//passport middleware for local strategy
	passport.use(new LocalStrategy(
		function (username, password, done) {
			//	TODO: add validation for credentials here
			//	check user in db
			function findCb(err, user) {
				// if some error while finding
				if (err) {
					done(err);
				}
				// matching document is not found
				if (!user) {
					done(null, false);
				}
				else {
					//compare hashed password with db
					bcrypt.compare(password, user.passwordHash, function (err, response) {
						if (err) {
							done(err);
						}
						//if success
						if (response) {
							done(null, user);
						}
						//if failed
						else {
							done(null, false);
						}
					});
				}
			}
			User.findOne({username: username}, findCb);
		}
	));

	// No need of sessions since auth is through JWTs Super Cool

	// // serialize and deserialize to session
	// passport.serializeUser(function (user, cb) {
	// 	//	store in the session
	// 	console.log(user);
	// 	cb(null, user._id);
	// });

	// passport.deserializeUser(function (userId, cb) {
	// 	// retrieve user id from the session
	// 	cb(null, userId);
	// });
	//

})();
