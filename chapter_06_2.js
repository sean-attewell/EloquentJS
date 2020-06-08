class Matrix {
  constructor(width, height, element = (x, y) => undefined) {
    this.width = width;
    this.height = height;
    this.content = [];
    for (let y = 0; y < height; y++) {
      for (let x = 0; x < width; x++) {
        this.content[y * width + x] = element(x, y);
      }
    }
  }
  get(x, y) {
    return this.content[y * this.width + x];
  }
  set(x, y, value) {
    this.content[y * this.width + x] = value;
  }
}

let threematrix = new Matrix(3, 3, (x, y) => Math.round(Math.random() * 10));
// console.log(threematrix)
// console.log(threematrix.width)
// console.log(threematrix.height)
// console.log(threematrix.content)

// console.log(threematrix.get(2,1))
// threematrix.set(2,1, 'bannana')
// console.log(threematrix.get(2,1))
console.log(threematrix);

class MatrixIterator {
  constructor(matrix) {
    this.x = 0;
    this.y = 0;
    this.matrix = matrix;
  }

  next() {
    if (this.y == this.matrix.height) return { done: true };

    let value = { x: this.x, y: this.y, value: this.matrix.get(this.x, this.y) };

    this.x++;

    if (this.x == this.matrix.width) {
      this.x = 0;
      this.y++;
    }
    return { value, done: false };
  }
}

Matrix.prototype[Symbol.iterator] = function () {
  return new MatrixIterator(this);
};

for (let { x, y, value } of threematrix) {
  console.log(x, y, value);
}

console.log(Array(8, 9, 9));
