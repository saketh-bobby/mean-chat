var express = require('express');
var app     = express();

//env config here
require('dotenv').config();

//require routes here
var index      = require('./server/routes/index');
var authRouter = require('./server/routes/auth');
var appRouter = require('./server/routes/chat_app');

//mongoose config goes here
require('./server/config/db.js')(process.env.DBURL);

//passport config goes here
require('./server/config/passport/passport.js');

//express config and middleware here
require('./server/config/middleware')(app,process.env.ROOT_PATH);

//routes for views
app.use('/', index);
app.use('/auth', authRouter);
app.use('/app', appRouter);


app.use('*', function (req, res) {
	res.redirect('/');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
	var err    = new Error('Not Found');
	err.status = 404;
	next(err);
});

// error handler
app.use(function (err, req, res) {
	// set locals, only providing error in development
	res.locals.message = err.message;
	res.locals.error   = req.app.get('NODE_ENV') === 'dev' ? err : {};

	// render the error page
	res.status(err.status || 500);
	res.render('error');
});


module.exports = app;
