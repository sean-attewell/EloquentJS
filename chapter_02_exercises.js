// Looping a triangle

// let str = '';
// for (let num = 0; num < 7; num++) {
//   str += '#';
//   console.log(str);
// }

// for (let str = '#'; str.length < 8; str += '#') {
//   console.log(str);
// }

// fizzbuzz

// for (let num = 1; num < 101; num += 1) {
//   if (num % 3 === 0 && num % 5 === 0) {
//     console.log('FizzBuzz');
//   } else if (num % 3 === 0) {
//     console.log('Fizz');
//   } else if (num % 5 === 0) {
//     console.log('Buzz');
//   } else {
//     console.log(num);
//   }
// }

// for (let n = 1; n <= 100; n++) {
//   let output = '';
//   if (n % 3 == 0) output += 'Fizz';
//   if (n % 5 == 0) output += 'Buzz';
//   console.log(output || n);
// }

let size = 150;
let chessboard = '';

for (let lines = 0; lines < size; lines++) {
  for (let row = 0; row < size; row++) {
    if ((row + lines) % 2 === 0) {
      chessboard += ' ';
    } else {
      chessboard += '#';
    }
  }
  chessboard += '\n';
}
console.log(chessboard);

// let size = 8;

// let board = '';

// for (let y = 0; y < size; y++) {
//   for (let x = 0; x < size; x++) {
//     if ((x + y) % 2 == 0) {
//       board += ' ';
//     } else {
//       board += '#';
//     }
//   }
//   board += '\n';
// }

// console.log(board);
