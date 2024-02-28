// sum.test.js
function sum(a, b) {
  return a + b;
}

test.each([
  [1, 2, 3],
  [0, 0, 0],
  [-1, 1, 0],
])('adds %i + %i to equal %i', (a, b, expected) => {
  expect(sum(a, b)).toBe(expected);
});
