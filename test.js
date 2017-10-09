var camera, scene, renderer;
var geometry, material, mesh;

init();
animate();

function init() {

    camera = new THREE.PerspectiveCamera( 45, window.innerWidth / window.innerHeight, 1, 2000 );
    camera.position.z = 10;

    scene = new THREE.Scene();

    geometry = new THREE.BoxGeometry( 20, 20, 20 );
    material = new THREE.MeshNormalMaterial();

    mesh = new THREE.Mesh( geometry, material );
    //scene.add( mesh );

    var light = new THREE.HemisphereLight( 0xffffbb, 0x181824, 1 );
    scene.add( light );

    var directionalLight = new THREE.DirectionalLight( 0xffffff, 0.5 );
    scene.add( directionalLight );

    scene.background = new THREE.Color( 0x555555 );

    var mtlLoader = new THREE.MaterialX.Loader();
    mtlLoader.setPath('obj/Suzanne/');
    mtlLoader.load('default.mtlx', function(materials) {
        window.mymaterials = materials;
        materials.preload();
        var objLoader = new THREE.OBJLoader();
        objLoader.setMaterials(materials);
        objLoader.setPath('obj/Suzanne/');
        objLoader.load('Suzanne.obj', function(object) {
            window.myobj = object;
            mesh = object;
            scene.add(object);
        });
    });

    renderer = new THREE.WebGLRenderer( { antialias: true } );
    renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( renderer.domElement );

    controls = new THREE.OrbitControls(camera, renderer.domElement)

}

function animate() {

    requestAnimationFrame( animate );

    if(mesh && 0) {
        mesh.rotation.x += 0.01;
        mesh.rotation.y += 0.02;
    }

    renderer.render( scene, camera );

}
