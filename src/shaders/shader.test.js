import { step, fract, mod } from './glsl';
import { assert } from 'chai';
import { stratifier, tests as stratifierTests } from './stratifier.glsl';

stratifierTests();

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