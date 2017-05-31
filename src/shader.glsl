uniform vec2 res;
uniform sampler2D palette;
uniform int ticks;

float rand(vec2 co){
    return fract(sin(dot(co.xy ,vec2(12.9898,78.233))) * 43758.5453);
}

void main() {
  vec2 pos = gl_FragCoord.xy / res.xy; // * vec2(20.0, 10.0);
  if (pos.x > 1.0 || pos.y > 1.0) {
    gl_FragColor = vec4(1);
    return;
  }

  pos = pos * res / 10.0;

  vec2 ipos = vec2(floor(pos.x), floor(pos.y));

  float r = rand(ipos * float(ticks));
  gl_FragColor = texture2D(palette, vec2(r, 0));

}