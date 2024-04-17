const assert = require('assert');

function add(a, b) {
  return a + b;
}

// Unit test for the add function

function testAdd() {
  const result = add(2, 3);

  assert.strictEqual(result, 5, 'Expected add(2, 3) to equal 5');
}

testAdd();

console.log('All tests passed');