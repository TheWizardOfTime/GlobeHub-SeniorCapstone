// //////////////////////////////////// //
//  Web-Scraping tool for application   //
// //////////////////////////////////// //

/**
 * Module dependencies.
 */

/*** Load cheerio (DOM traversal) ***/
var cheerio = require('cheerio');

/*** Load request (URL connection) ***/
var request = require('request');

/* check for valid server response (implement a method to save DOM schemas ) */

function checkResponse( uri , response , html , callback ) {

    console.log( 'checking ' + uri )

    var success = false;

    if ( response[ 'statusCode' ] === 200) {

        success = true;

         console.log( response[ 'statusCode' ] + ' OK Connection Successful' );

        var $ = cheerio.load( html );

        if(  callback && typeof( callback ) === "function" && typeof ( $ ) === 'function' && success ) callback ( $ )

    } else if( typeof response == 'undefined') {

        callback( console.log( 'Connection to ' + uri + 'Timed Out' ) );

    }
}

/**
 * Web-Scraping Module
 */

var webscraper = ( function( ) {

    return {
        getNewsNow: function (uri, callback) {

            return new Promise(function (resolve, reject) {
                var options = {
                    method: 'GET',
                    url: 'http://www.newsnow.co.uk/h/' + uri
                };

                console.log( 'making request to ' + options.url )

                request( options.url, function ( error , response , html ) {

                    if ( error ) reject( console.error( error ) );

                    checkResponse( options.url , response , html , function ( $ ) {

                        $body = $('body');
                        $newsfeed = $body.find('.newsfeed');
                        $news = $newsfeed.find('.hl');

                        var newslist = [];

                        $news.each(function (i, item) {
                            var $meta = $(item).find('.meta');
                            newslist.push(new Object(
                                {
                                    Title: $(item).find('.hll').text(),
                                    Article: 'http://www.newsnow.co.uk' + $(item).find('.hll').attr('href'),
                                    Publisher: $meta.find('.src').text(),
                                    Origin: $(item).find('span').attr('c'),
                                    Time: $meta.find('.time').text()
                                }
                            ));
                        });

                        if (callback && typeof( callback ) === "function" && newslist !== 'undefined') resolve( callback( newslist ) );
                    })
                });
            });
        },

        getProfileIM: function (im_name , callback ) {
            return new Promise( function ( resolve , reject ) {

                var options = {
                    method: 'GET',
                    url: 'http://www.indexmundi.com/factbook/countries'
                };

                console.log( 'making request to ' + options.url )

                request( options.url , function ( error , response , html ) {

                    if ( error ) reject( console.error( error ) );

                    console.log('Attempting to load data...');

                    checkResponse( options.url , response , html , function ( $ ) {

                        $body = $('body');
                        $unit = $body.find( 'td' );
                        $unit.each( function ( i , unit ) {
                            if ( im_name == $( unit ).text( ) ) {
                                var link = 'http://www.indexmundi.com' + $( unit ).find( 'a' ).attr( 'href' );

                                console.log( link )

                                if(  callback && typeof( callback ) === "function" && link !== 'undefined' ) resolve( callback( link ) );
                            }
                        });
                    });
                });
            });
        },

        getProfileBBC: function( bbc_name ,callback ) {

            return new Promise( function ( resolve , reject ) {

                var options = {
                    method: 'GET',
                    url: 'http://news.bbc.co.uk/2/hi/country_profiles/default.stm'
                };

                console.log( 'making request to ' + options.url )

                request( options.url , function ( error, response , html ) {

                    if ( error ) reject( console.error( error ) );

                    console.log('Attempting to load data...');

                    checkResponse ( options.url , response , html , function ( $ ) {

                        $body = $('body');
                        $tables = $body.find('div #blq-container-inner');
                        $list = $tables.find('select.formatStyle');

                        var match_list_TC=[13,11,10,9,8,7,6,5,4,3,2,1,0];

                        /* We dont want the 12th element because it does not contain Countries or Territories
                         *  But instead internation organizations
                         */

                        $list.each( function ( i , ele ) {

                            for( var j = match_list_TC.length-1 ; j>=0 ; j-- ) {

                                if( i == match_list_TC[ j ] ) {

                                    $option = $( ele ).find( 'option' );

                                    $option.each( function ( q , option ) {

                                        if( ( $( option ).text( ).replace( /^\s*|\s*$/g,'' ) ) == bbc_name ) {

                                            var link = $( option ).attr( 'value' );

                                            if(  callback && typeof( callback ) === "function" && link !== 'undefined' ) resolve( callback( link ) );
                                        }
                                    });
                                }
                            }
                        });
                    });
                });
            });
        }
    }
}());

module.exports = webscraper;
