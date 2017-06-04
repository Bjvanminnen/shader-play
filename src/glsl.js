// JS versions of various GLSL methods

function step(edge, x) {
  return (x < edge) ? 0.0 : 1.0;
}

function fract(x) {
  return x - Math.floor(x);
}

export {
  step,
  fract,
};