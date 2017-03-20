var express = require('express');
var router = express.Router();
var passport = require('passport');
/* GET home page. */
router
	.route('/')
	.get(function(req, res) {
         res.render('index', { title: 'A chat application' });
	})
	//passport login request code here when user submits
	.post(passport.authenticate('local'),
		function(req,res){
			console.log("User in request: "+req.user);
			console.log("Session: ",req.session);
			res.redirect('/chat-app');
		}
	);
module.exports = router;
