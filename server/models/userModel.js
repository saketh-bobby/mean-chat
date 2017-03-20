var mongoose = require('mongoose');
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');

var Schema = mongoose.Schema;

//create new schema for users in db
var userSchema = new Schema({
	email:{type:'String',required:true},
	username:{
		type:String,
		required:true,
		unique:true /*unique index here instead of _id*/
	},
	password:{type:String,required:true},
	salt:String
});

userSchema.methods.generateJwt = function(){
	var expiry = new Date();
	expiry.setDate(expiry.getDate() + 7);

	return jwt.sign({
		_id: this._id,
		exp: parseInt(expiry.getTime() / 1000),
	}, process.env.JWT_SECRET);
};

userSchema.pre('save', function(next) {
	var user = this;
	// generate a salt
	bcrypt.genSalt(10, function(err, salt) {
		if (err) return next(err);
		user.salt = salt;
		// hash the password using our new salt
		bcrypt.hash(user.password, salt, function(err, hash) {
			if (err) return next(err);
			// set password hash
			user.password = hash;
			next();
		});
	});
});

//compile schema and export the model obtained
module.exports = mongoose.model('User',userSchema);