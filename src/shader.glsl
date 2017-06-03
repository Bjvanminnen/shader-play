uniform vec2 res;
uniform sampler2D palette;
uniform int ticks;

vec3 white = vec3(1);

// green
vec3 color1 = vec3(30.0  / 255.0,  67.0 / 255.0,  59.0 / 255.0);
// light purple
vec3 color2 = vec3(149.0 / 255.0, 122.0 / 255.0, 139.0 / 255.0);

float plot(vec2 st, float pct){
  return  smoothstep( pct-0.02, pct, st.y) -
          smoothstep( pct, pct+0.02, st.y);
}

// float rand(vec2 co){
//     return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
// }

// void main() {
//   vec2 pos = gl_FragCoord.xy / res.xy; // * vec2(20.0, 10.0);
//   if (pos.x > 1.0 || pos.y > 1.0) {
//     gl_FragColor = vec4(1);
//     return;
//   }

//   pos = pos * res / 10.0;

//   vec2 ipos = vec2(floor(pos.x), floor(pos.y));

//   float r = rand(ipos * float(ticks));
//   gl_FragColor = texture2D(palette, vec2(r, 0));

// }

float f(float x) {
  return pow(x, 3.0);
}
float f2(float x) {
  return smoothstep(0.0, 1.0, x);
}

void main() {
  vec2 st = gl_FragCoord.xy / res.xy;
  if (st.x > 1.0 || st.y > 1.0) {
    return;
  }

  vec2 center = vec2(0.2, 0.5);
  vec2 center2 = vec2(0.8, 0.5);

  float dist = distance(st, center);
  float dist2 = distance(st, center2);

  // float mix_amt = f(dist);
  float mix_amt =0.0;
  mix_amt = 1.0 - f(dist * 5.0);

  float mix_amt2 = 0.0;
  mix_amt2 = 1.0 - f2(dist2 * 5.0);
  float mix_amt_total = clamp(mix_amt, 0.0, 1.0) + clamp(mix_amt2, 0.0, 1.0);
  // gl_FragColor = vec4(mix(color1, color2, mix_amt), 1.0);
  gl_FragColor = vec4(mix_amt_total * white, 1.0);

}