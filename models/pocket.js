var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var articleSchema = require('./article');

var pocketSchema = new Schema({
	name: String,
	articles: [ articleSchema ],
	created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model( 'Pokect' , pocketSchema );
