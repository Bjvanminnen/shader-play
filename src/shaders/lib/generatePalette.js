

/**
 * @param {string} inputStr - String delimeted list of hexes, i.e.
 *   #2A044A,#0B2E59
 * @return {string} GLSL code create variables for each palette item
 */
export default function generatePalette(inputStr) {
  return inputStr.split(',').map((item, index) => `vec3 palette${index} = vec3(` +
    /^#(.{2})(.{2})(.{2})$/.exec(item).slice(1).map(hex =>
      parseInt(hex, 16) / 0xff).join(',') + ');'
  ).join('\n');
}