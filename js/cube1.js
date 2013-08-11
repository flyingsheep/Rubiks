var container, stats; // html elements to use
var camera, scene, renderer; // 3d env vars
var cube1, cube2, plane; // 3d elements

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 1, 1000);
    camera.position.y = 150;
    camera.position.z = 500;

    scene = new THREE.Scene();

    // Cube 1

    var geometry = new THREE.CubeGeometry(200, 200, 200);

    for (var i = 0; i < geometry.faces.length; i++) {

        geometry.faces[ i ].color.setHex(Math.random() * 0xffffff);

    }

    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

    cube1 = new THREE.Mesh(geometry, material);
    cube1.position.y = 150;
    scene.add(cube1);


    // Cube 2

    geometry = new THREE.CubeGeometry(200, 200, 200);

    for (var i = 0; i < geometry.faces.length; i++) {

        geometry.faces[ i ].color.setHex(Math.random() * 0xffffff);

    }

    var material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });

    cube2 = new THREE.Mesh(geometry, material);
    cube2.position.x = 200;
    cube2.position.y = 150;
    scene.add(cube2);

    // Plane

    var geometry = new THREE.PlaneGeometry(200, 200);
    geometry.applyMatrix(new THREE.Matrix4().makeRotationX(-Math.PI / 2));

    var material = new THREE.MeshBasicMaterial({ color: 0xe0e0e0 });

    plane = new THREE.Mesh(geometry, material);
    scene.add(plane);

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    document.addEventListener('mousedown', onDocumentMouseDown, false);
    document.addEventListener('touchstart', onDocumentTouchStart, false);
    document.addEventListener('touchmove', onDocumentTouchMove, false);

    //

    window.addEventListener('resize', onWindowResize, false);
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

//

function onDocumentMouseDown(event) {

    event.preventDefault();

    document.addEventListener('mousemove', onDocumentMouseMove, false);
    document.addEventListener('mouseup', onDocumentMouseUp, false);
    document.addEventListener('mouseout', onDocumentMouseOut, false);

    mouseXOnMouseDown = event.clientX - windowHalfX;
    targetRotationOnMouseDown = targetRotation;

}

function onDocumentMouseMove(event) {

    mouseX = event.clientX - windowHalfX;

    targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.02;

}

function onDocumentMouseUp(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentMouseOut(event) {

    document.removeEventListener('mousemove', onDocumentMouseMove, false);
    document.removeEventListener('mouseup', onDocumentMouseUp, false);
    document.removeEventListener('mouseout', onDocumentMouseOut, false);

}

function onDocumentTouchStart(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseXOnMouseDown = event.touches[ 0 ].pageX - windowHalfX;
        targetRotationOnMouseDown = targetRotation;

    }

}

function onDocumentTouchMove(event) {

    if (event.touches.length === 1) {

        event.preventDefault();

        mouseX = event.touches[ 0 ].pageX - windowHalfX;
        targetRotation = targetRotationOnMouseDown + ( mouseX - mouseXOnMouseDown ) * 0.05;

    }

}

//

function animate() {

    requestAnimationFrame(animate);

    render();
    stats.update();

}

function render() {

    plane.rotation.y = cube1.rotation.y += ( targetRotation - cube1.rotation.y ) * 0.05;
    cube2.rotation.y += ( targetRotation - cube2.rotation.y ) * 0.05;
    renderer.render(scene, camera);

}