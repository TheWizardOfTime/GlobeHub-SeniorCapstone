///////////////////////////////////////////////////
//  A THREE loader module for this application   //
///////////////////////////////////////////////////

var textureMap;

function makeEarthSphere( r , s , b , callback ) {
    
    var earthGeo = new THREE.SphereGeometry( r , s , s );
    
    var earthMaterial = new THREE.MeshPhongMaterial( {
        
        map : textureMap[ 'earthSurface' ],
        bumpMap : textureMap[ 'earthBump' ],
        specularMap : textureMap[ 'earthSpecular' ],
        specular : new THREE.Color( 'grey' ),
        bumpScale : b
        
    } );

    if(  callback && typeof( callback ) === "function" && ( earthGeo !== 'undefined' && earthMaterial !== 'undefined' ) ) {

        console.log('earth-surface!')
        callback( new THREE.Mesh( earthGeo , earthMaterial ));
    }
}

// function makeEarthSphere( r , s , callback ) {

//     var surfaceGeo = new THREE.SphereGeometry( r , s , s);

//     // Create the "lookup texture", which contains a colored pixel for each country 
//     //  -- the pixel at (x,1) is the color of the country labelled with gray RGB_Color(x,x,x,1).

//     var lookupCanvas = document.createElement('canvas');    
//     lookupCanvas.width = 256;
//     lookupCanvas.height = 1;
//     lookupContext = lookupCanvas.getContext('2d');
//     lookupTexture = new THREE.Texture( lookupCanvas );
//     lookupTexture.magFilter = THREE.NearestFilter;
//     lookupTexture.minFilter = THREE.NearestFilter;
//     lookupTexture.needsUpdate = true;

//     textureMap['earthGreyIndex'].magFilter = THREE.NearestFilter;
//     textureMap['earthGreyIndex'].migFilter = THREE.NearestFilter;
//     textureMap['earthGreyIndex'].needsUpdate = true;
//     textureMap['earthOutline'].needsUpdate = true;

//     var surfaceMaterial = new THREE.ShaderMaterial(
//         {
//             uniforms:
//             {
//                 width:      { type: "f", value: window.innerWidth },
//                 height:     { type: "f", value: window.innerHeight },
//                 mapIndex:   { type: "t", value: textureMap['earthGreyIndex'] },
//                 outline:    { type: "t", value: textureMap['earthOutline'] },
//                 lookup:     { type: "t", value: lookupTexture },
//                 blendSurface: { type: "t", value: textureMap['earthSurface'] }
//             },
//             vertexShader:   document.getElementById( 'globeVertexShader'   ).textContent,
//             fragmentShader: document.getElementById( 'globeFragmentShader' ).textContent
//         }
//     );

//     console.log('okay!');

//      if( callback && typeof( callback ) === "function" && ( surfaceGeo !== 'undefined' && surfaceMaterial !== 'undefined' ) ) {
//         console.log("made the surface!");
//         callback(new THREE.Mesh( surfaceGeo , surfaceMaterial ) );
//     }
// }

function makeEarthCulturalSphere( r , s , callback ) {
    
    var culturalGeo = new THREE.SphereGeometry( r , s , s );
    
    var culturalMaterial = new THREE.MeshBasicMaterial( {

        map : textureMap['earthCultural'],
        transparent : true
        
    } );

    if( callback && typeof( callback ) === "function" && ( culturalGeo !== 'undefined' && culturalMaterial !== 'undefined' ) ) {
        callback(new THREE.Mesh( culturalGeo , culturalMaterial ) );
    }
}

function makeEarthCloudSphere( r , s , callback ) {

    var cloudGeo = new THREE.SphereGeometry( r , s , s );
    
    var cloudMaterial = new THREE.MeshBasicMaterial ( {
        
        map: textureMap['earthCloud'],
        transparent : true
        
    });

    if(callback && typeof(callback) === "function" && ( cloudGeo !== 'undefined' && cloudMaterial !== 'undefined' ) ) {
        callback(new THREE.Mesh( cloudGeo , cloudMaterial ) );
    }
}

function makeMoonSurface ( r , b, callback ) {

    var moonGeo = new THREE.SphereGeometry( r , 12 , 12);
    
    var moonMaterial = new THREE.MeshPhongMaterial({
        
        map : textureMap['moonSurface'],
        bumpMap : textureMap['moonBump'],
        bumpScale : b

    });

    if( callback && typeof( callback ) === "function" && ( moonGeo !== 'undefined' && moonMaterial !== 'undefined') ) {
        callback( new THREE.Mesh( moonGeo, moonMaterial ) )
    }
}

function makeEarthHalo ( mesh ) {
    
    var glowMesh = new THREEx.GeometricGlowMesh( mesh );
    
    var outsideUniforms = glowMesh.outsideMesh.material.uniforms;
        outsideUniforms.glowColor.value = new THREE.Color( 0xffffff ) ;
        outsideUniforms.coeficient.value = 0.04;
        outsideUniforms.power.value = 1.5;

    mesh.add( glowMesh.object3d );
    return mesh;
    
}

function makeMoonHalo ( mesh ) {
    
    var glowMesh = new THREEx.GeometricGlowMesh( mesh );
    
    var outsideUniforms = glowMesh.outsideMesh.material.uniforms;
        outsideUniforms.glowColor.value = new THREE.Color( 0xffffff ) ;
        outsideUniforms.coeficient.value = 0.04;
        outsideUniforms.power.value = 5.0;

    mesh.add(glowMesh.object3d);
    return mesh;

}

function createSkyDome ( callback ) {
    
    var domeGeo = new THREE.SphereGeometry( 96 , 64 , 64 );
    
    var domeMaterial = new THREE.MeshBasicMaterial( {
        
        map : textureMap[ 'skyDome' ],
        side : THREE.BackSide
        
    } );

    if( callback && typeof( callback ) === "function") { 
        callback( new THREE.Mesh( domeGeo , domeMaterial ) );
    }   
}


function createEarth( r , s , b , callback ) {

    var earthObject = {} ;

        makeEarthSphere( r , s , b, function ( earthSurface ) {

            earthObject.surface = earthSurface;
            earthObject.atmosphere = makeEarthHalo ( earthObject.surface )

        } );

        makeEarthCulturalSphere( r + 0.003 , s+4 , function ( earthCulture ) {

            earthObject.culture = earthCulture;

        } );

        makeEarthCloudSphere( r + 0.009 , s+4 , function ( earthClouds ) {

            earthObject.clouds =  earthClouds;

        } );
        
    if( callback && typeof( callback ) === "function" && Object.size( earthObject ) == 4 ) {

        console.log( 'earth-complete!' )
        callback( earthObject )
    }
}

function createMoon( r , b , callback ) {
    
    var moonObject = { };

        makeMoonSurface( r * 0.135 , b , function ( moonSurface ) {

            moonSurface.position.set( 5 , 0 , 0 ); 

            moonObject.surface = moonSurface;

            moonObject.atmosphere = makeMoonHalo ( moonSurface );

            moonObject.atmosphere.position.set( 5 , 0 , 0 );

        } );

    if( callback && typeof( callback ) === "function" && Object.size( moonObject ) == 2 ) {

        console.log( 'moon-complete!' )
        callback( moonObject )
    } 
}

function createSun( callback ) {
    var flareColor = new THREE.Color( 0xffffff );
    flareColor.setHSL( 0.55, 0.9, 0.5 + 0.5 );

    var lensFlareSun = new THREE.LensFlare( textureMap['lensflare0'], 700, 0.0, THREE.AdditiveBlending, flareColor );

    lensFlareSun.add( textureMap['lensflare2'], 512, 0.0, THREE.AdditiveBlending );
    lensFlareSun.add( textureMap['lensflare2'], 512, 0.0, THREE.AdditiveBlending );
    lensFlareSun.add( textureMap['lensflare2'], 512, 0.0, THREE.AdditiveBlending );

    lensFlareSun.add( textureMap['lensflare3'], 60, 0.6, THREE.AdditiveBlending );
    lensFlareSun.add( textureMap['lensflare3'], 70, 0.7, THREE.AdditiveBlending );
    lensFlareSun.add( textureMap['lensflare3'], 120, 0.9, THREE.AdditiveBlending );
    lensFlareSun.add( textureMap['lensflare3'], 70, 1.0, THREE.AdditiveBlending );

    if( callback && typeof( callback ) === "function" && lensFlareSun != 'undefined' ) {

        console.log( 'sun-complete!' )
        callback( lensFlareSun );
    } 
}

function modelsCheck ( modelsObject , callback ) {


    if( callback && typeof( callback ) === "function" && Object.size(modelsObject) === 3 ) {

        callback( modelsObject , true )
    }    
} 

Object.size = function( obj ) {
   var size = 0, key;
   for ( key in obj ) {
       if ( obj.hasOwnProperty( key ) ) size++;
   }
   return size;
};

function loadModels( o , tm , callback ) {

    console.log('Loading Models...')

    textureMap = tm;

    var mod = {} ;

    var radius = o.radius;
    var segments = o.segments;
    var bump = o.bump;

    createEarth( radius , segments , bump , function ( earth ) {
        // createMoon( radius , bump , function ( moon ) {
        //     mod.moon = moon;
            mod.earth = earth;
            createSkyDome( function ( universe ) { 
                mod.universe = universe ;
                createSun( function ( sunFlare ) { 
                    mod.sunFlare =  sunFlare ;
                    modelsCheck ( mod, function ( modelsOBJ, result ) {
                        if( callback && typeof( callback ) === "function" && result ) callback( modelsOBJ );
                    });
                });
            });
        // });
    });
}