var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var articleSchema = require('./article');

var pocketSchema = new Schema(
	{
		name: String,
		articles: [ {type: Schema.Types.ObjectId, ref: 'Article'} ],
		created: { type: Date, 'default': Date.now },
		owner: { type: Schema.Types.ObjectId, ref: 'User'}
	},
		{collection:'pockets'}
);

module.exports = mongoose.model( 'Pocket' , pocketSchema );
