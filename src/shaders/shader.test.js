import { step, fract, mod } from './glsl';
import { assert } from 'chai';

describe('mod', () => {
  it('mod(-1,2)', () => {
    expect(mod(-1, 2)).toEqual(1);
  });

  it('mod(0,2)', () => {
    expect(mod(0, 2)).toEqual(0);
  });

  it('mod(1,2)', () => {
    expect(mod(1, 2)).toEqual(1);
  });

  it('mod(2,2)', () => {
    expect(mod(2, 2)).toEqual(0);
  });

  it('mod(1.5,2)', () => {
    expect(mod(1.5, 2)).toEqual(1.5);
  });
});


// A stream of num_sections, where the nth section is on and all others
// are of. (n is 1 indexed)
// float stratifier(float x, float num_sections, float n) {
//   float interval = 1. / num_sections;
//   return 1. - step(interval, fract(x / num_sections - interval * (n - 1.0)));
// }
function stratifier(x, num_sections, n) {
  const interval = 1. / num_sections;
  return 1. - step(interval, fract(x / num_sections - interval * (n - 1.0)));
}

const time_stream = [0,1,2,3,4,5,6,7,8,9,10];
describe('stratifier', () => {
  it('works for n = 1', () => {
    const results = time_stream.map(x => stratifier(x, 4, 1));
    expect(results).toEqual([1,0,0,0,1,0,0,0,1,0,0]);
  });

  it('works for n = 2', () => {
    const expected = [1,0,0,0,1,0,0,0,1,0,0];

    const results = time_stream.map(x => stratifier(x, 4, 2));
    expect(results).toEqual([0,1,0,0,0,1,0,0,0,1,0]);
  });
});

// float square_movement(float x) {
//   float y1 = fract(x) * 2. - 1.;
//   float y2_4 = step(1.0, mod(x / 2. - 1., 2.0)) * 2.0 - 1.0;
//   float y3 = (1. - fract(x)) * 2. - 1.;
//   return y1 * stratifier(x, 4.0, 1.)
//     + y2_4 * stratifier(x, 4.0, 2.)
//     + y3 * stratifier(x, 4.0, 3.)
//     + y2_4 * stratifier(x, 4.0, 4.);
// }
function square_movement(x) {
  // each interval, rises from -1 to 1
  const y1 = fract(x) * 2. - 1.;
  const y2_4 = step(1.0, mod(x / 2. - 1., 2.0)) * 2.0 - 1.0;
  // each interval drops from 1 to -1
  const y3 = (1. - fract(x)) * 2. - 1.;
  return y1 * stratifier(x, 4.0, 1.)
    + y2_4 * stratifier(x, 4.0, 2.)
    + y3 * stratifier(x, 4.0, 3.)
    + y2_4 * stratifier(x, 4.0, 4.);
}

describe('square_movement', () => {
  it('x == 0', () => expect(square_movement(0)).toEqual(-1));
  it('x == 1', () => expect(square_movement(1)).toEqual(1));
  it('x == 2', () => expect(square_movement(2)).toEqual(1));
  it('x == 3', () => expect(square_movement(3)).toEqual(-1));
  it('x == 4', () => expect(square_movement(4)).toEqual(-1));
});