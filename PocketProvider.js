//PocketProvider.js

var db = require('./database');


var PocketProvider = function (host, port) {
	this.db.open(function(){});
}

PocketProvider.prototype.getCollection = function(callback){
	this.db.collection('pockets', function(error, pocket_collection) {
		if(error) callback(error);
		else callback(null, pocket_collection);
	});
};

PocketProvider.prototype.findAll = function(callback){
	this.getCollection( function(error, pocket_collection) {
		if(error) callback(error)
		else{
			pocket_collection.find().toArray( function(error, results){
				if(error) callback(error)
				else callback(null, results)
			});
		}
	});
};

PocketProvider.prototype.save = function(pocket, callback) {
    this.getCollection(function(error, pocket_collection) {
      if( error ) callback(error)
      else {
        pocket_collection.insert(pocket, function() {
          callback(null, pocket);
        });
      }
    });
};

PocketProvider.prototype.delete = function(pocketId, callback){
	console.log("Deleting record # " + pocketId);
	this.getCollection( function(error, pocket_collection){
		if(error) callback(error)
		else{
			pocket_collection.remove(
				{_id: pocket_collection.db.bson_serializer.ObjectID.createFromHexString(pocketId)},
                                function(error, pocket){
                                        if(error) callback(error);
                                        else callback(null, pocket)
                                });
		}
	});
};

module.exports = PocketProvider;