uniform vec2 res;
uniform sampler2D texture;
uniform sampler2D map;

void main() {

  vec2 pos = gl_FragCoord.xy / res.xy;
  if (pos.x > 1.0 || pos.y > 1.0) {
    gl_FragColor = vec4(0);
    return;
  }

  vec2 alphaPos = mod(gl_FragCoord.xy, vec2(4,4)) - vec2(0.5, 0.5);
  float alpha = texture2D(map, alphaPos).r;
  gl_FragColor = texture2D(texture, pos) * alpha;
}