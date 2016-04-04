#!/usr/bin/env node

// //////////////////////////////////////////////////////////// //
//  Globehub Database Code - Running MongoDB with Mongoose ORM  //
// //////////////////////////////////////////////////////////// //

/*** "mongoose" ORM for MongoDB and "fs" for loading mongoose models ***/

var mongoose = require('mongoose');
var fs = require('fs');

var dbURI = 'mongodb://localhost/application_server';

mongoose.connect(dbURI);


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

// db.prototype.getCollection = function(callback){
//   this.db.collection('users', function(error, user_collection) {
//     if(error) callback(error);
//     else callback(null, user_collection);
//   });
// };

/**
 * Get methods for the Database
 */

// db.prototype.getArticle = function(callback){
//   this.db.collection('Article', function(error, article_collection) {
//     if(error) callback(error);
//     else callback(null, article_collection);
//   });
// };

// db.prototype.getPocket =  function(callback){
//     this.db.collection('Pocket', function(error, pocket_collection) {
//     if(error) callback(error);
//     else callback(null, pocket_collection);
//   });
// };

// db.prototype.getWatch = function(callback){
//   this.db.collection('Watch', function( error, watch_collection) {
//     if(error) callback(error);
//     else callback(null, watch_collection);
//   });
// };

// /**
//  * save methods for the Database
//  */


// db.prototype.saveToPocket = function(article, callback) {
//     this.getPocket(function(error, pocket_collection) {
//       if( error ) callback(error)
//       else {
//         pocket_collection.insert(article, function() {
//           callback(null, article);
//         });
//       }
//     });
// };

// db.prototype.saveToWatch = function(watch, callback) {
//   this.getWatch(function(error, watch_collection) {
//     if( error ) callback(eror)
//     else {
//       article_collection.insert(watch, function() {
//         callback(null, watch);
//       });
//     }
//   });
// }

// /**
//  * Delete methods for the Database
//  */

// db.prototype.deleteWatch = function(watchId, callback) {
//   console.log("Deleting record # " + watchId);
//   this.getWatch( function(error, watch_collection){
//     if(error) callback(error)
//     else{
//       watch_collection.remove(
//         {_id: watch_collection.db.bson_serializer.ObjectID.createFromHexString(watchId)},
//                                 function(error, watch){
//                                         if(error) callback(error);
//                                         else callback(null, watch)
//                                 });
//     }
//   });
// }

// db.prototype.deletePocket = function(pocketId, callback) {
//   console.log("Deleting record # " + pocketId);
//   this.getPocket( function(error, pocket_collection){
//     if(error) callback(error)
//     else{
//       pocket_collection.remove(
//         {_id: pocket_collection.db.bson_serializer.ObjectID.createFromHexString(pocketId)},
//                                 function(error, pocket){
//                                         if(error) callback(error);
//                                         else callback(null, pocket)
//                                 });
//     }
//   });
// }

// db.prototype.deleteArticle = function(articleId, callback) {
//   console.log("Deleting record # " + pocketId);
//   this.getArticle( function(error, article_collection){
//     if(error) callback(error)
//     else{
//       article_collection.remove(
//         {_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
//                                 function(error, article){
//                                         if(error) callback(error);
//                                         else callback(null, article)
//                                 });
//     }
//   });
// }  

module.exports = db;