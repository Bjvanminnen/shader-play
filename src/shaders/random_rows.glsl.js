export default `

uniform vec2 res;
uniform vec2 mouse;
uniform float u_time;

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

float adjust_rand(float r, float start, float end) {
  return r * (end - start) + start;
}


void main() {
  if (gl_FragCoord.x > res.x || gl_FragCoord.y > res.y) {
    gl_FragColor = vec4(0.3);
    return;
  }

  vec2 st = gl_FragCoord.xy / res.xy;

  float height = 10.;
  float block_y = floor(st.y * (res. y / height));

  float width = adjust_rand(rand(block_y), 1., 6.);

  // size in px
  vec2 cell_size = vec2(width, height);

  float velocity_x = adjust_rand(rand(block_y), -0.5, 1.0) / 200.;

  vec2 adjusted_st = st - vec2(velocity_x * u_time, 0.);

  float rand_shade = rand(floor(adjusted_st * res.xy / cell_size));

  float freq_black = adjust_rand(rand(block_y), 1., 1.3) - (mouse.x / res.x);
  vec3 color = vec3(step(freq_black, rand_shade));
  gl_FragColor = vec4(color, 1.0);
}
`;