function firstElement(array) {
  if (array.length == 0) {
    throw new Error('firstElement called with []');
  }
  return array[0];
}

console.log(firstElement([1, 2, 3, 4]));
// firstElement([]);

// Summary

// Mistakes and bad input are facts of life. An important part of programming is finding, diagnosing, and fixing bugs. Problems
// can become easier to notice if you have an automated test suite or add assertions to your programs.

// Problems caused by factors outside the program’s control should usually be handled gracefully. Sometimes, when the problem
// can be handled locally, special return values are a good way to track them. Otherwise, exceptions may be preferable.

// Throwing an exception causes the call stack to be unwound until the next enclosing try/catch block or until the bottom of
// the stack. The exception value will be given to the catch block that catches it, which should verify that it is actually
// the expected kind of exception and then do something with it. To help address the unpredictable control flow caused by
// exceptions, finally blocks can be used to ensure that a piece of code always runs when a block finishes.
class MultiplicatorUnitFailure extends Error {}

function primitiveMultiply(a, b) {
  if (Math.random() < 0.2) {
    return a * b;
  } else {
    throw new MultiplicatorUnitFailure('Klunk');
  }
}

function reliableMultiply(a, b) {
  for (;;) {
    try {
      let result = primitiveMultiply(a, b);
      console.log(result);
      return;
    } catch (e) {
      if (e instanceof MultiplicatorUnitFailure) {
        console.log('trying again');
      } else {
        throw e;
      }
    }
  }
}

reliableMultiply(2, 8);

function reliableMultiply_ans(a, b) {
  for (;;) {
    try {
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) throw e;
    }
  }
}

console.log(reliableMultiply_ans(8, 8));

console.log('***** unlocking the box *****');

const box = {
  locked: true,
  unlock() {
    this.locked = false;
  },
  lock() {
    this.locked = true;
  },
  _content: [],
  get content() {
    if (this.locked) throw new Error('Locked!');
    return this._content;
  }
};

// function withBoxUnlocked(body) { <-- mine, works fine doesn't need a catch blokc but lets error through without burying
//   try {
//     box.unlock();
//     body();
//   } catch (e) {
//     // console.log('an err');
//     throw e;
//   } finally {
//     box.lock();
//   }
// }

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  }

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function() {
  box.content.push('gold piece');
});

console.log(box._content);
// [ 'gold piece' ]
console.log(box.locked);
// true

try {
  withBoxUnlocked(function() {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised: ' + e);
}
console.log(box.locked);
// → true
