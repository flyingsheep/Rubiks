/*

    Rubiks Take: 1.3.2
    
    A cube built from basic mini cubes

*/


var container, stats; // View elements
var camera, scene, renderer; // 3d env methods

var cube; // Cube main object
var cubesMesh = []; // this is the mini cubes array

// mouse move little helpers
var mouseX = 0;
var mouseY = 0;

// where is the center?
var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

// alternate position animation toggle
var altPositionOn = false;

// let's go
init();
animate();

//
// functions
//

// first time stuff
function init() {
    var geometry =[];
    var material;

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 5000);
    camera.position.y = windowHalfY-310;
    camera.position.z = 1500;

    scene = new THREE.Scene();

    cube = new THREE.Object3D();//create an empty container

    for (var i=0, len=cubes.length; i<len; i++){
        geometry[i] = new THREE.CubeGeometry(200, 200, 200); // TODO: define cube size/translator
        material = new THREE.MeshBasicMaterial( { color: 0x333333 } );
        cubesMesh[i] = new THREE.Mesh(geometry[i], material);
        setCubePlanes(cubesMesh[i],cubes[i].colors);
        setCubePosition(cubesMesh[i],cubes[i].position);
        cube.add(cubesMesh[i]); 
    }
    
    cube.position.y = (window.innerHeight / 2 ) - 310;
    cube.position.x = 0;
    scene.add( cube );//when done, add the group to the scene

    renderer = new THREE.CanvasRenderer();
    renderer.setSize(window.innerWidth, window.innerHeight);

    container.appendChild(renderer.domElement);

    // stats

    stats = new Stats();
    stats.domElement.style.position = 'absolute';
    stats.domElement.style.top = '0px';
    container.appendChild(stats.domElement);

    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    document.addEventListener( 'mousedown', onDocumentMouseDown, false );
    document.addEventListener( 'mouseup', onDocumentMouseUp, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function setCubePlanes(cube,colors){
    var plane = {};

    for ( var i = 0; i < colors.length; i++ )
    {
        switch (colors.charAt(i)){
            case 'n':
                break;
            case 'w':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190, 190, 5), new THREE.MeshBasicMaterial( { color: 0xffffff } ));
                plane.position.x = 104;
                plane.position.y = 3;
                plane.rotation.y = ( Math.PI / 2 );
                cube.add(plane);
                break;
            case 'g':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190,190,5), new THREE.MeshBasicMaterial( { color: 0x00ff00 } ));
                plane.position.y = -104;
                plane.position.x = 3;
                plane.rotation.x = ( Math.PI / 2 );
                cube.add(plane);
                break;
            case 'y':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190,190,5), new THREE.MeshBasicMaterial( { color: 0xffff00 } ));
                plane.position.x = -104;
                plane.position.y = 3;
                plane.rotation.y = -( Math.PI / 2 );
                cube.add(plane);
                break;
            case 'b':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190,190,5), new THREE.MeshBasicMaterial( { color: 0x0000ff } ));
                plane.position.y = 104;
                plane.position.x = 3;
                plane.rotation.x = -( Math.PI / 2 );
                cube.add(plane);
                break;
            case 'r':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190,190,5), new THREE.MeshBasicMaterial( { color: 0xff0000 } ));
                plane.position.z = 104;
                plane.position.y = 3;
                cube.add(plane);
                break;
            case 'o':
                plane = new THREE.Mesh(new THREE.CubeGeometry(190,190,5), new THREE.MeshBasicMaterial( { color: 0xffa500 } ));
                plane.position.z = 104;
                plane.position.x = 3;
                cube.add(plane);
                break;
        }
    }
    return true;
}

function setCubePosition(cube,position){
    var cube_position = getCubePosition(position);
    cube.position.x= cube_position[0];
    cube.position.y= cube_position[1];
    cube.position.z= cube_position[2];
}

function getCubePosition(cube_position){
    return [(-310 +(cube_position[0]*200)),(310 - (cube_position[1]*200)),(310 -(cube_position[2]*200))];
}

function onWindowResize() {

    windowHalfX = window.innerWidth / 2;
    windowHalfY = window.innerHeight / 2;

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

function onDocumentMouseMove(event) {
    mouseX = ( event.clientX - windowHalfX ) * 2;
    mouseY = ( event.clientY - windowHalfY ) * 3;
}

function onDocumentMouseDown(event){
    altPositionOn = true;
}

function onDocumentMouseUp(event) {
    altPositionOn = false;
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function checkMiniCubes(){

    var currentPosition = [];
    var newPosition = [];
    var difVector =[];

    for (var i=0; i<scene.children[0].children.length; i++){

        if (altPositionOn){
            newPosition = getCubePosition(cubes[i].altPosition);
        }
        else {
            newPosition = getCubePosition(cubes[i].position);
        }
        moveMiniCube(i,newPosition);
    }

    function moveMiniCube(i,newPosition){

        // Find Mini cube current position
        currentPosition = [
            scene.children[0].children[i].position.x,
            scene.children[0].children[i].position.y,
            scene.children[0].children[i].position.z
        ];

        // Init Dif vector
        difVector = [
            currentPosition[0]-newPosition[0],
            currentPosition[1]-newPosition[1],
            currentPosition[2]-newPosition[2]
        ];

        // handle x move
        if (Math.abs(difVector[0])>0) {
            if (Math.abs(difVector[0])<2) {
                scene.children[0].children[i].position.x = newPosition[0];
            }
            else {
                scene.children[0].children[i].position.x -= difVector[0]/3;
            }
        }
        // handle y move
        if (Math.abs(difVector[1])>0) {
            if (Math.abs(difVector[1])<2) {
                scene.children[0].children[i].position.y = newPosition[1];
            }
            else {
                scene.children[0].children[i].position.y -= difVector[1]/3;
            }
        }
        // handle z move
        if (Math.abs(difVector[2])>0) {
            if (Math.abs(difVector[2])<2) {
                scene.children[0].children[i].position.z = newPosition[2];
            }
            else {
                scene.children[0].children[i].position.z -= difVector[2]/3;
            }
        }
    }
}

function render() {
    // mini cubes position
    checkMiniCubes();

    // camera control
    camera.position.x = mouseX;
    camera.position.y = -mouseY;
    camera.lookAt(new THREE.Vector3(0,windowHalfY,0));
    
    // render
    renderer.render(scene, camera);
}