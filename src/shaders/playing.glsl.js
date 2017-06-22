export default `

uniform vec2 res;
uniform vec2 mouse;
uniform float u_time;

// http://www.color-hex.com/color-palette/40110
vec3 green = vec3(20.,195.,13.) / 255.;
vec3 dark_purple = vec3(58.,28.,90.) / 255.;
vec3 red = vec3(231.,30.,30.) / 255.;

void main() {
  vec3 color = dark_purple;
  vec2 center = vec2(200., 200.);
  float t = u_time / 10.;

  vec2 coord = gl_FragCoord.xy - center;

  float slope = sin(radians(90.));
  float stroke_len = 1.;
  float target_y = coord.x * slope;
  if (abs(target_y - coord.y) < stroke_len) {
    color = green;
  }

  if (distance(gl_FragCoord.xy, center) < 5.) {
    color = red;
  }

  gl_FragColor = vec4(color, 1.);
}
`;