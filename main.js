 //import * as THREE from 'three';

// const scene = new THREE.Scene();
// const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const geometry = new THREE.BoxGeometry( 1,1,1 );
// const material = new THREE.MeshBasicMaterial( { color: 0x00ff00 } );
// const cube = new THREE.Mesh( geometry, material );
// scene.add( cube );
// camera.position.z = 5;

// function animate() {
// 	requestAnimationFrame( animate );

// 	cube.rotation.x += 0.01;
// 	cube.rotation.y += 0.01;

// 	renderer.render( scene, camera );
// }

// animate();


// import * as THREE from 'three';

// const renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// const camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 500 );
// camera.position.set( 0, 0, 0 );
// camera.lookAt( 0, 0, 0 );

// const scene = new THREE.Scene();
// const geometry = new THREE.SphereGeometry( 18, 1000, 1000 ); 
// const material = new THREE.MeshBasicMaterial( { color: 0xffff00 } ); 


// // const texture = new THREE.TextureLoader().load( "SAM_0115.JPG" );
// // texture.wrapS = THREE.RepeatWrapping;
// // texture.wrapT = THREE.RepeatWrapping;
// // texture.repeat.set( 4, 4 );

// const sphere = new THREE.Mesh( geometry, material ); 
// scene.add( sphere );

// function animate() {
//     	requestAnimationFrame( animate );
    
//     	// sphere.rotation.x += 0.01;
//     	// sphere.rotation.y += 0.01;
//     	renderer.render( scene, camera );
//     }
    
// animate();


// const texture = new THREE.TextureLoader().load( "C:/Users/kumod/Desktop/3js/SAM_0115.JPG" );
// texture.wrapS = THREE.RepeatWrapping;
// texture.wrapT = THREE.RepeatWrapping;
// texture.repeat.set( 4, 4 );

// renderer.render( scene, camera );


import * as THREE from 'three';

let camera, scene, renderer;

let isUserInteracting = false,
	lon = 0, lat = 0,
	phi = 0, theta = 0,
	onPointerDownPointerX = 0,
	onPointerDownPointerY = 0,
	onPointerDownLon = 0,
	onPointerDownLat = 0;

const distance = .5;

init();
animate();

function init() {

	const container = document.getElementById( 'container' );

	camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, .25, 10 );

	scene = new THREE.Scene();

	const geometry = new THREE.SphereGeometry( 5, 60, 40 );
	// invert the geometry on the x-axis so that all of the faces point inward
	geometry.scale( - 1, 1, 1 );

	const video = document.getElementById( 'video' );
	video.play();

	// const texture2 = new THREE.TextureLoader().load("SAM_0115.JPG");
	// texture2.wrapS = THREE.RepeatWrapping;
	// texture2.wrapT = THREE.RepeatWrapping;
	// texture2.repeat.set( 1, 1 );


	 const texture = new THREE.VideoTexture( video );
	 texture.colorSpace = THREE.SRGBColorSpace;
	 const material = new THREE.MeshBasicMaterial( { map: texture } );

	const mesh = new THREE.Mesh( geometry, material );
	scene.add( mesh );

	renderer = new THREE.WebGLRenderer();
	renderer.useLegacyLights = false;
	renderer.setPixelRatio( window.devicePixelRatio );
	renderer.setSize( window.innerWidth, window.innerHeight );
	container.appendChild( renderer.domElement );

	document.addEventListener( 'pointerdown', onPointerDown );
	document.addEventListener( 'pointermove', onPointerMove );
	document.addEventListener( 'pointerup', onPointerUp );


	window.addEventListener( 'resize', onWindowResize );

}

function onWindowResize() {

	camera.aspect = window.innerWidth / window.innerHeight;
	camera.updateProjectionMatrix();

	renderer.setSize( window.innerWidth, window.innerHeight );

}

function onPointerDown( event ) {

	isUserInteracting = true;

	onPointerDownPointerX = event.clientX;
	onPointerDownPointerY = event.clientY;

	onPointerDownLon = lon;
	onPointerDownLat = lat;

}

function onPointerMove( event ) {

	if ( isUserInteracting === true ) {

		lon = ( onPointerDownPointerX - event.clientX ) * 0.1 + onPointerDownLon;
		lat = ( onPointerDownPointerY - event.clientY ) * 0.1 + onPointerDownLat;

	}

}

function onPointerUp() {

	isUserInteracting = false;

}

function animate() {

	requestAnimationFrame( animate );
	update();

}

function update() {

	lat = Math.max( - 85, Math.min( 85, lat ) );
	phi = THREE.MathUtils.degToRad( 90 - lat );
	theta = THREE.MathUtils.degToRad( lon );

	camera.position.x = distance * Math.sin( phi ) * Math.cos( theta );
	camera.position.y = distance * Math.cos( phi );
	camera.position.z = distance * Math.sin( phi ) * Math.sin( theta );

	camera.lookAt( 0, 0, 0 );

	renderer.render( scene, camera );

}

