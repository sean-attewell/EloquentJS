function min(a, b) {
  if (a <= b) {
    console.log(a);
  } else {
    console.log(b);
  }
}

min(3, 6);
min(670, 6);
min(2, 2);

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

console.log(isEven(50));
console.log(isEven(75));
console.log(isEven(-1));

function countBs(string) {
  let howManyBs = 0;
  for (let num = 0; num <= string.length - 1; num++) {
    if (string[num] === 'B') {
      howManyBs++;
    }
  }
  return howManyBs;
}

console.log(countBs('BBSCSBBBBBBBBSSSFB'));
console.log(countBs('BBC'));

function countChar(string, char) {
  let howManyChars = 0;
  for (let num = 0; num <= string.length - 1; num++) {
    if (string[num] === char) {
      howManyChars++;
    }
  }
  return howManyChars;
}

console.log(countChar('kakkerlak', 'k'));

function countBs2(string) {
  return countChar(string, 'B');
}

console.log(countBs2('LBBBLBBBLBBB'));
