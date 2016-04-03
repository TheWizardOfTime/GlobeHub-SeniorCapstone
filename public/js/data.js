var filesArray = ['./json/coordinates.json','./json/lookup.json']


function loadJSON ( file , callback ) {

    var xmlobj = new XMLHttpRequest( );

    xmlobj.open( 'GET', file , true );

    xmlobj.onreadystatechange = function ( ) {

        if ( xmlobj.readyState == 4 && xmlobj.status == "200" ) {

            if ( callback && typeof( callback ) === "function" ) callback( xmlobj.responseText );

        }
    };

    xmlobj.send( null );

}

function loadData( callback ) {

    var data = { }

    filesArray.forEach( function ( file ) {

        loadJSON( file , function ( response ) {

            console.log( typeof response )

            var dataObject = JSON.parse( response )

            console.log( typeof dataObject )

            if ( dataObject['countries'] ) {

                data.coordinateData = dataObject;

                if ( callback && typeof( callback ) === "function" && Object.size( data ) == 2 ) callback( data )
            } else if ( dataObject['lookup'] ) {
                
                data.lookupData = dataObject;

                if ( callback && typeof( callback ) === "function" && Object.size( data ) == 2 ) callback( data )
            }
        } );
    } )
}