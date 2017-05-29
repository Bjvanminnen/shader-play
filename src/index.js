import './index.css';
import * as THREE from 'three';
import fragmentShader from './shader.glsl';

var scene;
var camera;
var renderer;
var uniforms = {};

function scene_setup() {
  const width = document.body.scrollWidth;
  const height = document.body.scrollHeight;
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
