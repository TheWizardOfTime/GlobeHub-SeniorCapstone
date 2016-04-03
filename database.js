#!/usr/bin/env node

// //////////////////////////////////////////////////////////// //
//  Globehub Database Code - Running MongoDB with Mongoose ORM  //
// //////////////////////////////////////////////////////////// //

/*** "mongoose" ORM for MongoDB and "fs" for loading mongoose models ***/

var mongoose = require('mongoose');
var fs = require('fs');

var dbURI = 'mongodb://localhost/application_server'

mongoose.connect(dbURI)

var db = mongoose.connection;

db.on('error', function ( err ) {
  console.log('Mongoose default connection error: ' + err);
});

db.on('connected', function( ) {
    console.log('Mongoose default connection open to ' + dbURI);
}); 

db.on('disconnected', function ( ) {
  console.log('Mongoose default connection disconnected')
});

process.on('SIGINT', function () {
  db.close( function ( ) { 
    console.log('Mongoose default connection disconnected through app termination')
    process.exit(0)
  });
});

/* load all files in "/models/" directory */
fs.readdirSync(__dirname + '/models').forEach(function(filename) {
  if (~filename.indexOf('.js')) { 
  	require(__dirname + '/models/' + filename); 
  	console.log('loaded '+filename);
  }
});

module.exports = db;