'use strict';
var mongoose      = require('mongoose');

module.exports = function (dbUrl) {
//mongoose config here
	mongoose.connect(dbUrl);
//mongoose connection handlers
	var db = mongoose.connection;
	db.once('open', function () {
		console.log('Connected to db successfully');
	});
	db.on('error', console.error.bind(console, 'Connection error:'));

};