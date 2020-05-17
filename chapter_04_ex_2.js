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

console.log(arrayToList(['A', 'B', 'C', 'D', 'E', 'F'])); // seems to log more in the browser, but limited to 3 deep in bash terminal on VSC.

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

function listToArray(list) {
  let arr = [];
}
