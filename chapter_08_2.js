// 'use strict';

let arr = ['a', 'b', 'c', 'd', 'e'];
let item = 'bananana';
console.log(item);
for (item of arr) {
  console.log(item);
}
console.log(item);
// with 'use strict'; at the top of the file it gives an error "item is not defined"
// otherwise it just works because JS silently creates a global binding
// Danger is if the binding already exists it'll overwrite it.
// bananana
// a
// b
// c
// d
// e
// e
function Person(name) {
  this.name = name; // with strict mode on it says TypeError: Cannot set property 'name' of undefined
}

let ferdinand = Person('Ferdinand');
// console.log(ferdinand.name); // TypeError: Cannot read property 'name' of undefined
console.log(name);
