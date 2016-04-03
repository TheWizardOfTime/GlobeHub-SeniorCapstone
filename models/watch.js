var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var watchSchema = new Schema({
	country: { type:String },
	created: { type: Date, 'default': Date.now }
});

module.exports = mongoose.model( 'Watch' , watchSchema );
