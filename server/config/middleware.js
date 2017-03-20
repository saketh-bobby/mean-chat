var express    = require('express');
var bodyParser = require('body-parser');
var logger     = require('morgan');
var path     = require('path');
var passport   = require('passport');

//Nope not using sessions thanks to express-JWT
// var session    = require('express-session');


module.exports = function (app,rootPath) {
	// view engine setup
	app.set('views', path.join(rootPath, 'server/views'));
	app.set('view engine', 'ejs');

	//parsing req body etc middleware
	app.use(logger(process.env.NODE_ENV));
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({extended: false}));
	// app.use(session({secret: process.env.SESSION_SECRET, resave: false, saveUninitialized: false}));

	// initialize passport and restore session if any
	app.use(passport.initialize());
	// app.use(passport.session());

	//mount static files here
	app.use(express.static(path.join(rootPath, 'public')));
	app.use(express.static(path.join(rootPath, 'client')));

};