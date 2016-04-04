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
var cookie    = require('cookie');
var signature = require('cookie-signature');
var expressSession = require('express-session');
var MongoStore = require('connect-mongo')(expressSession);
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

var app = express(),
    name   = 'connect.sid',
    secret = '<mysecret>',
    store = new MongoStore({ mongooseConnection: db });

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

/* configuring session */
app.use( expressSession( 
                        { 'secret': secret, 
                          'name' : name,
                          'saveUninitialized' : true, 
                          'resave': true , 
                          'store' : store
                        }));

/* authenticate user with passport */
app.use( passport.initialize( ) );
app.use( passport.session( ) );

/* using flash middle-ware */
app.use(flash());

/* Initialize Passport! */
initPassport( passport );

/* set the route to root becuase this should be a SPA ( Single-Page-Application ) */
app.use('/', routes);

/* have our application connect to the locally running MongoDB instance */
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

var PocketProvider = require('./PocketProvider').PocketProvider;
var WatchProvider = require('./WatchProvider').WatchProvider;
var ArticleProvider = require('./ArticleProvider').ArticleProvider;

/** Start Listening with socket.io **/

app.io.on( 'connection', function(socket) {

  var user;

  console.log('Web-Socket Connected');

  /**
   *  Hacky Solution to getting the session ID, to correspond with the User Id... Found on Stackoverflow
   */

  if (socket.handshake && socket.handshake.headers && socket.handshake.headers.cookie) {
    var raw = cookie.parse(socket.handshake.headers.cookie)[name];
    if (raw) {
      // The cookie set by express-session begins with s: which indicates it
      // is a signed cookie. Remove the two characters before unsigning.
      socket.sessionId = signature.unsign(raw.slice(2), secret) || undefined;
    }
  }
  if (socket.sessionId) {
    store.get(socket.sessionId, function(err, session) {
      user = session.passport.user;
      console.log(user);
    });
  }

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


  socket.on('make-pocket' , function( data ) {

    console.log(app);

    var pocket_col = db.collection('pockets');
    var current_user = db.collection('users').find( { _id:user });

  });
});
