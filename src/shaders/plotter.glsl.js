export default `

uniform vec2 res;
uniform float u_time;

// float plot(vec2 st, float pct){
//   return  smoothstep( pct-0.02, pct, st.y) -
//           smoothstep( pct, pct+0.02, st.y);
// }

// A stream of num_sections, where the nth section is on and all others
// are of. (n is 1 indexed)
float stratifier(float x, float num_sections, float n) {
  float interval = 1. / num_sections;
  return 1. - step(interval, fract(x / num_sections - interval * (n - 1.0)));
}

float sharpstep(float start, float end, float val) {
  if (start > val || end < val) {
    return 0.;
  }
  float x = val - start;
  float f = x * (2. * pow(x, 2.) - 3. * x + 2.);
  return f * (end - start) + start;
}

float rand(in vec2 _st) {
    return fract(sin(dot(_st.xy,
                         vec2(12.9898,78.233)))*
        43758.5453123);
}

float rand(float f) {
  return rand(vec2(f));
}

void main() {
  float mult_x = 50.;
  float window_y = 200.;

  float x = gl_FragCoord.x / mult_x;

  float bot = res.y - window_y;

  if (gl_FragCoord.y < bot || gl_FragCoord.y > res.y) {
    gl_FragColor = vec4(1.0);
    return;
  }

  vec3 color = vec3(0.9);
  if (mod(gl_FragCoord.x, mult_x) < 1.0 ||
      floor(gl_FragCoord.y) == (res.y - 101.) ||
      floor(gl_FragCoord.y) == (res.y - 100.) ||
      floor(gl_FragCoord.y) == (res.y - 99.) ||
      floor(gl_FragCoord.y) == (res.y - 50.) ||
      floor(gl_FragCoord.y) == (res.y - 150.)) {
    color = vec3(0., 0., 1.);
  }

  float y1 = fract(x) * 2. - 1.;
  float y2_4 = step(1.0, mod(x / 2. - 1., 2.0)) * 2.0 - 1.0;
  float y3 = (1. - fract(x)) * 2. - 1.;

  float y = 0.0;
  // y = step(1.0, mod(x, 2.0)) * 2.0 - 1.0;
  // y = fract(x);
  // float z = 1. - step(0.25, fract(x / 4.));

  y = y1 * stratifier(x, 4.0, 1.)
    + y2_4 * stratifier(x, 4.0, 2.)
    + y3 * stratifier(x, 4.0, 3.)
    + y2_4 * stratifier(x, 4.0, 4.);

  y = y3;

  y = sharpstep(0., 1.5, x);

  y = rand(floor(x));
  float r1 = rand(floor(x));
  float r2 = rand(floor(x + 1.));
  y = mix(r1, r2, smoothstep(0., 1., fract(x)));

  float sty = (gl_FragCoord.y - bot) / window_y * 4. - 2.;
  if (abs(sty - y) < 0.03) {
    color = vec3(1., 0., 0.);
  }

  gl_FragColor = vec4(color, 1.0);
}

`;