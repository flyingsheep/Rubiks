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

    for (var i=0; i<cubes.length; i++){
        geometry[i] = new THREE.CubeGeometry(200, 200, 200); // TODO: define cube size/translator
        setCubeColors(geometry[i],cubes[i].colors);
        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
        cubesMesh[i] = new THREE.Mesh(geometry[i], material);
        setCubePosition(cubesMesh[i],cubes[i].position);
        cube.add(cubesMesh[i]); 
    }
    
    cube.position.y = 310;
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

    // do you listen?
    document.addEventListener( 'mousemove', onDocumentMouseMove, false );
    window.addEventListener( 'resize', onWindowResize, false );
}

function setCubeColors(cube,colors){
    for ( var i = 0; i < colors.length; i++ )
    {
        switch (colors.charAt(i)){
            case 'n':
                cube.faces[i].color.setHex( 0x000000 );
                break;
            case 'w':
                cube.faces[i].color.setHex( 0xffffff );
                break;
            case 'g':
                cube.faces[i].color.setHex( 0x00ff00 );
                break;
            case 'y':
                cube.faces[i].color.setHex( 0xffff00 );
                break;
            case 'b':
                cube.faces[i].color.setHex( 0x0000ff );
                break;
            case 'r':
                cube.faces[i].color.setHex( 0xff0000 );
                break;
            case 'o':
                cube.faces[i].color.setHex( 0xffa500 );
                break;
        }
    }
    return true;
}

function setCubePosition(cube,position){
    cube.position.x= -310+((position[0]*200)+(position[0]*10)) +80;
    cube.position.y= 310 - ((position[1]*200)+(position[1]*10));
    cube.position.z= 310 -((position[2]*200)+(position[2]*10));
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
    mouseY = ( event.clientY - windowHalfY ) * 3;s
}

function animate() {
    requestAnimationFrame(animate);
    render();
    stats.update();
}

function render() {
    camera.position.x = mouseX;
    camera.position.y = -mouseY;
    camera.lookAt(new THREE.Vector3(0,windowHalfY,0));
    renderer.render(scene, camera);
}
