#!/usr/bin/env node

// ///////////////////////////////////////////////////////// //
//  Globehub Server Code - Running on the Express Framework  //
// ///////////////////////////////////////////////////////// //

/**
 * Module dependencies.
 */

/** Require Modules for Server-Side Functionality **/

var express = require('express');
var http = require('http');
var path = require('path');
var flash = require('connect-flash');
var passport = require('passport');
var expressSession = require('express-session')
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var routes = require('./routes/index')(passport);
var db = require('./database');
var test = require('./local_modules/dombatch');
var webscraper = require('./local_modules/webscraper');
var initPassport = require('./passport/init');

var app = express();
app.io = require('socket.io')();

/** Configure Express Application Server our Web-Application **/

/* view engine setup */ 
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/* "say something here for clarity and for you own understanding" */
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

/* configuring passport */
app.use( expressSession( { secret: '<mysecret>', saveUninitialized: true, resave: true } ) );
app.use( passport.initialize( ) );
app.use( passport.session( ) );

/* using flash middle-ware */
app.use(flash());

/* Initialize Passport! */
initPassport( passport );

/* set the route to root becuase this should be a SPA ( Single-Page-Application ) */
app.use('/', routes);

/* have our application connect to the locally running MongoDB instance  */
app.use( function( req , res , next ){
  req.db = db;
  next( );
});

/** Error Handlers **/

/* development error handler - will print stack trace */
if (app.get('env') === 'development') {
	app.use(function(err, req, res, next) {
	  res.status(err.status || 500);
	  res.render('error', {
	    message: err.message,
	    error: err
	  });
	});
}

/* catch 404 and forward to error handler */
app.use(function(req, res, next) {
	var err = new Error('Not Found');
	err.status = 404;
	next(err);
});

/* production error handler - no stacktraces leaked to user */
app.use(function(err, req, res, next) {
	res.status(err.status || 500);
	res.render('error', {
	  message: err.message,
	  error: {}
	});
});

module.exports = app;

/** Start Listening with socket.io **/

app.io.on( 'connection', function(socket) {

  console.log('Web-Socket Connected');

    /* validation of web-scraped urls */

  socket.on('initialize' , function( data ) {
    console.log('Validating...');
    test.validate( function ( response ) {
      console.log('Finished!');
      if( !response ) {
        socket.emit('validation' , { 'msg': ' Globehub is currently undergoing maintainance, in the mean time use google ' , 'response': response } )
      } else {
        console.log( response );
        socket.emit('validation' , { 'msg': ' Loading...' , 'response': response } )
      }
    });  
  });

  /* date and time for application */

  setInterval( function( ) {

       socket.emit('date', {'date': new Date( ) } );

    } , 1000 );

  /* constantly send validation for clients every hour on the hour */

  setInterval( function( ) {
    test.validate( function ( response ) {
      if( !response ) {
        socket.emit('validation' , {'response': response })
      } else {
        socket.emit('validation' , {'response': response })
      }
    } );  
  }, 3600000 );

  /* on client request for news */

  socket.on( 'send-info' , function( data ) {

    console.log(data.info.name);

    socket.emit('sent', { 'msg': 'message received!' } )
    webscraper.getNewsNow( data.info.newsnow , function(news){
      webscraper.getProfileBBC( data.info.bbc , function(bbc){
        webscraper.getProfileIM( data.info.im , function(im){
          socket.emit('receive-info',{'info':{'country':data.info.name,'news':news,'profiles':{'bbc':bbc,'im':im}}});
        });
      });
    });
  });   
});