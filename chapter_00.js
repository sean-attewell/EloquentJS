// Because computers are dumb, pedantic beasts, programming is fundamentally tedious and frustrating.

// Fortunately, if you can get over that fact, and maybe even enjoy the rigor of thinking in terms that dumb
// machines can deal with, programming can be rewarding. It allows you to do things in seconds that would take forever by hand.
// It is a way to make your computer tool do things that it couldn’t do before. And it provides a wonderful exercise in abstract thinking.

// At one point language-based interfaces, such as the BASIC and DOS prompts of the 1980s and 1990s,
// were the main method of interacting with computers. They have largely been replaced with visual interfaces,
// which are easier to learn but offer less freedom. Computer languages are still there, if you know where to look.
// One such language, JavaScript, is built into every modern web browser and is thus available on almost every device.

// JavaScript, is built into every modern web browser and is thus available on almost every device.

// a program is data in the computer’s memory, yet it controls the actions performed on this same memory

// A program is a building of thought. It is costless to build, it is weightless, and it grows easily under our typing hands.

// But without care, a program’s size and complexity will grow out of control, confusing even the person who created it.
// Keeping programs under control is the main problem of programming

let total = 0,
  count = 1;
while (count <= 10) {
  total += count;
  count += 1;
}
console.log(total);
// → 55

// no sum/range available
// console.log(range(1, 10));
// → 55

// It helps omit details, provides convenient building blocks (such as while and console.log),
// allows you to define your own building blocks (such as sum and range), and makes those blocks easy to compose.

// JavaScript is ridiculously liberal in what it allows. The idea behind this design was that it would make programming in JavaScript
// easier for beginners. In actuality, it mostly makes finding problems in your programs harder because the system will not point them out to you.

// Web browsers are not the only platforms on which JavaScript is used. Some databases, such as MongoDB and CouchDB, use JavaScript as
// their scripting and query language. Several platforms for desktop and server programming, most notably the Node.js project,
// provide an environment for programming JavaScript outside of the browser.

function factorial(n) {
  if (n == 0) {
    return 1;
  } else {
    return factorial(n - 1) * n;
  }
}

console.log(factorial(8));
// → 40320

// edit test
