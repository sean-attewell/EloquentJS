class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(otherVector) {
    return new Vec(this.x + otherVector.x, this.y + otherVector.y);
  }

  minus(otherVector) {
    return new Vec(this.x - otherVector.x, this.y - otherVector.y);
  }

  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
}

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5

class Group {
  constructor() {
    this.members = [];
  }

  has(value) {
    return this.members.includes(value);
  }

  add(value) {
    if (!this.has(value)) {
      this.members.push(value);
    }
  }

  delete(value) {
    this.members = this.members.filter(v => v !== value);
  }

  static from(iterable) {
    let group = new Group();
    for (let val of iterable) {
      group.add(val);
    }
    return group;
  }

  [Symbol.iterator]() {
    return new GroupIterator(this);
  }
}

class GroupIterator {
  constructor(group) {
    this.group = group;
    this.position = 0;
  }

  next() {
    if (this.position >= this.group.members.length) {
      return { done: true };
    } else {
      let result = { value: this.group.members[this.position], done: false };
      this.position++;
      return result;
    }
  }
}

let group = Group.from([10, 20]);
console.log(group.has(10));
// → true
console.log(group.has(30));
// → false
group.add(10);
group.delete(10);
console.log(group.has(10));
// → false

for (let value of Group.from(['a', 'b', 'c'])) {
  console.log(value);
}

// Borrowing a method
// Earlier in the chapter I mentioned that an object’s hasOwnProperty can be used as a more robust alternative to the in operator
// when you want to ignore the prototype’s properties. But what if your map needs to include the word "hasOwnProperty"? You won’t be
// able to call that method anymore because the object’s own property hides the method value.

// Can you think of a way to call hasOwnProperty on an object that has its own property by that name?

let map = { one: true, two: true, hasOwnProperty: true };

console.log(Object.prototype.hasOwnProperty.call(map, 'one'));
// → true
