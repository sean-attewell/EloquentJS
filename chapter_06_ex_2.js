class Vec {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  plus(vecToAdd) {
    return new Vec(vecToAdd.x + this.x, vecToAdd.y + this.y);
  }
  minus(vecToSubtract) {
    return new Vec(this.x - vecToSubtract.x, this.y - vecToSubtract.y);
  }
  get length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  // Getter must not have any formal parameters.
}

// console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
// console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
// console.log(new Vec(3, 4).length);
// → 5

// ********************

class Group {
  constructor() {
    this.group = [];
  }
  add(value) {
    if (this.group.includes(value) === false) {
      this.group.push(value);
      console.log(`added ${value} to group: ${this.group}`);
    } else {
      console.log(`Can't add a value already in the group: ${this.group}`);
    }
    // concat makes new array, so use push
  }
  delete(value) {
    if (this.group.includes(value) === true) {
      this.group = this.group.filter((element) => element !== value);
      console.log(`${value} has been deleted`);
    } else {
      console.log(`No ${value} to be deleted`);
    }
  }
  has(value) {
    return this.group.includes(value);
  }
  static from(iterableObject) {
    let newGroup = new Group();
    for (let item of iterableObject) {
      // Important to remember let in for loop
      newGroup.add(item);
    }
    return newGroup;
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
    if (this.position >= this.group.group.length) {
      return { done: true };
    } else {
      let result = { value: this.group.group[this.position], done: false };
      this.position++;
      return result;
    }
  }
}

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

// map.hasOwnProperty('one'); <-- Indeed the property does cover the function in the prototype
// It gives --> TypeError: map.hasOwnProperty is not a function

// let blah = [5, 4, 'cat'];
// console.log(blah.includes('bat'));

// let newGroup = new Group();
// newGroup.add(5);
// newGroup.add(5);
// newGroup.add('Cat');
// console.log(newGroup.has('Cat'));
// console.log(newGroup.has('bat'));
// console.log(newGroup.has(5));
// newGroup.delete(34);
// newGroup.delete('Cat');
// console.log(newGroup.group);
// let newGroup2 = Group.from(['a', 'b', 1, 3]);
// console.log(newGroup2.group);

// let newarr = [];

// for (item of blah) {
//   console.log(item);
//   newarr.push(item);
// }
// console.log(newarr);
