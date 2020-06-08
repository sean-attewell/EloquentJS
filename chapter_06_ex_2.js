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

console.log(new Vec(1, 2).plus(new Vec(2, 3)));
// → Vec{x: 3, y: 5}
console.log(new Vec(1, 2).minus(new Vec(2, 3)));
// → Vec{x: -1, y: -1}
console.log(new Vec(3, 4).length);
// → 5
