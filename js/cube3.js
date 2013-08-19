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

function getCubeAltPosition(cube_id){
    var cubeIndex =0;
    for (var i=0; i<cubes.length; i++) { if (cubes[i].id==cube_id) { cubeIndex=i; }}
    return cubes[cubeIndex].altPosition;
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
    //    output += getCubePosition(cubes[i].altPosition);
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
    var x,y,z;
    var xNew, yNew, zNew;
    var xDif, yDif, zDif;
    
    if (altPositionOn){ // <--- go to alternate position
        for (var i=0; i<scene.children[0].children.length; i++){
            x = scene.children[0].children[i].position.x;
            xNew = getCubePosition(cubes[i].altPosition[0])[0];
            xDif = x-xNew;
            y = scene.children[0].children[i].position.y;
            yNew = getCubePosition(cubes[i].altPosition[1])[1];
            yDif = y-yNew;
            z = scene.children[0].children[i].position.z;
            zNew = getCubePosition(cubes[i].altPosition[2])[2];
            zDif = z-zNew;

            if (Math.abs(xDif)>0) {
                if (Math.abs(xDif)<2) {
                    scene.children[0].children[i].position.x = xNew;
                }
                else {
                    scene.children[0].children[i].position.x += xDif/2;
                }
            }
        }
    }
    else { // <--- go back to original position
        for (var i=0; i<scene.children[0].children.length; i++){
            x = scene.children[0].children[i].position.x;
            xNew = getCubePosition(cubes[i].position[0])[0];
            xDif = x-xNew;
            y = scene.children[0].children[i].position.y;
            yNew = getCubePosition(cubes[i].position[1])[1];
            yDif = y-yNew;
            z = scene.children[0].children[i].position.z;
            zNew = getCubePosition(cubes[i].position[2])[2];
            zDif = z-zNew;

            if (Math.abs(xDif)>0) {
                if (Math.abs(xDif)<2) {
                    console.log(xDif);
                    //scene.children[0].children[i].position.x = xNew;
                }
                else {
                    console.log(xDif);
                    //scene.children[0].children[i].position.x += xDif/2;
                }
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