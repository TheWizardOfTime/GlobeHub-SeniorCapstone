/** NOTE
 *
 *  This code was written by following a number of tutorials on how to set up a user authenticated login page
 *  with node.js, express, and mongodb using the mongoose ODM, however the most relevant are listed below.
 *
 * 
 *	The original links are here:
 *
 *	http://code.tutsplus.com/tutorials/authenticating-nodejs-applications-with-passport--cms-21619
 *  http://mherman.org/blog/2015/01/31/local-authentication-with-passport-and-express-4/#.VvCRmRIrKu5
 *
 *  All credit @tommcfarlin , https://github.com/tommcfarlinc & @mjhea0 , https://github.com/mjhea0.
 *
 */

var express = require('express');
var router = express.Router();

var isAuthenticated = function (req, res, next) {
	// if user is authenticated in the session, call the next() to call the next request handler 
	// Passport adds this method to request object. A middleware is allowed to add properties to
	// request and response objects
	if (req.isAuthenticated())
		return next();
	// if the user is not authenticated then redirect him to the login page
	res.redirect('/');
}

module.exports = function( passport ) {

	// console.log( typeof passport );
	// console.log( Object.getOwnPropertyNames( passport ));

	/* GET login page. */
	router.get('/', function(req, res) {
    	// Display the Login page with any flash message, if any
		res.render('login', { message: req.flash('login!') });
	});

	/* Handle Login POST */
	router.post('/login', passport.authenticate('login', {
		successRedirect: '/home',
		failureRedirect: '/',
		failureFlash : true  
	}));

	/* GET Registration Page */
	router.get('/signup', function(req, res){
		res.render('signup',{message: req.flash('register!')});
	});

	/* Handle Registration POST */
	router.post('/signup', passport.authenticate('signup', {
		successRedirect: '/home',
		failureRedirect: '/signup',
		failureFlash : true  
	}));

	/* GET Home Page */
	router.get('/home', isAuthenticated, function(req, res){
		res.render('index', { user: req.user });
	});

	/* POST to Home Page - i.e save stuff to data base */

	router.post('/home', function(req, res) {


	})

	/* Handle Logout */
	router.get('/signout', function(req, res) {
		req.logout();
		res.redirect('/');
	});

	return router;
}