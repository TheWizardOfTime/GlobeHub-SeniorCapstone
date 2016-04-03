// Window params
var width  = window.innerWidth,
    height = window.innerHeight;

// var stats = new Stats();
// stats.setMode( 1 ); // 0: fps, 1: ms, 2: mb

// // align top-left
// stats.domElement.style.position = 'absolute';
// stats.domElement.style.right = '0px';
// stats.domElement.style.top = '0px';

var socket = io.connect();

var options = {
    radius : 1.0,
    segments : 64,
    bump : 0.005
};

var radius   = 1.0,
    segments = 64,
    rotation = 6;

var applicationData;

var scene, camera, renderer, rayCaster, world_coords, markerPos;

var earth, clouds, culture, galaxy, moon, pivot;

var models, texture;

var webglEl = document.getElementById('webgl');

// document.body.appendChild( stats.domElement );

socket.emit( 'initialize' );

function start( ) {
  if ( !Detector.webgl ) {
    Detector.addGetWebGLMessage( webglEl );
    return;
  } else {
    loadTextures( function( tm ) {
      console.log( 'Textures Loaded!' );
      textures = tm;
      loadModels( options , tm , function( m ) {
        console.log( 'Models Loaded!' );
        models = m ;
        loadData( function ( data ) {
          console.log( 'JSON Loaded!' );
          applicationData = data;

          console.log(Object.getOwnPropertyNames(applicationData));
          console.log(applicationData.lookupData)

          initScene( );
          animate( );

        });
      });
    });
  }
}

function initScene( ) {

  scene = new THREE.Scene( );

  rayCaster = new THREE.Raycaster( );

  camera = new THREE.PerspectiveCamera( 60, width / height, 0.01, 100000 );
  camera.position.z = 3.0;

  renderer = new THREE.WebGLRenderer( { antialias: true, alpha: true } );
  renderer.setSize( width , height );

  scene.add( new THREE.AmbientLight( 0x333333 ) );

  var dirLight = new THREE.DirectionalLight( 0xffffff ,  0.05);
  dirLight.position.set( 10 , 6 , 10 );
  dirLight.color.setHSL( 0.1, 0.7, 0.5 );
  scene.add( dirLight );

  var light = new THREE.PointLight( 0xffffff , 1.5 );
  light.position.set( 8 , 5 , 8);
  scene.add( light );

  sunFlare = models.sunFlare;

  sunFlare.position.copy( light.position );

  scene.add(sunFlare);

  // pivot = new THREE.Object3D();
  // moon = models.moon.surface;
  earth = models.earth.surface;

  scene.add(earth)
  // earth.add(pivot)
  // pivot.add(moon)
  
  clouds = models.earth.clouds;
  // culture = models.earth.culture;
  galaxy = models.universe;
  // marker = models.marker;
  
  // scene.add(culture)
  scene.add(clouds)
  scene.add(galaxy)
  // scene.add(marker)

  controls = new THREE.OrbitControls( camera );

  webglEl.appendChild(renderer.domElement);
  // document.body.appendChild( stats.domElement );

  webglEl.addEventListener( 'click' , onLeftClick , false );
  webglEl.addEventListener( 'dblclick' , onLeftDoubleClick , false );
  webglEl.addEventListener( 'mousemove' , onMouseMove, false );

  mapCanvas = document.createElement('canvas');
  mapCanvas.width = 4096;
  mapCanvas.height = 2048;
  mapContext = mapCanvas.getContext('2d');
  var imageObj = new Image();

  imageObj.onload = function() 
  {
        mapContext.drawImage(imageObj, 0, 0);
  };
    imageObj.src = './textures/index_shifted_grey.png';

  render();

  $(document).ready(function() {
    $('body').addClass('loaded');
    setTimeout( function() {
      console.log('removed loader');
      $("#loader-wrapper").remove();
    }, 10000);
  });

}

function updateFull( ){

  earth.rotation.y += 0.0005;
  // culture.rotation.y+= 0.0005;
  clouds.rotation.y -= 0.0002;
  // moon.rotation.y +=0.0005;
  // pivot.rotation.y += 0.0005;

  controls.update( );

  if( camera.position.length() < 300); camera.position.setLength(300);
  if( camera.position.length() > 1000); camera.position.setLength(1000);

}

function render() {

  renderer.clear();
  // earth.rotation.y += 0.0005;
  // earth.position
  // culture.rotation.y+= 0.0005;
  clouds.rotation.y -= 0.0002;
  // moon.rotation.y +=0.0005;
  // pivot.rotation.y += 0.0005;
  controls.update( );
  if (camera.position.length() < 2) camera.position.setLength(2);
  if (camera.position.length() > 10) camera.position.setLength(10); 
  renderer.render( scene , camera );

}

function animate( ) {
  requestAnimationFrame( animate );
  render();
}

function onLeftClick( e ) {

  if ( !e ) var e = window.event;

  e.preventDefault( );

  if ( e.pageX || e.pageY ) {
    var mouseVector = new THREE.Vector3 (

        ( e.pageX / window.innerWidth ) * 2 - 1,

        -( e.pageY / window.innerHeight ) * 2 + 1,

        0.5

    );

    var countryCode = -1;
    rayCaster.setFromCamera( mouseVector, camera );

    var intersections = rayCaster.intersectObject( models.earth.surface );
    if ( intersections.length > 0 ) {

      var rad = intersections[ 0 ].object.geometry.boundingSphere.radius;
      var x = intersections[ 0 ].point.x;
      var y = intersections[ 0 ].point.y;
      var z = intersections[ 0 ].point.z;

      // markerPos = marker.position.set( x , y , z );
    }
  }
}

function onLeftDoubleClick( e ) {

  if ( !e ) var e = window.event;

  e.preventDefault( );

  if ( e.pageX || e.pageY ) {

    var mouseVector = new THREE.Vector3 (
        ( e.pageX / window.innerWidth ) * 2 - 1,
        -( e.pageY / window.innerHeight ) * 2 + 1,
        0.5
    );

    rayCaster.setFromCamera( mouseVector , camera );
    var intersections = rayCaster.intersectObject( models.earth.surface );

      if ( intersections.length > 0 ) {
        var rad = intersections[ 0 ].object.geometry.boundingSphere.radius;
        var x = intersections[ 0 ].point.x;
        var y = intersections[ 0 ].point.y;
        var z = intersections[ 0 ].point.z;

        findPoint( applicationData.coordinateData.countries , LatLngFromPoint(x,y,z,rad) , function ( info ) {

            $("news-value").text(info.name);

            console.log('clicked' , info)

            socket.emit( 'send-info' , { 'info' : info } );

        } );

        // markerPos = models.marker.position.set( x , y , z );
    }
  }
}

function onMouseMove( e ) {

  if ( !e ) var e = window.event;
  e.preventDefault( );
  if ( e.pageX || e.pageY ) {

    var mouseVector = new THREE.Vector3 (
      ( e.pageX / window.innerWidth ) * 2 - 1,
      -( e.pageY / window.innerHeight ) * 2 + 1,
      0.5 
    );

    rayCaster.setFromCamera( mouseVector , camera);

    var intersections = rayCaster.intersectObject( models.earth.surface );

    if ( intersections.length > 0 ) {
      var rad = intersections[0].object.geometry.boundingSphere.radius;
      var x = intersections[0].point.x;
      var y = intersections[0].point.y;
      var z = intersections[0].point.z;

      var coords = LatLngFromPoint(x,y,z,rad);

      findPoint( applicationData.coordinateData.countries , coords, function( info ) {
        var lat = coords.lat;
        var lng = coords.lng;

        $('#location-value').text(" "+info.name);
        $('#coordinate-value').text(" "+lat.toFixed(5) +", "+lng.toFixed(5));
      });

      world_coords = LatLngFromPoint( x , y , z , rad );
    } else {
        $('#location-value').text("");
        $('#coordinate-value').text("");

    }
  }
}

// ////////////////////////////////////////////// //
//  Some Sockets to Interact with our app server  //
// ////////////////////////////////////////////// //

socket.on('validation', function ( data ) {

  console.log('message received!');
  if( data.response ) { start ( ) }

  else {

    var error = document.createElement( 'div' );
    error.className = 'module-error';

    error.innerHTML = 'Globehub is currently undergoing maintainance so <br /> in the mean time use <a href="http://google.com">google</a>to look find any news you want.<br /> Thank you for your patronage!';

    var page = document.getElementById('container');
    page.appendChild( error );

   }

});

socket.on('sent' , function ( data ) {

  console.log( data.msg );

});

socket.on( 'receive-info' , function ( data ) {

  pagebuilder.displayNewsList( data.info.name, data.info.news, function( html ) {

    if( $('#feed-container').has('.news-feed') ) { 
        $('#current-country').remove( )
        $('.news-feed').remove( );
    }

    $('#feed-container').append( html );
    console.log('NAME:'+data.info.name)
    $('#news-value').text(data.info.name);

   });
  
  pagebuilder.displayProfile( data.info.profiles, function( html ) {

  });
});