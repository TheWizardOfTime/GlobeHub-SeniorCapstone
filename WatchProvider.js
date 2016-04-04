//WatchProvider.js

var db = require('./database');

var WatchProvider = function () {
	this.db.open(function(){});
}

WatchProvider.prototype.getCollection = function(callback){
	this.db.collection('watches', function(error, watch_collection) {
		if(error) callback(error);
		else callback(null, watch_collection);
	});
};

WatchProvider.prototype.findAll = function(callback){
	this.getCollection( function(error, watch_collection) {
		if(error) callback(error)
		else{
			watch_collection.find().toArray( function(error, results){
				if(error) callback(error)
				else callback(null, results)
			});
		}
	});
};

WatchProvider.prototype.save = function(watch, callback) {
    this.getCollection(function(error, watch_collection) {
      if( error ) callback(error)
      else {
        watch_collection.insert(watch, function() {
          callback(null, watch);
        });
      }
    });
};

WatchProvider.prototype.delete = function(watchId, callback){
	console.log("Deleting record # " + watchId);
	this.getCollection( function(error, watch_collection){
		if(error) callback(error)
		else{
			watch_collection.remove(
				{_id: watch_collection.db.bson_serializer.ObjectID.createFromHexString(watchId)},
                                function(error, watch){
                                        if(error) callback(error);
                                        else callback(null, watch)
                                });
		}
	});
};

module.exports = WatchProvider;