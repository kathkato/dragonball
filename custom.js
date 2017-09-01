var container;
var camera, scene, renderer;
var scene;
var mouseX = 0, mouseY = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
  container = document.getElementById( 'container' );
  camera = new THREE.PerspectiveCamera( 50, window.innerWidth / window.innerHeight, 1, 2000 );
  camera.position.z = 500;

  renderer = new THREE.WebGLRenderer({alpha: true});
  renderer.setClearColor( 0xffffff, 0.0 );
  renderer.setPixelRatio( window.devicePixelRatio );
  renderer.setSize( window.innerWidth, window.innerHeight );
  container.appendChild( renderer.domElement );

  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  window.addEventListener( 'resize', onWindowResize, false );

  scene = new THREE.Scene();

  var ballGeometry = new THREE.SphereGeometry( 120, 30, 30 );
  var ballMaterial = new THREE.MeshPhongMaterial( { color: 0xef9f61, opacity: 0.95 } );
  var ballMesh = new THREE.Mesh( ballGeometry, ballMaterial );
  scene.add( ballMesh );

  var pts = [], numPts = 5;
  for ( var i = 0; i < numPts * 2; i ++ ) {
  	var l = i % 2 == 1 ? 10 : 20;
  	var a = i / numPts * Math.PI;
  	pts.push( new THREE.Vector2 ( Math.cos( a ) * l, Math.sin( a ) * l ) );
  }

  var starShape = new THREE.Shape( pts );
  var starGeometry = new THREE.ExtrudeGeometry(starShape, { amount: 1, bevelEnabled: true, bevelSegments: 0 });
  var starMaterial = new THREE.MeshLambertMaterial( { color: 0xe35e5f, wireframe: false } );
  var starMesh = new THREE.Mesh( starGeometry, starMaterial );

  starMesh.renderOrder = 1;
  starMesh.onBeforeRender = function( renderer ) {
  	renderer.clearDepth();
  };

  scene.add( starMesh );

  var light = new THREE.HemisphereLight( 0xffffbb, 0x140820, 1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 0, 1, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.9 );
  light.position.set( 0, -1, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 1, 0, 0 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( 0, 0, 1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 1 );
  light.position.set( 0, 0, -1 );
  scene.add( light );

  var light = new THREE.DirectionalLight( 0xffffff, 0.5 );
  light.position.set( -1, 0, 0 );
  scene.add( light );	
}

function onWindowResize() {
  windowHalfX = window.innerWidth / 2;
  windowHalfY = window.innerHeight / 2;

  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize( window.innerWidth, window.innerHeight );	
}

function onDocumentMouseMove( event ) {
  mouseX = ( event.clientX - windowHalfX );
  mouseY = ( event.clientY - windowHalfY );
}

function animate() {
  requestAnimationFrame( animate );
  render();	
}

function render() {
  camera.position.x += ( mouseX - camera.position.x ) * 0.05;
  camera.position.y += ( - mouseY - camera.position.y ) * 0.05;
  camera.lookAt( scene.position );

  scene.rotation.y -= 0.01;

  renderer.render( scene, camera );	
}