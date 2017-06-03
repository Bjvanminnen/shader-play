import './index.css';
import * as THREE from 'three';
import fragmentShader from './shader.glsl';
import Stats from 'stats.js';

var scene;
var camera;
var renderer;
var stats = new Stats();
document.body.appendChild( stats.dom );

const texture = new THREE.TextureLoader().load(require('./assets/archer.jpg'));
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;
texture.minFilter = THREE.NearestFilter;

const palette = [
  new THREE.Vector3(30,  67,  59),
  new THREE.Vector3(149, 122, 139),
  new THREE.Vector3(191, 143, 46),
  new THREE.Vector3(146, 75,  73),
  new THREE.Vector3(137, 123, 60),
  new THREE.Vector3(160, 139, 108),
  new THREE.Vector3(75,  61,  86),
  new THREE.Vector3(75,  61,  86),
];

const paletteData = [];
palette.forEach(p => paletteData.push(
  ...Object.values(p),
  255
));
const paletteTexture = new THREE.DataTexture(
  Uint8Array.from(paletteData),
  palette.length,
  1,
  THREE.RGBAFormat);
// paletteTexture.wrapS = THREE.RepeatWrapping;
// paletteTexture.wrapT = THREE.RepeatWrapping;
paletteTexture.needsUpdate = true;
// paletteTexture.magFilter = THREE.NearestFilter;
// paletteTexture.minFilter = THREE.NearestFilter;

// const alphas = [
//   [0.5, 0.6, 1,   1],
//   [0.6, 1,   1,   1],
//   [1,   1,   1,   1],
//   [1,   0.4, 0.5, 0.6],
// ];

// var dummyRGBA = new Uint8Array(4 * 4 * 4);
// for (var y = 0; y < 4; y++) {
//   for (var x = 0; x < 4; x++) {
//     const index = 16 * y + 4 * x;
//     dummyRGBA[index] = 255 * alphas[y][x];
//   }
// }

// const mapTex = new THREE.DataTexture( dummyRGBA, 4, 4, THREE.RGBAFormat );
// mapTex.needsUpdate = true;

var uniforms = {
  // texture: {
  //   type:'t',
  //   value: texture
  // },
  res: {
    type: 'v2',
    value: null
  },
  // map: {
  //   type: 't',
  //   value: mapTex
  // },
  palette: {
    type: 't',
    value: paletteTexture
  },
  paletteRg: {
    type: 'v3v',
    value: palette.map(p => p.divide(255))
  },
  ticks: {
    type: 'i',
    value: 0
  }
};

function scene_setup() {
  const width = document.body.scrollWidth;
  const height = document.body.scrollHeight;
  // uniforms.res.value = new THREE.Vector2(width, height);
  uniforms.res.value = new THREE.Vector2(600, 600);
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
  stats.begin();
  updateUniforms();

  renderer.render( scene, camera );
  stats.end();

  requestAnimationFrame( render );
}

let count = 0;
function updateUniforms() {
  count++;
  if (count >= 10) {
    uniforms.ticks.value = uniforms.ticks.value + 1;
    count = 0;
  }
  // uniforms.resolution.value.x = window.innerWidth;
  // uniforms.resolution.value.y = window.innerHeight;
  // uniforms.renderCount.value += 1;
}

scene_setup();
render();
