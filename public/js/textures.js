
var fileArray = [   {name :'earthSurface' , url : 'earth_no_ice_clouds.jpg', message : 'textureing earth surface'},
                    {name :'earthBump', url : 'earth_bump.jpg', message : 'textureing land contour'},
                    {name :'earthSpecular' ,url : 'earth_specular.png', message : 'textureing specular surface'},
                    {name :'earthCloud', url : 'earth_clouds.png', message : 'textureing clouds'},
                    {name :'earthOutline', url: 'earth_out_line.png', message: 'textureing outline'},
                    {name :'earthGreyIndex', url: 'index_shifted_grey.png', message: 'textureing greyscale index'},
                    {name :'moonSurface', url : 'moon.jpg', message :'textureing lunar surface'},
                    {name :'moonBump', url : 'moon_bump.jpg', message : 'textureing lunar contour'},
                    {name :'skyDome', url : 'galaxy_3.png', message : 'textureing sky box'},
                    {name :'lensflare0', url :'lensflare0.png', message : ' flaring...' },
                    {name :'lensflare2', url :'lensflare2.png', message : ' flaring...' },
                    {name :'lensflare3', url :'lensflare3.png', message : ' flaring...' },
                ];

Object.size = function( obj ) {
   var size = 0, key;
   for ( key in obj ) {
       if ( obj.hasOwnProperty( key ) ) size++;
   }
   return size;
};

function loadTextures( callback ) {
    console.log( 'Loading Textures...' ) 
    var manager = new THREE.LoadingManager();
    manager.onProgress = function ( item, loaded, total ) {
        console.log( item, loaded, total );

    };
    var loader = new THREE.TextureLoader( manager );
    loader.crossOrigin = '';

    var promiseArray = [],
        path = './textures/';
    fileArray.forEach( function ( fileOBJ ) {

        promiseArray.push ( new Promise( function ( resolve , reject ) {

                loader.load(

                    path+fileOBJ.url ,

                    function ( texture ) {

                        // console.log( texture );

                        var modelOBJ = new Object();

                        modelOBJ['name'] = fileOBJ.name
                        modelOBJ['tex'] = texture;

                        if( modelOBJ['tex'] instanceof THREE.Texture ) resolve( modelOBJ )
                
                    },

                    function ( xhr ) {

                        if ( xhr.lengthComputable ) {

                            var percentComplete = xhr.loaded / xhr.total * 100;
                            console.log( Math.round(percentComplete, 2) + '% downloaded' );

                        }
                    },


                    function ( xhr ) {


                        reject( new Error ( xhr + 'An error occurred loading while loading' + fileOBJ.url ) )

                    }
                ) 

        } ) );

    } )

    Promise.all( promiseArray )

    .then( 

        function ( textures ) {

            var textureMap = new Object();

            for( var i in textures ) {

                textureMap[ textures[ i ][ 'name' ] ] = textures[ i ][ 'tex' ]
            }

            if( callback && typeof( callback ) === "function" && fileArray.length == Object.size( textureMap ) ) callback( textureMap )

        },
            function ( error ) {

                callback( error )
        })
}