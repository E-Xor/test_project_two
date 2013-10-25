// set the scene size
var WIDTH = 400,
    HEIGHT = 300;

// set some camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// get the DOM element to attach to
// - assume we've got jQuery to hand
var $container = $('#cube-container');
console.log('going ot render in', $container);

// create a WebGL renderer, camera
// and a scene
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                         ASPECT,
                                         NEAR,
                                         FAR  );

// and the camera
scene.add(camera);

// the camera starts at 0,0,0 so pull it back
camera.position.z = 300;

// start the renderer
renderer.setSize(WIDTH, HEIGHT);

// attach the render-supplied DOM element
$container.append(renderer.domElement);

// create the sphere's material
var darkMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true});
darkMaterial.side = THREE.DoubleSide;
darkMaterial.opacity = 0.99;


var cube = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), darkMaterial );
scene.add(cube);


// directional lighting
var directionalLight = new THREE.DirectionalLight(0xAABBFF);
directionalLight.position.set(10, 120, 140).normalize();
directionalLight.intensity = 0.5;
scene.add(directionalLight);

// draw!
renderer.render(scene, camera);

// Move light
var change = 0;
window.setInterval(function(){
    change += 0.1;
    cube.rotation.x += 0.02;
    cube.rotation.y += 0.0225;
    cube.rotation.z += 0.0175;
    cube.scale.x  = 1.0 + 0.3*Math.sin(change);
    cube.scale.y  = 1.0 + 0.3*Math.sin(change);
    cube.scale.z  = 1.0 + 0.3*Math.sin(change);
    
    renderer.render(scene, camera);
},30);
