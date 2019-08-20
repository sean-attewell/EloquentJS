function range(start, end, step) {
  /////////////////////////// U R HERE
  let arr = [];
  for (let i = start; i <= end; i++) {
    arr.push(i);
  }
  return arr;
}

console.log(range(3, 9));

function sum(arrayOfNums) {
  let total = 0;
  for (num of arrayOfNums) {
    total += num;
  }
  return total;
}

console.log(sum(range(1, 10)));
