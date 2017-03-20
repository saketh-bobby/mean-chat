var express = require('express');
var router = express.Router();
var expressJwt = require('express-jwt');

router.use(expressJwt({secret:process.env.JWT_SECRET},function(req,res,next){
	if(!req.user){
		return next("UnAuthorized request.Please login!!");
	}
	next();
}));

router.get('/chat',function(req,res){
	res.status(200).json({user:req.user});
});

module.exports = router;
