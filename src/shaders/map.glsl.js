
export default `

uniform float u_time;
uniform vec2 res;
uniform sampler2D u_texture;

// attempt at a pulsing light
void main( void ) {
  // [0,1]
  vec3 color = vec3(0.);
  vec2 pos = gl_FragCoord.xy; // + vec2(cos(radians(u_time)) * 20., sin(radians(u_time)) * 20.);
  vec2 st = pos / res.xy;

  color = texture2D(u_texture, st).xyz;

  if (st.x > 0.25 && st.x < 0.55) {
    vec3 temp = color;
    color.r = temp.g;
    color.g = temp.b;
    color.b = temp.r;
  }

  // color = 1. - step(sample, vec3(0.95));
  // color = vec3(max(max(color.r, color.g), color.b));
  // color.r = 1. - step(sample.r, 0.99);
  // color.g = 1. - step(sample.g, 0.99);
  // color.b = 1. - step(sample.b, 0.99);
  // for (float i = -2.; i <= 2.; i++) {
  //   for (float j = -2.; j <= 2.; j++) {
  //     vec2 st = (gl_FragCoord.xy + vec2(i, j)) / res.xy;
  //     color = max(color, texture2D(u_texture, st, 1.0).xyz);
  //   }
  // }

  // color.r = 1. - step(color.r, 0.95);
  // color.g = 1. - step(color.g, 0.95);
  // color.b = 1. - step(color.b, 0.95);

  // color.r = 1. - step(st.x, 0.5);

  gl_FragColor = vec4(color, 1.0);
}

`;