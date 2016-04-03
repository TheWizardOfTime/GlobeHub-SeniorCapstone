/////////////////////////////////////////////////////////////////////
//   This code was adapted from the chrome-arms-globe-experiemnt   //
/////////////////////////////////////////////////////////////////////

function lookupModelHelper ( r, s, tm, callback ) {

//     var lookupCanvas, lookupTexture;

//     lookupCanvas = document.createElement('canvas');    
//     lookupCanvas.width = 256;
//     lookupCanvas.height = 1;
    
//     lookupTexture = new THREE.Texture( lookupCanvas );
//     lookupTexture.magFilter = THREE.NearestFilter;
//     lookupTexture.minFilter = THREE.NearestFilter;
//     lookupTexture.needsUpdate = true;

//     var indexedMapTexture = tm[ 'earthIndexedTex' ];

//     indexedMapTexture.needsUpdate = true;
//     indexedMapTexture.magFilter = THREE.NearestFilter;
//     indexedMapTexture.minFilter = THREE.NearestFilter;

//     var outlinedMapTexture = tm[ 'earthCultureTex' ];
//     outlinedMapTexture.needsUpdate = true;

//     var uniforms = {
//         'mapIndex': { type: 't', value: 0, texture: indexedMapTexture  },       
//         'lookup': { type: 't', value: 1, texture: lookupTexture },
//         'outline': { type: 't', value: 2, texture: outlinedMapTexture },
//         'outlineLevel': {type: 'f', value: 1 },
//     };

//     var lookUpGeometry = new THREE.SphereGeometry ( r , s , s )

//     var lookupShaderMaterial = new THREE.ShaderMaterial( {

//         uniforms:       uniforms,
//         vertexShader:   document.getElementById( 'globeVertexShader' ).textContent,
//         fragmentShader: document.getElementById( 'globeFragmentShader' ).textContent,

//     });
    
//     // var lookupShaderMaterial = new THREE.MeshBasicMaterial( );

//     // console.log(lookUpGeometry)
//     // console.log(lookUpShaderMaterial)
//     // console.log(uniforms)

//     if( callback && typeof( callback ) === "function" && ( lookUpGeometry !== 'undefined' && lookupShaderMaterial !== 'undefined' && mapUniforms !== 'undefined') ) {
//         callback(new THREE.Mesh( lookUpGeometry , lookupShaderMaterial ), uniforms );
//     }
// }

    // Create the "lookup texture", which contains a colored pixel for each country 
    //  -- the pixel at (x,1) is the color of the country labelled with gray RGB_Color(x,x,x,1).
    lookupCanvas = document.createElement('canvas');    
    lookupCanvas.width = 256;
    lookupCanvas.height = 1;
    lookupContext = lookupCanvas.getContext('2d');
    lookupTexture = new THREE.Texture( lookupCanvas );
    lookupTexture.magFilter = THREE.NearestFilter;
    lookupTexture.minFilter = THREE.NearestFilter;
    lookupTexture.needsUpdate = true;
    
    var mapIndexTexture = tm[ 'earthIndexedTex' ]
    mapTexture.magFilter = THREE.NearestFilter;
    mapTexture.minFilter = THREE.NearestFilter;
    mapTexture.needsUpdate = true;
    
    var outlineTexture = 
    outlineTexture.needsUpdate = true;
    
    var blendImage = THREE.ImageUtils.loadTexture("images/earth-day.jpg");
    
    var planeMaterial = new THREE.ShaderMaterial( 
    {
        uniforms:
        {
            width:      { type: "f", value: window.innerWidth },
            height:     { type: "f", value: window.innerHeight },
            mapIndex:   { type: "t", value: mapIndexTexture },
            outline:    { type: "t", value: outlineTexture },
            lookup:     { type: "t", value: lookupTexture },
            blendImage: { type: "t", value: blendImage }
        },
        vertexShader:   document.getElementById( 'globeVertexShader'   ).textContent,
        fragmentShader: document.getElementById( 'globeFragmentShader' ).textContent
    });


// <script id="globeVertexShader" type="x-shader/x-vertex">
// varying vec3 vNormal;
// varying vec2 vUv;
// void main()
// {
//     gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0);
//     vNormal = normalize( normalMatrix * normal );
//     vUv = uv;
// }
// </script>

// <script id="globeFragmentShader" type="x-shader/x-fragment">   
// uniform sampler2D mapIndex;
// uniform sampler2D lookup;
// uniform sampler2D outline;
// uniform sampler2D blendImage;
// varying vec3 vNormal;
// varying vec2 vUv;
// void main() 
// {
//     vec4 mapColor = texture2D( mapIndex, vUv );    
//     float indexedColor = mapColor.y;       
//     vec2 lookupUV = vec2( indexedColor, 0.0 );
//     vec4 lookupColor = texture2D( lookup, lookupUV );                              
//     vec4 outlineColor = texture2D( outline, vUv );
//     vec4 blendColor = texture2D( blendImage, vUv );
//     // if (outlineColor.x > 0.1) outlineColor = vec4(1.0,1.0,1.0,1.0);

    
//     gl_FragColor = 0.5 * outlineColor + 1.0 * lookupColor + 0.5 * blendColor;
// }
}