var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

var User = require('../models/userModel');

router.use(expressJwt({secret:process.env.JWT_SECRET},function(req,res,next){
	if(!req.user){
		return next("UnAuthorized request.Please login!!");
	}
	next();
}));

router.get('/chat',function(req,res){
	res.status(200).json({user:req.user});
});

router.get('/api/me',function(req,res){
	User
		.findById(req.user._id)
		.select({username:1,email:1})
		.exec(function(err,user){
			if(err){
				return res.status(500).json({message:err});
			}
			res.status(200).json({user:user});
		});
});

module.exports = router;
