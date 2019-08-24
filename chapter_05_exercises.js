let SCRIPTS = require('./SCRIPTS.js');

// Flattening
// Use the reduce method in combination with the concat method to “flatten” an array of arrays into a single array that has all
// the elements of the original arrays.

let arrays = [[1, 2, 3], [4, 5], [6]];
console.log(arrays);
// Your code here.
// → [1, 2, 3, 4, 5, 6]

console.log(arrays.reduce((accumulator, currentValue) => accumulator.concat(currentValue), []));

let flat = arrays.reduce((acc, item) => [...acc, ...item]);
console.log(flat);

// Multiple statements need to be enclosed in brackets. A single expression requires no brackets. The expression is also the implicit
// return value of the function. Single expressions don't have semicolons

// Your own loop

// Write a higher-order function loop that provides something like a for loop statement. It takes a value, a test function,
// an update function, and a body function. Each iteration, it first runs the test function on the current loop value and
// stops if that returns false. Then it calls the body function, giving it the current value. Finally, it calls the update
// function to create a new value and starts from the beginning.

// When defining the function, you can use a regular loop to do the actual looping.

function loop(value, testFunction, updateFunction, bodyFunction) {
  let v = value;
  while (testFunction(v)) {
    bodyFunction(v);
    v = updateFunction(v); // you werent binding the return value to v before, so v stayed the same.
  }
}

// function loop(start, test, update, body) {
//   for (let value = start; test(value); value = update(value)) {
//     body(value);
//   }
// }

loop(3, n => n > 0, n => n - 1, console.log);
// → 3
// → 2
// → 1

// Everything

// The some method is another higher-order function. It takes a test function and tells you whether that function
// returns true for any of the elements in the array.

// Analogous to the some method, arrays also have an every method. This one returns true when the given function returns
// true for every element in the array. In a way, some is a version of the || operator that acts on arrays, and every is like the && operator.

// Implement every as a function that takes an array and a predicate function as parameters. Write two versions, one using a loop
// and one using the some method.

// function every(array, test) {
//   let all = null;
//   for (item of array) {
//     if (test(item)) {
//       all = true;
//     } else {
//       return false;
//     }
//   }
//   return true;
//   // Your code here.
// }

// function every(array, predicate) {
//   for (let element of array) {
//     if (!predicate(element)) return false;
//   }
//   return true;
// }

function every2(array, predicate) {
  return !array.some(element => !predicate(element));
}
// if the test function returns false for anything in the array, return false
// if the test function doesn't return false for anything in the array, return true

console.log(every2([1, 3, 5], n => n < 10));
// → true
console.log(every2([2, 4, 16], n => n < 10));
// → false
console.log(every2([], n => n < 10));
// → true

// Dominant writing direction
// Write a function that computes the dominant writing direction in a string of text. Remember that each script object
// has a direction property that can be "ltr" (left to right), "rtl" (right to left), or "ttb" (top to bottom).

// The dominant direction is the direction of a majority of the characters that have a script associated with them. The
// characterScript and countBy functions defined earlier in the chapter are probably useful here.

function countBy(items, groupName) {
  let counts = [];
  for (let item of items) {
    let name = groupName(item);
    let known = counts.findIndex(c => c.name == name);
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
  let counted = countBy(text, char => {
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
