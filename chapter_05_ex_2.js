let SCRIPTS = require('./SCRIPTS.js');

let arrayOfArrays = [
  ['a', 'b'],
  ['c', 'd'],
  ['e', 'f'],
];

// if you're going to use a code block for the return statement in the callback, you need to actaully say return.
let flattened = arrayOfArrays.reduce((accumulator, current) => {
  return accumulator.concat(current);
}, []);

// let flattened = arrayOfArrays.reduce((accumulator, current) => accumulator.concat(current), []);

let flattened2 = arrayOfArrays.reduce((accumulator, current) => [...accumulator, ...current], []);

console.log('flattened 2:', flattened2);

// Multiple statements need to be enclosed in brackets. A single expression requires no brackets. The expression is also the implicit
// return value of the function. Single expressions don't have semicolons

// YOUR OWN LOOP

function loop(value, testFunction, updateFunction, bodyFunction) {
  let v = value;
  while (testFunction(v)) {
    bodyFunction(v);
    v = updateFunction(v); // you werent binding the return value to v before, so v stayed the same.
  }
}

loop(
  5,
  (n) => n > 0,
  (n) => --n, // This didn't work at first beacuse I was doing n-- instead of --n
  (n) => console.log(n)
);

// loop(
//   3,
//   (n) => n > 0,
//   (n) => n - 1,
//   console.log
// );

function every(array, testFunc) {
  for (element of array) {
    if (!testFunc(element)) {
      return false;
    }
  }
  return true;
}

console.log(every([2, 4, 5], (n) => n % 2 === 0));

// if the test function returns false for anything in the array, return false
// if the test function doesn't return false for anything in the array, return true

function every2(array, testFunc) {
  return !array.some((element) => !testFunc(element));
}
console.log(every2([1, 3, 5], (n) => n < 10));
// → true
console.log(every2([2, 4, 16], (n) => n < 10));
// → false

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex((c) => c.name == name);
    if (known == -1) {
      counts.push({ name, count: 1 });
    } else {
      counts[known].count++;
    }
  }
  return counts;
}

function characterScript(code) {
  for (let script of SCRIPTS) {
    if (
      script.ranges.some(([from, to]) => {
        return code >= from && code < to;
      })
    ) {
      return script;
    }
  }
  return null;
}

function dominantDirection(text) {
  let counted = countBy(text, (char) => {
    let script = characterScript(char.codePointAt(0));
    return script ? script.direction : 'none';
  }).filter(({ name }) => name != 'none');

  if (counted.length == 0) return 'ltr';

  return counted.reduce((a, b) => (a.count > b.count ? a : b)).name;
}

console.log(dominantDirection('Hello!'));
// → ltr
console.log(dominantDirection('Hey, مساء الخير'));
// → rtl
