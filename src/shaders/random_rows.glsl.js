export default `

uniform vec2 res;
uniform vec2 mouse;
uniform float u_time;

// Borealis
vec3 c1 = vec3(30.,  67.,  59) / 255.;
vec3 c2 = vec3(149., 122., 139) / 255.;
vec3 c3 = vec3(191., 143., 46) / 255.;
vec3 c4 = vec3(146., 75.,  73) / 255.;
vec3 c5 = vec3(137., 123., 60) / 255.;
vec3 c6 = vec3(160., 139., 108) / 255.;
vec3 c7 = vec3(75.,  61.,  86) / 255.;
vec3 c8 = vec3(75.,  61.,  86) / 255.;

vec3 green = vec3(40.,  192., 32) / 255.;

/**
 * Returns a pseudo random number in the range [0., 1.]
 */
float rand(in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float rand(float f) {
  return rand(vec2(f));
}

float rand_range(float seed, float start, float end) {
  float r = rand(seed);
  return r * (end - start) + start;
}

float sharpstep(float start, float end, float val) {
  if (start > val || end < val) {
    return 0.;
  }
  float x = val - start;
  float f = x * (2. * pow(x, 2.) - 3. * x + 2.);
  return f * (end - start) + start;
}

void main() {
  if (gl_FragCoord.x > res.x || gl_FragCoord.y > res.y) {
    gl_FragColor = vec4(0.3);
    return;
  }

  vec2 st = gl_FragCoord.xy / res.xy;

  float height = 5.;
  float padding = 1.;
  float val = st.y * (res.y / height);
  float block_y = floor(val);
  if (fract(val) < (padding / height)) {
    gl_FragColor = vec4(0.);
    return;
  }

  float width = rand_range(block_y, 2., 6.);

  // size in px
  vec2 cell_size = vec2(width, height);

  float dist_mouse = abs(mouse.y / res.y - st.y) * 4.;
  float close_mouse = min(1.0, max(0., 1. - dist_mouse));
  // vec3 red_mouse = vec3(close_mouse, 0.0, 0.0);
  // vec3 red_mouse = vec3(0.);

  vec2 velocity_range = vec2(-0.5, 0.6);
  float unsmoothed = rand_range(block_y, velocity_range.x, velocity_range.y);
  float velocity_x = sharpstep(velocity_range.x, velocity_range.y, unsmoothed) / 200.;

  vec2 adjusted_st = st - vec2(velocity_x * u_time, 0.);

  float rand_shade = rand(floor(adjusted_st * res.xy / cell_size));

  float freq_black = rand_range(block_y, 0.5, 0.8);
  vec3 color = vec3(step(freq_black, rand_shade) * green);


  // float r = rand_range(block_y, 0., 8.);
  // vec3 true_color = vec3(1.);
  // if (r < 1.0) {
  //   true_color = c1;
  // } else if (r < 2.) {
  //   true_color = c2;
  // } else if (r < 3.) {
  //   true_color = c3;
  // } else if (r < 4.) {
  //   true_color = c4;
  // } else if (r < 5.) {
  //   true_color = c5;
  // } else if (r < 6.) {
  //   true_color = c6;
  // } else if (r < 7.) {
  //   true_color = c7;
  // } else {
  //   true_color = c8;
  // }

  // gl_FragColor = vec4((1. - color) * true_color, 1.0);
  gl_FragColor = vec4(color, 1.0);
}
`;