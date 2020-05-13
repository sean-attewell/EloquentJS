function min(a, b) {
  if (a <= b) {
    console.log(a);
  } else {
    console.log(b);
  }
}

// min(3, 6);
// min(670, 6);
// min(2, 2);

function isEvenRetry(num) {
  if (num === 0) {
    return true;
  } else if (num === 1) {
    return false;
  } else {
    return isEvenRetry(num - 2);
  }
}

// console.log(isEvenRetry(0));
// console.log(isEvenRetry(1));
// console.log(isEvenRetry(100));
// console.log(isEvenRetry(99));
// console.log(isEvenRetry(50));
// console.log(isEvenRetry(75));

function isEven(a) {
  if (a === 0) {
    return true;
  } else if (a === 1) {
    return false;
  } else if (a < 0) {
    return isEven(-a);
  } else {
    return isEven(a - 2);
  }
}

// console.log(isEven(50));
// console.log(isEven(75));
// console.log(isEven(-1));

function countBs(string) {
  let howManyBs = 0;
  for (let num = 0; num < string.length; num++) {
    if (string[num] === 'B') {
      howManyBs++;
    }
  }
  return howManyBs;
}

// console.log(countBs('BBSCSBBBBBBBBSSSFB'));
// console.log(countBs('BILOWB'));

function countChar(string, char) {
  let howManyChars = 0;
  for (let num = 0; num < string.length; num++) {
    if (string[num] === char) {
      howManyChars++;
    }
  }
  return howManyChars;
}

// console.log(countChar('kakkerlak', 'k'));

function countBs2(string) {
  return countChar(string, 'B');
}

// console.log(countBs2('LBBBLBBBLBBB'));

// repl.it second time around

// function countBs(str) {
//   let count = 0
//   for (i in str) {
//     if (str[i] == "B"){
//     count += 1}
//     }
//   console.log(count)
//   };

// // countBs("herBBBeaB sasBBd");

// function countChar(str, char) {
//   let count = 0
//   for (i in str) {
//     if (str[i] == char){
//     count += 1}
//     }
//   console.log(count)
// };

// // countChar("a string with lots of lllletttters", "t")

// function countBsUsingCountChar(str) {
//   countChar(str, "B")
// };

// countBsUsingCountChar("herBBBeaB sasBBd");
