var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var watchSchema = new Schema(
	{
		country: { type:String },
		created: { type: Date, 'default': Date.now },
		owner: { type: Schema.Types.ObjectId, ref: 'User'}
	},
		{collection: 'watches'}
);

module.exports = mongoose.model( 'Watch' , watchSchema );
