import stratifier from './lib/stratifier.glsl';

export default `

uniform vec2 res;
uniform sampler2D palette;
uniform float u_time;

vec3 white = vec3(1);

// green
vec3 color1 = vec3(30.0  / 255.0,  67.0 / 255.0,  59.0 / 255.0);
// light purple
vec3 color2 = vec3(149.0 / 255.0, 122.0 / 255.0, 139.0 / 255.0);

${stratifier}

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

// Returns 0 if x is outside of range, otherwise x
float constrain(float x, float minVal, float maxVal) {
  return step(minVal, x) * (1.0 - step(maxVal, x)) * x;
}
vec2 constrain(vec2 v, float minVal, float maxVal) {
  return step(minVal, v) * (1.0 - step(maxVal, v)) * v;
}

vec3 square(vec2 st, float start, float end) {
  vec2 constrained = constrain(st, start, end);
  return vec3(constrained.x * constrained.y);
}

// square centered at 0,0
vec3 square(vec2 st, float size) {
  vec2 p = 1. - step(size / 2.0, abs(st));
  return vec3(p.x * p.y);
}

vec3 square_outline(vec2 st, float size) {
  float stroke = 0.02;
  return square(st, size) - square(st, size - stroke);
}

float f(float x) {
  return pow(x, 3.0);
}
float f2(float x) {
  return smoothstep(0.0, 1.0, x);
}

float square_movement(float x) {
  float y1 = fract(x) * 2. - 1.;
  float y2_4 = step(1.0, mod(x / 2. - 1., 2.0)) * 2.0 - 1.0;
  float y3 = (1. - fract(x)) * 2. - 1.;
  return y1 * stratifier(x, 4.0, 1.)
    + y2_4 * stratifier(x, 4.0, 2.)
    + y3 * stratifier(x, 4.0, 3.)
    + y2_4 * stratifier(x, 4.0, 4.);
}

void main() {
  vec2 st = gl_FragCoord.xy / res.xy;
  if (st.x > 1.0 || st.y > 1.0) {
    return;
  }
  st = st * 2.0 - 1.0;

  float time_mod = 120.0;
  float u_time2 = u_time / time_mod;

  // TODO - mostly working, but some weird flashes in the corners
  float transx = square_movement(u_time2);
  float transy = square_movement(u_time2 - 1.);
  vec2 translate = vec2(transx, transy) * 0.6;

  vec3 color = square_outline(st - translate, 0.3);

  gl_FragColor = vec4(color, 1.0);
}
`;