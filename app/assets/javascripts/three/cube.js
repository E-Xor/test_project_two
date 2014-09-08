;
// Scene size
var WIDTH = 400,
    HEIGHT = 300;

// Camera attributes
var VIEW_ANGLE = 45,
    ASPECT = WIDTH / HEIGHT,
    NEAR = 0.1,
    FAR = 10000;

// Init
var renderer = new THREE.WebGLRenderer();
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(  VIEW_ANGLE,
                                         ASPECT,
                                         NEAR,
                                         FAR  );
scene.add(camera);
camera.position.z = 300; // The camera starts at 0,0,0 so pull it back
renderer.setSize(WIDTH, HEIGHT);

// Material
var darkMaterial = new THREE.MeshLambertMaterial({color: 0xFFFFFF, transparent: true});
darkMaterial.side = THREE.DoubleSide;
darkMaterial.opacity = 0.99;

// Object
var cube = new THREE.Mesh( new THREE.CubeGeometry( 100, 100, 100 ), darkMaterial );
scene.add(cube);

// Light
var directionalLight = new THREE.DirectionalLight(0xAABBFF);
directionalLight.position.set(10, 120, 140).normalize();
directionalLight.intensity = 0.5;
scene.add(directionalLight);

$(function(){
    var $container = $('#cube-container');

    $container.append(renderer.domElement); // Attach the renderer to the DOM element
    renderer.render(scene, camera);

    // Move the cube
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
});
