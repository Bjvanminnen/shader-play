import './index.css';
import * as THREE from 'three';
import fragmentShader from './shader.glsl';

var scene;
var camera;
var renderer;

const texture = new THREE.TextureLoader().load(require('./assets/archer.jpg'));
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;
texture.minFilter = THREE.NearestFilter;

const alphas = [
  [0.5, 0.6, 1,   1],
  [0.6, 1,   1,   1],
  [1,   1,   1,   1],
  [1,   0.4, 0.5, 0.6],
];

var dummyRGBA = new Uint8Array(4 * 4 * 4);
for (var y = 0; y < 4; y++) {
  for (var x = 0; x < 4; x++) {
    const index = 16 * y + 4 * x;
    dummyRGBA[index] = 255 * alphas[y][x];
  }
}

const mapTex = new THREE.DataTexture( dummyRGBA, 4, 4, THREE.RGBAFormat );
mapTex.needsUpdate = true;

var uniforms = {
  texture: {
    type:'t',
    value: texture
  },
  res: {
    type: 'v2',
    value: null
  },
  map: {
    type: 't',
    value: mapTex
  }
};

function scene_setup() {
  const width = document.body.scrollWidth;
  const height = document.body.scrollHeight;
  // uniforms.res.value = new THREE.Vector2(width, height);
  uniforms.res.value = new THREE.Vector2(612, 380);
  //This is all code needed to set up a basic ThreeJS scene
  //First we initialize the scene and our camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

  scene.add(createPlane(scene));

  //We create the WebGL renderer and add it to the document
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
}

function createPlane(scene) {
  const geometry = new THREE.PlaneGeometry( 10, 10 );
  // const material = new THREE.MeshBasicMaterial( { color: 0x00ff00} );
  var material = new THREE.ShaderMaterial({
    fragmentShader,
    uniforms
  });
  const plane = new THREE.Mesh( geometry, material );
  plane.position.z = -1;

  return plane;
}

function render() {
  updateUniforms();

  requestAnimationFrame( render );
  renderer.render( scene, camera );
}

function updateUniforms() {
  // uniforms.resolution.value.x = window.innerWidth;
  // uniforms.resolution.value.y = window.innerHeight;
  // uniforms.renderCount.value += 1;
}

scene_setup();
render();
