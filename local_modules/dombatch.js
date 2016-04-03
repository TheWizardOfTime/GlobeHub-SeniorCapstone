// ///////////////////////////////////// //
//  Check the DOM for Web-Scraping tool  //
// ///////////////////////////////////// //

/**
 * Module dependencies.
 */

/*** Load cheerio (DOM traversal) ***/
var cheerio = require('cheerio');

/*** Load request (URL connection) ***/
var request = require('request');


function checkResponse( uri , response , html , callback ) {

	var $;

	if ( response[ 'statusCode' ] === 200) {

		success = true;
		console.log( uri +" : "+response[ 'statusCode' ] + ' OK Connection Successful' );
		$ = cheerio.load( html );

		if(  callback && typeof( callback ) === "function" ) callback ( $ )

	} else if( typeof response == 'undefined') {

		callback( $ );
	}
}

var validation = ( function() {

	return {
		checkNewsNow: function (uri, callback) {
			return new Promise(function (resolve, reject) {

				var options = {
					method: 'GET',
					url: 'http://www.newsnow.co.uk/h/' + uri
				};

				request( options.url, function (error,response,html) {

					if (error) reject(console.error( error ));

					checkResponse( options.url , response , html , function ( $ ) {

						if( typeof ( $ ) !== 'function' ) reject( callback( console.log( 'Connection to ' + options.url + 'Timed Out' ) ) );

						$body = $( 'body' );
						if ( $body.find('.newsfeed').length != 0 ) {
							$newsfeed = $body.find('.newsfeed');
							if( $newsfeed.find('.hl').length != 0 ) {
								if ( callback && typeof( callback ) === "function") resolve( callback( true ) );
							} else { reject( callback( false ) ) }
						} else { reject( callback( false ) ) }
					});
				});
			});
		},

		checkProfileIM: function (im_name , callback ) {
			return new Promise( function ( resolve , reject ) {

				var options = {
					method: 'GET',
					url: 'http://www.indexmundi.com/factbook/countries'
				};

				request( options.url , function ( error , response , html ) {

					if ( error ) reject( console.error( error ) );

					checkResponse( options.url , response , html , function ( $ ) {

						if( typeof ( $ ) !== 'function' ) reject( callback( console.log( 'Connection to ' + options.url + 'Timed Out' ) ) );

						$body = $('body');
						if( $body.find('td').length != 0 ) {
							$unit = $body.find( 'td' );
							if( $unit[0].attribs['style'] =='border-bottom:1px solid #cfcfcf;padding:5px'){
								if(  callback && typeof( callback ) === "function") resolve( callback( true ) );
							}else{ reject( callback( false ) ) }
						} else{ reject( callback( false ) ) }
					});
				});
			});
		},

		checkProfileBBC: function( bbc_name ,callback ) {
			return new Promise( function ( resolve , reject ) {

				var options = {
					method: 'GET',
					url: 'http://news.bbc.co.uk/2/hi/country_profiles/default.stm'
				};

				request( options.url , function ( error, response , html ) {

					if ( error ) reject( console.error( error ) );

					checkResponse ( options.url , response , html , function ( $ ) {

						if( typeof ( $ ) !== 'function' ) reject( callback( console.log( 'Connection to ' + options.url + 'Timed Out' ) ) );

						$body = $('body');
						if( $body.find('div #blq-container-inner').length != 0 ) { 
							$tables = $body.find('div #blq-container-inner');
							if( $tables.find('select.formatStyle') !=0 ) {
								$list = $tables.find('select.formatStyle');
								if($list[0].attribs['name'] == 'link' && $list[0].attribs['class'] == 'formatStyle' && $list.find('option').length != 0){
									if(  callback && typeof( callback ) === "function") resolve( callback( true ) );
								}else { reject( callback( false ) ) };
							} else { reject( callback( false ) ) }
						} else { reject( callback( false ) ) }
					});
				});
			});
		}
	}
}());

Object.size = function( obj ) {
   var size = 0, key;
   for ( key in obj ) {
	   if ( obj.hasOwnProperty( key ) ) size++;
   }
   return size;
};

/* The current method of validation involves checking hard-coded urls.
 * If the validation methods return true, then the DOM has not changed and the applicaiton
 * is set to be used by a client. Otherwise, the relevant parts of the DOM of the target sites 
 * has changed, and therefore the webscrapers will need to be redeveloeped inorder to being using 
 * the application for production.
 */

function validateUrls ( obj  , callback ) {

	var message = true;

	if( Object.size( obj ) === 3 ) {
		count = 0;
		for( key in obj ) {
			if( obj[ key ] === true ) {
				console.log( key + " has been ok'd for production. " );
				count++;
			} else {
				console.log( key + " is not ready to be used in production. " );
				message = false;
				count++;
			}
		}
		if(callback && typeof( callback ) === "function" && count === Object.size( obj ) ) callback( message );
	}
}

/**
 * Validation Module
 */

var v = ( function() {

	return {
		validate : function (callback) {

			var validationOBJ = {};

			validation.checkNewsNow( "World+News/Africa/Angola" , function( response ) {
				validationOBJ.NewsNow = response;
				validation.checkProfileIM( "Angola", function ( response ) {
					validationOBJ.IndexMundi = response;
					validation.checkProfileBBC( "Angola", function ( response ) {
						validationOBJ.BBC = response;
						validateUrls( validationOBJ , function (response) {
							if( callback && typeof( callback ) === "function") callback( response )
						});
					});
				});
			});
		}
	}
}());

module.exports = v;