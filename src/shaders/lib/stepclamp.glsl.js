// import { step, fract } from './glsl';

// A stream of num_sections, where the nth section is on and all others
// are of. (n is 1 indexed)
export default `
// Returns 1 when x is in range min/max, else 0
float stepclamp(float x, float low, float high) {
  return step(x, high) * (1. - step(x, low));
}
`;

// TODO: could do tests

// export function stratifier(x, num_sections, n) {
//   const interval = 1. / num_sections;
//   return 1. - step(interval, fract(x / num_sections - interval * (n - 1.0)));
// }

// export const tests = () => {
//   const time_stream = [0,1,2,3,4,5,6,7,8,9,10];
//   describe('stratifier', () => {
//     it('works for n = 1', () => {
//       const results = time_stream.map(x => stratifier(x, 4, 1));
//       expect(results).toEqual([1,0,0,0,1,0,0,0,1,0,0]);
//     });

//     it('works for n = 2', () => {
//       const results = time_stream.map(x => stratifier(x, 4, 2));
//       expect(results).toEqual([0,1,0,0,0,1,0,0,0,1,0]);
//     });
//   });
// };