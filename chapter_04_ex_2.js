function range(start, end) {
  let arr = [];
  for (let x = start; x <= end; x++) {
    arr.push(x);
  }
  return arr;
}

// console.log(range(2, 7));

function watSum(arrayOfNums) {
  let total = 0;
  // item OF array does the element itself
  for (num of arrayOfNums) {
    console.log(num);
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

console.log(sum([7, 7, 10]));
console.log(watSum([7, 7, 10]));
