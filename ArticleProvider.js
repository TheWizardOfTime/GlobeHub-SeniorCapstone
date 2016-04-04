//ArticleProvider.js

var db = require('./database');

var ArticleProvider = function () {
	this.db.open(function(){});
}

ArticleProvider.prototype.getCollection = function(callback){
	this.db.collection('articles', function(error, article_collection) {
		if(error) callback(error);
		else callback(null, Article_collection);
	});
};

ArticleProvider.prototype.findAll = function(callback){
	this.getCollection( function(error, article_collection) {
		if(error) callback(error)
		else{
			article_collection.find().toArray( function(error, results){
				if(error) callback(error)
				else callback(null, results)
			});
		}
	});
};

ArticleProvider.prototype.save = function(article, callback) {
    this.getCollection(function(error, article_collection) {
      if( error ) callback(error)
      else {
        article_collection.insert(article, function() {
          callback(null, article);
        });
      }
    });
};

ArticleProvider.prototype.delete = function(articleId, callback){
	console.log("Deleting record # " + articleId);
	this.getCollection( function(error, article_collection){
		if(error) callback(error)
		else{
			Article_collection.remove(
				{_id: article_collection.db.bson_serializer.ObjectID.createFromHexString(articleId)},
                                function(error, article){
                                        if(error) callback(error);
                                        else callback(null, article)
                                });
		}
	});
};

module.exports = ArticleProvider;