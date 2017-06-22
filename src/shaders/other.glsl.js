
export default `

uniform float u_time;
uniform vec2 res;

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

float rand_smooth(float seed, float segments, float start, float end) {
  float s = seed / segments;
  float r1 = rand_range(floor(s), start, end);
  float r2 = rand_range(floor(s) + 1., start, end);
  return mix(r1, r2, fract(s));
}

// attempt at a pulsing light
void main( void ) {
  float square_size = min(res.x, res.y);
  // turn the coordinate space into a square where center is (0, 0);
	vec2 st = (2.0*gl_FragCoord.xy - res)/square_size;
  vec3 color = vec3(0.);

  // TODO - smooth random
  // float rnd = rand_range(seed, 1.0, 5.0);
  float rnd = rand_smooth(u_time, 15., 1., 5.);

  float d = distance(st, vec2(0.)) / sqrt(2.);
  float red = pow((1. - d), rnd);
  color = vec3(red, 0., red * (1. - red));


	gl_FragColor = vec4(color, 1.0);
}

`;