import './index.css';
import * as THREE from 'three';
import shader from './shaders/shader.glsl';
import plotter from './shaders/plotter.glsl';
import random_rows from './shaders/random_rows.glsl';
import playing from './shaders/playing.glsl';
import other from './shaders/other.glsl';
import circles from './shaders/circles.glsl';
import triangle from './shaders/triangle.glsl';
import playground from './shaders/playground.glsl';
import map from './shaders/map.glsl';
import Stats from 'stats.js';
import queryString from 'query-string';

const shaders = {
  shader,
  plotter,
  random_rows,
  playing,
  other,
  circles,
  triangle,
  playground,
  map,
};

const parsed = queryString.parse(window.location.search);

const fragmentShader = shaders[parsed.shader || 'shader'];

var scene;
var camera;
var renderer;
var stats = new Stats();
stats.dom.style.position = 'absolute';
stats.dom.style.left = '600px';
document.body.appendChild(stats.dom);


const texture = new THREE.TextureLoader().load(require('./assets/map.png'));
texture.wrapS = THREE.ClampToEdgeWrapping;
texture.wrapT = THREE.ClampToEdgeWrapping;
texture.minFilter = THREE.NearestFilter;

// const palette = [
//   new THREE.Vector3(30,  67,  59),
//   new THREE.Vector3(149, 122, 139),
//   new THREE.Vector3(191, 143, 46),
//   new THREE.Vector3(146, 75,  73),
//   new THREE.Vector3(137, 123, 60),
//   new THREE.Vector3(160, 139, 108),
//   new THREE.Vector3(75,  61,  86),
//   new THREE.Vector3(75,  61,  86),
// ];

// const paletteData = [];
// palette.forEach(p => paletteData.push(
//   ...Object.values(p),
//   255
// ));
// const paletteTexture = new THREE.DataTexture(
//   Uint8Array.from(paletteData),
//   palette.length,
//   1,
//   THREE.RGBAFormat);
// paletteTexture.needsUpdate = true;

var uniforms = {
  res: {
    type: 'v2',
    value: null
  },
  u_texture: {
    type: 't',
    value: texture
  },
  // palette: {
  //   type: 't',
  //   value: paletteTexture
  // },
  u_time: {
    type: 'f',
    value: 0
  },
  mouse: {
    type: 'v2',
    value: new THREE.Vector2(0,0)
  }
};

function scene_setup() {
  // const width = document.body.scrollWidth;
  // const height = document.body.scrollHeight;
  const width = 600;
  const height = 600;
  uniforms.res.value = new THREE.Vector2(width, height);
  // uniforms.res.value = new THREE.Vector2(800, 300);
  //This is all code needed to set up a basic ThreeJS scene
  //First we initialize the scene and our camera
  scene = new THREE.Scene();
  camera = new THREE.PerspectiveCamera( 75, width / height, 0.1, 1000 );

  scene.add(createPlane(scene));

  //We create the WebGL renderer and add it to the document
  renderer = new THREE.WebGLRenderer();
  renderer.setSize(width, height);
  document.body.appendChild(renderer.domElement);
  renderer.domElement.onmousemove = event => {
    uniforms.mouse.value = new THREE.Vector2(event.clientX, window.innerHeight - event.clientY);
  };
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

function updateUniforms() {
  uniforms.u_time.value = uniforms.u_time.value + 1;
  // uniforms.resolution.value.x = window.innerWidth;
  // uniforms.resolution.value.y = window.innerHeight;
  // uniforms.renderCount.value += 1;
}

scene_setup();
render();
