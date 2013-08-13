/*

    center cubes
    -------------

    center_yellow (in front of) center_white
    center_blue (in front of) center_green
    center_orange (in front of) center_red

    corner cobes
    -------------

    corner_rwb, corner_rby, corner_ryg, corner_rgw
    corner_obw, corner_owg, corner_ogy, corner_oyb

    edge cobes
    ----------

    edge_gw, corner_gr, corner_gy, corner_go
    edge_bo, edge_bw, edge_br, edge_by
    edhe_ow, edge_wr, edge_ry, edge_yo

    overall 26 cubes
    ----------------



*/


var container, stats; // html elements to use
var camera, scene, renderer; // 3d env vars
var cubes = [{
        id: 1,
        name:"c000",
        type: "corner",
        position:[0,0,0],
        colors: "nybnrn",
        rotation:""
    },{
        id: 2,
        name:"c100",
        type: "edge",
        position:[1,0,0],
        colors: "nnbnrn",
        rotation:""
    },{
        id: 3,
        name:"c200",
        type: "corner",
        position:[2,0,0],
        colors: "wnbnrn",
        rotation:""
    },{
        id: 4,
        name:"c010",
        type: "edge",
        position:[0,1,0],
        colors: "nynnrn",
        rotation:""
    },{
        id: 5,
        name:"c110",
        type: "center",
        position:[1,1,0],
        colors: "nnnnrn",
        rotation:""
    },{
        id: 6,
        name:"c210",
        type: "edge",
        position:[2,1,0],
        colors: "wnnnrn",
        rotation:""
    },{
        id: 7,
        name:"c020",
        type: "corner",
        position:[0,2,0],
        colors: "nyngrn",
        rotation:""
    },{
        id: 8,
        name:"c120",
        type: "edge",
        position:[1,2,0],
        colors: "nnngrn",
        rotation:""
    },{
        id: 9,
        name:"c220",
        type: "corner",
        position:[2,2,0],
        colors: "wnngrn",
        rotation:""
    },{
        id: 10,
        name:"c001",
        type: "edge",
        position:[0,0,1],
        colors: "nybnnn",
        rotation:""
    },{
        id: 11,
        name:"c101",
        type: "center",
        position:[1,0,1],
        colors: "nnbnnn",
        rotation:""
    },{
        id: 12,
        name:"c201",
        type: "edge",
        position:[2,0,1],
        colors: "wnbnnn",
        rotation:""
    },{
        id: 13,
        name:"c011",
        type: "center",
        position:[0,1,1],
        colors: "nynnnn",
        rotation:""
    },{
        id: 14,
        name:"c211",
        type: "center",
        position:[2,1,1],
        colors: "wnnnnn",
        rotation:""
    },{
        id: 15,
        name:"c021",
        type: "edge",
        position:[0,2,1],
        colors: "nyngnn",
        rotation:""
    },{
        id: 16,
        name:"c121",
        type: "center",
        position:[1,2,1],
        colors: "nnngnn",
        rotation:""
    },{
        id: 17,
        name:"c221",
        type: "edge",
        position:[2,2,1],
        colors: "wnngnn",
        rotation:""
    },{
        id: 18,
        name:"c002",
        type: "corner",
        position:[0,0,2],
        colors: "nybnno",
        rotation:""
    },{
        id: 19,
        name:"c102",
        type: "edge",
        position:[1,0,2],
        colors: "nnbnno",
        rotation:""
    },{
        id: 20,
        name:"c202",
        type: "corner",
        position:[2,0,2],
        colors: "wnbnno",
        rotation:""
    },{
        id: 21,
        name:"c012",
        type: "edge",
        position:[0,1,2],
        colors: "nynnno",
        rotation:""
    },{
        id: 22,
        name:"c112",
        type: "center",
        position:[1,1,2],
        colors: "nnnnno",
        rotation:""
    },{
        id: 23,
        name:"c212",
        type: "edge",
        position:[2,1,2],
        colors: "wnnnno",
        rotation:""
    },{
        id: 24,
        name:"c022",
        type: "corner",
        position:[0,2,2],
        colors: "nyngno",
        rotation:""
    },{
        id: 25,
        name:"c122",
        type: "edge",
        position:[1,2,2],
        colors: "nnngno",
        rotation:""
    },{
        id: 26,
        name:"c222",
        type: "corner",
        position:[2,2,2],
        colors: "wnngno",
        rotation:""
}]
var cube;
var cubesMesh = [];

var targetRotation = 0;
var targetRotationOnMouseDown = 0;

var mouseX = 0;
var mouseXOnMouseDown = 0;

var windowHalfX = window.innerWidth / 2;
var windowHalfY = window.innerHeight / 2;

init();
animate();

function init() {
    var geometry =[];
    var material;

    container = document.createElement('div');
    document.body.appendChild(container);

    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight,1, 2000);
    camera.position.y = 310;
    camera.position.z = 1500;

    scene = new THREE.Scene();

    cube = new THREE.Object3D();//create an empty container

    for (var i=0; i<cubes.length; i++){
        geometry[i] = new THREE.CubeGeometry(200, 200, 200); // TODO: define cube size/translator
        setCubeColors(geometry[i],i);
        material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
        cubesMesh[i] = new THREE.Mesh(geometry[i], material);
        setCubePosition(cubesMesh[i],i);
        cube.add(cubesMesh[i]); 
    }
    
    cube.position.y = 310;
    cube.position.x = 0;
    scene.add( cube );//when done, add the group to the scene

    /*
    cube[0] = new THREE.Object3D();//create an empty container
    geometry = new THREE.CubeGeometry(200, 200, 200); // TODO: define cube size/translator
    geometry2 = new THREE.CubeGeometry(200, 200, 200); // TODO: define cube size/translator

    geometry.faces[ 4].color.setHex( 0xff0000 );
    geometry2.faces[ 4].color.setHex( 0x0000ff );

    material = new THREE.MeshBasicMaterial({ vertexColors: THREE.FaceColors });
    cube1 = new THREE.Mesh(geometry, material);
    cube1.name = "cube1";
    cube1.position.y = 0;
    
    cube2 = new THREE.Mesh(geometry2, material);
    cube2.name = "cube2";
    cube2.position.y=210;

    cube[0].add( cube1 );//add a mesh with geometry to it
    cube[0].add( cube2 );//add a mesh with geometry to it
    scene.add( cube[0] );//when done, add the group to the scene

*/
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

function setCubeColors(cube,cubeIndex){
    var colors = cubes[cubeIndex].colors;
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

function setCubePosition(cube,cubeIndex){
    var position = cubes[cubeIndex].position;
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

    cube.rotation.y += ( targetRotation - cube.rotation.y ) * 0.05;
    renderer.render(scene, camera);

}
