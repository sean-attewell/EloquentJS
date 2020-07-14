// const x = 1;
// function evalAndReturnX(code) {
//   eval(code);
//   return x;
// }
// console.log(evalAndReturnX('var x=2')); // 2
// console.log(x); // 1
// var is only contained by functions. So var x=2 gets into the function it's in

// const x = 1;
// function evalAndReturnX(code) {
//   eval(code);
//   return x;
// }
// console.log(evalAndReturnX('let x=2')); // 1
// console.log(x); // 1
// Let here must be trapped in the scope of a code block within eval, can't be seen in function
// more evidence below.

function evalAndReturnX(code) {
  let y;
  eval(code);
  return y;
}
console.log(evalAndReturnX('let y=2')); // undefined
// it doesn't complain that y is already defined because let is stuck in a code block

function evalAndReturnX(code) {
  let y;
  eval(code);
  return y;
}
console.log(evalAndReturnX('y=2')); // 2
// this does re-assign y because it obtains the value of the local variable
