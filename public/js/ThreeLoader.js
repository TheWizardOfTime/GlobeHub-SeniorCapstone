var loader = new THREE.TextureLoader();
	loader.crossOrigin = '';


function createSphere(radius, segments) {
		return new THREE.Mesh(
			new THREE.SphereGeometry(radius, segments, segments),
			new THREE.MeshPhongMaterial({
				map:         loader.load('./images/earth_no_ice_clouds.jpg'),
				bumpMap:     loader.load('./images/earth_bump.jpg'),
				bumpScale:   0.005,
				specularMap: loader.load('./images/earth_specular.png'),
				specular:    new THREE.Color('grey')								
			})
		);
	}

function createClouds(radius, segments) {
	return new THREE.Mesh(
		new THREE.SphereGeometry(radius + 0.008, segments, segments),			
		new THREE.MeshPhongMaterial({
			map:         loader.load('./images/earth_clouds.png'),
			transparent: true
		})
	);		
}

function createStars(radius, segments) {
	return new THREE.Mesh(
		new THREE.SphereGeometry(radius, segments, segments), 
		new THREE.MeshBasicMaterial({
			map:  loader.load('./images/galaxy_3.png'), 
			side: THREE.BackSide
		})
	);
}

function createCulture(radius, segments) {
	return new THREE.Mesh(
		new THREE.SphereGeometry(radius + 0.003, segments, segments),
		new THREE.MeshBasicMaterial({
			map: loader.load('./images/country_cultural_black_4k.png'),
			transparent: true
		})
	);
}