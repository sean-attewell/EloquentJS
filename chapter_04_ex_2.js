function range(start, end, step) {
  let arr = [];
  for (let x = start; x <= end; x++) {
    arr.push(x);
  }
  return arr;
}

function range2(start, end, step = start < end ? 1 : -1) {
  let array = [];

  if (step > 0) {
    for (let i = start; i <= end; i += step) array.push(i);
  } else {
    for (let i = start; i >= end; i += step) array.push(i);
  }
  return array;
}

// console.log(range2(-7, 2, 2));

function watSum(arrayOfNums) {
  let total = 0;
  // item OF array does the element itself
  for (num of arrayOfNums) {
    total += num;
  }
  return total;
}

function sum(arr) {
  let result = 0;
  // item IN array does the index
  for (num in arr) {
    result += arr[num];
  }
  return result;
}

// console.log(sum([7, 7, 10]));
// console.log(watSum([7, 7, 10]));

// **** REVERSING AN ARRAY ****

function reverseArray(arr) {
  let newArr = [];
  for (item of arr) {
    newArr.unshift(item);
  }
  return newArr;
}

// console.log([1, 2, 3, 4, 5, 6, 7, 8, 9, 10].reverse());
// console.log(reverseArray([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

function reverseArrayInPlace(array) {
  for (let i = 0; i < Math.floor(array.length / 2); i++) {
    // swaps the number at the index with it's mirror, until you get to the middle number
    let old = array[i];
    array[i] = array[array.length - 1 - i]; // Where the index is gets assigned it's mirror
    // console.log(array);
    array[array.length - 1 - i] = old; // it's mirror gets assigned the value you saved from the original index
    // console.log(array);
  }
  return array;
}

// console.log(reverseArrayInPlace([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]));

// **** ARRAY TO LIST ****

// function arrayToList(arr) {
//   let list = {};
//   for (item of arr) {
//     list.value = item;
//     list.rest = list;
//   }
//   return list;
// }

function arrayToList(array) {
  let list = null;
  for (let i = array.length - 1; i >= 0; i--) {
    // index goes backwards through array
    list = { value: array[i], rest: list }; // gives the PREVIOUS list from outer scope to rest
  }
  return list;
}

// console.log(arrayToList(['A', 'B', 'C', 'D', 'E', 'F'])); // seems to log more in the browser, but limited to 3 deep in bash terminal on VSC.
// console.log(arrayToList(['A', 'B', 'C']));

//This means you're working from the inside out.
// F will have a rest of null
// E will have a rest of list of F, which has a rest of null.
// D will have a rest of list of E which has a rest of list of F, which has a rest of null

// F
// { value: 'F', rest: null }
// E
// { value: 'E', rest: { value: 'F', rest: null } }
// D
// { value: 'D',
//   rest: { value: 'E', rest: { value: 'F', rest: null } } }
// C
// { value: 'C',
//   rest: { value: 'D', rest: { value: 'E', rest: [Object] } } }
// B
// { value: 'B',
//   rest: { value: 'C', rest: { value: 'D', rest: [Object] } } }
// A
// { value: 'A',
//   rest: { value: 'B', rest: { value: 'C', rest: [Object] } } }

let myList = { value: 'A', rest: { value: 'B', rest: { value: 'C', rest: null } } };

// console.log(myList);

function listToArray(list) {
  let arr = [];
  for (let i = 0; ; i++) {
    if (list.rest === null) {
      arr.push(list.value);
      break;
    } else {
      arr.push(list.value);
      list = list.rest;
    }
  }
  return arr;
}

// console.log(listToArray(myList));
// console.log(myList);

function listToArray2(list) {
  let array = [];
  for (let node = list; node; node = node.rest) {
    array.push(node.value);
  }
  return array;
}

// console.log(listToArray2(myList));

function prepend(element, list) {
  let newlist = { value: element, rest: list };
  return newlist;
}

function prepend2(element, list) {
  return { value: element, rest: list };
}

// console.log(prepend2('Z', myList));

function nth(list, num) {
  let arr = listToArray2(list);
  return arr[num]; // returns undefined by default if not present
}

// console.log(myList);
// console.log(nth(myList, 1));

function nth2(list, n) {
  if (!list) return undefined;
  else if (n == 0) return list.value;
  else return nth(list.rest, n - 1); // digs deeper into the list
}

console.log(nth2(myList, 2));

// Deep comparison

function deepEqual(a, b) {
  if (a === b) return true;

  if (a == null || typeof a != 'object' || b == null || typeof b != 'object') return false;

  let keysA = Object.keys(a),
    keysB = Object.keys(b);

  if (keysA.length != keysB.length) return false;

  for (let key of keysA) {
    if (!keysB.includes(key) || !deepEqual(a[key], b[key])) return false;
  }

  return true;
}

let obj = { here: { is: 'an' }, object: 2 };
console.log(deepEqual(obj, obj));
// → true
console.log(deepEqual(obj, { here: 1, object: 2 }));
// → false
console.log(deepEqual(obj, { here: { is: 'an' }, object: 2 }));
// → true
