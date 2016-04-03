var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var articleSchema = new Schema({
	title: { type:String },
	article: { type:String },
	publisher: { type:String },
	origin: { type:String },
	time: { type:String },
	created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model( 'Article' , articleSchema );
