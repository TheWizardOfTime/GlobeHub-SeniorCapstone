//User information model

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var watchlistSchema = require('./watch');
// var pocketSchema = require('./pocket');

var UserSchema = new Schema(
	{  
	    username: { type:String, required: true, unique: true },
	    password: { type:String, required: true },
	    pocket: [ {type: Schema.Types.ObjectId, ref: 'Pocket'} ],
	    watchlist: [ {type: Schema.Types.ObjectId, ref: 'Watch'} ],
	    createdAt: { type: Date, 'default': Date.now },
	},
		{collection: 'users'}
);

module.exports = mongoose.model( 'User' , UserSchema );
