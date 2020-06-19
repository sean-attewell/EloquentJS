// class MultiplicatorUnitFailure extends Error {}

// function primitiveMultiply(n1, n2) {
//   let rand = Math.random();
//   if (rand > 0.2) {
//     return null;
//   } else {
//     return n1 * n2;
//   }
// }

// function primitiveMultWrap(n1, n2) {
//   let result = primitiveMultiply(n1, n2);
//   if ((result = null)) {
//     throw new MultiplicatorUnitFailure('primitiveMultiply fail');
//   } else {
//     return result;
//   }
// }

// try {
//   console.log(primitiveMultWrap(4, 5));
// } catch (e) {
//   if (e instanceof MultiplicatorUnitFailure) {
//     console.log('mult fail:', e);
//   } else {
//     throw e;
//   }
// }

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
      return primitiveMultiply(a, b);
    } catch (e) {
      if (!(e instanceof MultiplicatorUnitFailure)) throw e;
      else {
        console.log(e.message);
      }
    }
  }
}

// console.log(reliableMultiply(8, 8));

// The locked box
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
  },
};

function withBoxUnlocked(body) {
  let locked = box.locked;
  if (!locked) {
    return body();
  } // laeving it unlocked if already unlocked

  box.unlock();
  try {
    return body();
  } finally {
    box.lock();
  }
}

withBoxUnlocked(function () {
  box.content.push('gold piece');
  console.log(box.content);
});

try {
  withBoxUnlocked(function () {
    throw new Error('Pirates on the horizon! Abort!');
  });
} catch (e) {
  console.log('Error raised: ' + e);
}
console.log(box.locked);
// → true
