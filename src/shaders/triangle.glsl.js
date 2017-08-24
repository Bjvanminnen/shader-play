import stepclamp from './lib/stepclamp.glsl';

export default `
uniform float u_time;
uniform vec2 res;

#define PI 3.14159265358979

// ["#058789", "#503D2E", "#D54B1A", "#E3A72F", "#F0ECC9"]
vec3 background = vec3(0x05, 0x87, 0x89) / 255.;
vec3 palette1 = vec3(0x50, 0x3d, 0x2e) / 255.;
vec3 palette2 = vec3(0xd5, 0x4b, 0x1a) / 255.;
vec3 palette3 = vec3(0xe3, 0xa7, 0x2f) / 255.;

${stepclamp}

float triangle_ne(vec2 st, float size, float x, float y) {
  return (
    stepclamp(st.x, x - size, x) *
    stepclamp(st.y, y - size, y) *
    (1. - step(st.y, -st.x + size))
  );
}

void main()
{
  // convert some var names
  float time = u_time / 1000.;
  vec2 resolution = res;

  // constrain to [-1, 1]
  vec2 st = gl_FragCoord.xy/resolution * 2. - 1.;

  vec3 color = background;
  // float square = stepclamp(st.x, 0., 0.1) * stepclamp(st.y, 0., 0.1) *
  //   (1. - step(st.y, -st.x + 0.1));
  float square = triangle_ne(st, 0.1, 0.1, 0.1);


  // vec2 origin = vec2(0.);


  // float radius = 0.5;

  // float circle1 = stepclamp(distance(st, origin), radius, radius + 0.02);

  // float time_factor = time * 4.;
  // vec2 offset = vec2(-cos(time_factor), sin(time_factor)) * radius;
  // float circle2 = stepclamp(distance(st, offset), 0.2, 0.21);

  // vec2 offset2 = vec2(cos(time_factor), sin(time_factor)) * radius;
  // float circle3 = stepclamp(distance(st, offset2), 0.2, 0.21);

  color = mix(color, palette2, square);
  // color = mix(color, palette3, circle2);
  // color = mix(color, palette1, circle3);

  gl_FragColor = vec4(color, 1.0);
}

`;