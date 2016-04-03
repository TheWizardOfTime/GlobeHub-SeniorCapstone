/////////////////////////////////////////////////////////////////////
//   This code was adapted from the chrome-arms-globe-experiemnt   //
/////////////////////////////////////////////////////////////////////

function lookUpHelper ( callback ) {

lookupCanvas = document.createElement('canvas');    
    lookupCanvas.width = 256;
    lookupCanvas.height = 1;
    
    lookupTexture = new THREE.Texture( lookupCanvas );
    lookupTexture.magFilter = THREE.NearestFilter;
    lookupTexture.minFilter = THREE.NearestFilter;
    lookupTexture.needsUpdate = true;

    var indexedMapTexture = new THREE.Texture( mapIndexedImage );
    //THREE.ImageUtils.loadTexture( 'images/map_indexed.png' );
    indexedMapTexture.needsUpdate = true;
    indexedMapTexture.magFilter = THREE.NearestFilter;
    indexedMapTexture.minFilter = THREE.NearestFilter;

    var outlinedMapTexture = new THREE.Texture( mapOutlineImage );
    outlinedMapTexture.needsUpdate = true;
    // outlinedMapTexture.magFilter = THREE.NearestFilter;
    // outlinedMapTexture.minFilter = THREE.NearestFilter;

    var uniforms = {
        'mapIndex': { type: 't', value: 0, texture: indexedMapTexture  },       
        'lookup': { type: 't', value: 1, texture: lookupTexture },
        'outline': { type: 't', value: 2, texture: outlinedMapTexture },
        'outlineLevel': {type: 'f', value: 1 },
    };
    mapUniforms = uniforms;

    var shaderMaterial = new THREE.ShaderMaterial( {

        uniforms:       uniforms,
        // attributes:     attributes,
        vertexShader:   document.getElementById( 'globeVertexShader' ).textContent,
        fragmentShader: document.getElementById( 'globeFragmentShader' ).textContent,
        // sizeAttenuation: true,
    });
}