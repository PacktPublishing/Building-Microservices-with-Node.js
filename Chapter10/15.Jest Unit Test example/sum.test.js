// sum.test.js
const sum = require('./sum'); // Assuming you have a sum function

test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});