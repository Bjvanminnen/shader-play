uniform vec2 res;
uniform sampler2D texture;
uniform sampler2D map;

void main() {
  // vec2 m = mod(gl_FragCoord.xy, vec2(4,4)) - vec2(0.5, 0.5);
  // if (m.x == 0.0) {
  //   gl_FragColor = vec4(1,0,0,0);
  // } else {
  //   gl_FragColor = vec4(1);
  // }

  vec2 pos = gl_FragCoord.xy / res.xy;
  if (pos.x > 1.0 || pos.y > 1.0) {
    gl_FragColor = vec4(0);
    return;
  }

  vec2 alphaPos = mod(gl_FragCoord.xy, vec2(4,4)) - vec2(0.5, 0.5);
  float alpha = texture2D(map, alphaPos).r;
  gl_FragColor = texture2D(texture, pos) * alpha;
  // gl_FragColor = texture2D(map, alphaPos);


  // float remX = mod(gl_FragCoord.x, 4.0) - 0.5;
  // float remY = mod(gl_FragCoord.y, 4.0) - 0.5;
  // float mult = 1.0;

  // float mults[5][5];
  // mults[0] = vec5(0.6, 0.8, 0.9, 1.0, 1.0);
  // mults[1] = vec5(0.8, 0.9, 1.0, 0.8, 1.0);
  // mults[2] = vec5(0.9, 1.0, 0.8, 0.8, 1.0);
  // mults[3] = vec5(1.0, 0.8, 0.8, 0.6, 1.0);
  // mults[4] = vec5(1.0, 0.8, 0.8, 0.6, 1.0);

  // for (int row = 0; row < 4; row++) {
  //   for (int col = 0; col < 4; col++) {
  //     if (row == int(remY) && col == int(remX)) {
  //       mult = mults[row][col];
  //     }
  //   }
  // }


  // gl_FragColor = mult * gl_FragColor;
}