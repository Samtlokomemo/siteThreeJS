import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// Definindo o tamanho da janela
const largura = window.innerWidth;
const altura = window.innerHeight;

// Criando a cena
const cena = new THREE.Scene();

// Criando a camera
const camera = new THREE.PerspectiveCamera( 75, largura / altura, 0.1, 1000 );

// Criando o renderer
const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg')
});
renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize( largura , altura );
camera.position.set(0, 5, 10);

// Colocando o rendeter no html
document.body.appendChild( renderer.domElement );

// Criando a iluminação
const luzAzul = new THREE.PointLight(0x0000ff, 10);
luzAzul.position.set(1, 3, 1);
const luzAzulHelper = new THREE.PointLightHelper(luzAzul, .3);

const luzVermelha = new THREE.PointLight(0xff0000, 5);
luzVermelha.position.set(-1, 3, -1);
const luzVermelhaHelper = new THREE.PointLightHelper(luzVermelha, .3);

const ambientLight = new THREE.AmbientLight(0xffffff, .5);
const gridHelper = new THREE.GridHelper(200, 50);

cena.add(luzAzul, luzAzulHelper, luzVermelha, luzVermelhaHelper, ambientLight, gridHelper);

// Controlando a câmera
const controles = new OrbitControls(camera, renderer.domElement);
renderer.render( cena, camera );

// Importando o modelo 3D
let objeto;
const loader = new GLTFLoader();

loader.load(
    './modelo/scene.gltf',
    function(gltf){
        objeto = gltf.scene;
        cena.add(objeto);
    },undefined, function(error){
        console.error("Error ao carregar o modelo: ", error);
});


// Animando :)
function animate() {
    requestAnimationFrame( animate );
    if (!objeto) return;

    objeto.rotation.y += 0.03;
    controles.update();
    renderer.render( cena, camera );
}

animate();

// Handler de resize
window.addEventListener('resize', () =>{
    const novaLargura = window.innerWidth;
    const novaAltura = window.innerHeight;

    camera.aspect = novaLargura / novaAltura;
    camera.updateProjectionMatrix();

    renderer.setSize(novaLargura, novaAltura);
})