import stepclamp from './lib/stepclamp.glsl';
import generatePalette from './lib/generatePalette';

// ${generatePalette("#058789,#503D2E,#D54B1A,#E3A72F,#F0ECC9")}

export default `
uniform float u_time;
uniform vec2 res;

#define PI 3.14159265358979

${generatePalette("#1C2130,#028F76,#B3E099,#FFEAAD,#D14334")}

${stepclamp}

float triangle_ne(vec2 st, float size, float x, float y) {
  return (
    stepclamp(st.x, x - size, x) *
    stepclamp(st.y, y - size, y) *
    (1. - step(st.y, -st.x + x + y - size))
  );
}

void main()
{
  // convert some var names
  float time = u_time / 1000.;
  vec2 resolution = res;

  // constrain to [-1, 1]
  vec2 st = gl_FragCoord.xy/resolution * 2. - 1.;

  vec3 color = palette0;
  // coordinate system
  color = mix(color, palette2, stepclamp(st.x, 0., 0.003));
  color = mix(color, palette2, stepclamp(st.y, 0., 0.003));

  float theta = atan(st.x, st.y);
  float shape = stepclamp(distance(st, vec2(0.)), 0., 0.25) *
    stepclamp(theta, radians(15.), radians(55.));

  color = mix(color, palette4, shape);

  gl_FragColor = vec4(color, 1.0);
}

`;