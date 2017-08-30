import stepclamp , { stroke } from './lib/stepclamp.glsl';
import generatePalette from './lib/generatePalette';

// ${generatePalette("#058789,#503D2E,#D54B1A,#E3A72F,#F0ECC9")}

export default `
uniform float u_time;
uniform vec2 res;

#define PI 3.14159265358979

${generatePalette("#1C2130,#028F76,#B3E099,#FFEAAD,#D14334")}

${stepclamp}
${stroke}

float fx(float stx) {
  return (sin(stx * PI) + 1.) / 2.;
}

void main() {
  // convert some var names
  float time = u_time / 1000.;
  vec2 resolution = res;

  // constrain to [-1, 1]
  vec2 st = gl_FragCoord.xy/resolution * 2. - 1.;

  vec3 color = palette0;

  // coordinate system
  // color = mix(color, palette2, stroke(st.x, 0., 0.003));
  // color = mix(color, palette2, stroke(st.y, 0., 0.003));

  // float n = mod(time * 5., 2.) - 1.;
  // color = mix(color, palette4, stroke(st.y, fx(st.x), mix(0.005, 0.05, fx(time * 5.))));

  float d;
  float mixd = mix(1., 5., fx(time * 8.));
  float dist = distance(st, vec2(0.));

  vec3 circles = vec3(0.);
  for (float i = 0.0; i < 1.5; i += 0.05) {
    d = i * mixd;
    // color = mix(color, palette4, stepclamp(dist, d, d + 0.01));
    circles += stepclamp(dist, d, d + 0.01);
  }

  color = mix(color, palette4, circles / circles);

  // d = mix(0.2, 0.5, fx(time * 5.));
  // color = mix(color, palette4,
  //   stepclamp(distance(st, vec2(0.)), d, d + 0.01));

  // d = mix(0.3, 0.8, fx(time * 5.));
  // color = mix(color, palette4,
  //   stepclamp(distance(st, vec2(0.)), d, d + 0.01));

  // d = mix(0.1, 0.3, fx(time * 5.));
  // color = mix(color, palette4,
  //   stepclamp(distance(st, vec2(0.)), d, d + 0.01));

  gl_FragColor = vec4(color, 1.0);
}










/*
void main()
{
  // convert some var names
  float time = u_time / 1000.;
  vec2 resolution = res;

  // constrain to [-1, 1]
  vec2 st = gl_FragCoord.xy/resolution * 2. - 1.;

  vec3 color = palette0;
  // coordinate system
  // color = mix(color, palette2, stepclamp(st.x, 0., 0.003));
  // color = mix(color, palette2, stepclamp(st.y, 0., 0.003));

  float shape;
  float fx;
  float x;
  float base_x = mod(time * 5., 2.) - 1.;

  float line_width = 0.015;

  x = base_x * 0.8;
  fx = sin(st.x * PI);
  color = mix(color, palette4,
    stepclamp(st.y, fx, fx + line_width) * step(st.x, x)
  );
  color = mix(color, palette4,
    make_square(st, x, sin(x * PI), 0.05)
  );

  x = base_x * 1.2;
  fx = cos(st.x * PI);
  color = mix(color, palette2,
    stepclamp(st.y, fx, fx + line_width) * step(st.x, x)
  );
  color = mix(color, palette2,
    make_square(st, x, cos(x * PI), 0.05)
  );

  x = base_x * 1.2;
  fx = -sin(st.x * PI);
  color = mix(color, palette1,
    stepclamp(st.y, fx, fx + line_width) * step(st.x, x)
  );
  color = mix(color, palette1,
    make_square(st, x, -sin(x * PI), 0.05)
  );

  x = base_x * 0.7;
  fx = -cos(st.x * PI);
  color = mix(color, palette3,
    stepclamp(st.y, fx, fx + line_width) * step(st.x, x)
  );
  color = mix(color, palette3,
    make_square(st, x, -cos(x * PI), 0.05)
  );

  gl_FragColor = vec4(color, 1.0);
}
*/

`;