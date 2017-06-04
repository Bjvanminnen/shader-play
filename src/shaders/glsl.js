// JS versions of various GLSL methods

function step(edge, x) {
  return (x < edge) ? 0.0 : 1.0;
}

function fract(x) {
  return x - Math.floor(x);
}

function floor(x) {
  return Math.floor(x);
}

function mod(x, y) {
  return x - y * floor(x/y);
}

export {
  step,
  fract,
  floor,
  mod,
};