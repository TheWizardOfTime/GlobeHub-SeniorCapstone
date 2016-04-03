#!/usr/bin/env node

// ////////////////////////////////////// //
//  Analyze schema tool for application   //
// ////////////////////////////////////// //

/**
 * Module dependencies.
 */

/*** Load request (URL connection) ***/
var request = require('request');

/*** Load cheerio for DOM = comparison ***/
var cheerio = require('cheerio');

/*** Load html to JSON converter ***/

var himalaya = require('himalaya');
// var h2j = require('./html2json');

/***"mongoose" ORM for MongoDB and "fs" for loading mongoose models ***/
var mongoose = require('mongoose');
var fs = require('fs');

var urlsArray = [   
                    {name:'indexmundi', url:'http://www.indexmundi.com/factbook/countries'},
                    {name:'bbcnews', url:'http://news.bbc.co.uk/2/hi/country_profiles/default.stm'}
                ]

function checkResponse( uri , response , html , callback ) {

    console.log( 'getting ' + uri )

    var success = false;

    if ( response[ 'statusCode' ] === 200) {

        success = true;

        console.log( 'Connection Successful' );

        var $ = cheerio.load( html );
        var body = $('body').html();
        console.log(typeof body)

        if(  callback && typeof( callback ) === "function" && typeof ( $ ) === 'function' && success ) callback ( body )

    } else if( typeof response == 'undefined') {

        callback( console.log( 'Connection to ' + uri + 'Timed Out' ) );

    }
}

function compareSchema( ) {
	urlsArray.forEach( function ( obj ) {
        var options = {
            'method': 'GET',
            'url': obj.url
        };
        request( options.url , function ( error, response , html ) {

        	if ( error ) reject( console.error( error ) );

            checkResponse( options.url , response , html , function ( body ) {

            	var json = himalaya.parse( body );

                fs.writeFile("../app_server_data/"+obj.name+".json",JSON.stringify(json),function(err) {
                    if(err) {
                        return console.log(err);
                    }
                    console.log("The file was saved!")
                });
            });
        });
    });
}

compareSchema( );
