export default `

uniform vec2 res;
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
  float block_y = st.y * (res. y / height);

  float r = rand(floor(block_y));
  float width = adjust_rand(r, 1., 4.);

  // size in px
  vec2 cell_size = vec2(width, height);

  float freq_black = adjust_rand(r, 0.6, 0.8);
  vec3 color = vec3(step(freq_black, rand(floor(st * res.xy / cell_size))));
  gl_FragColor = vec4(color, 1.0);
}
`;