// Data Structures: Objects and Arrays

// Objects allow us to group values—including other objects—to build more complex structures.

let listOfNumbers = [2, 3, 5, 7, 11];

console.log(listOfNumbers[2]);
// → 5
console.log(listOfNumbers[0]);
// → 2
console.log(listOfNumbers[2 - 1]);
// → 3

// Think of the index as the amount of items to skip, counting from the start of the array.

console.log(listOfNumbers['length']); // same as listOfNumbers.length

// Almost all JavaScript values have properties. The exceptions are null and undefined.
// If you try to access a property on one of these nonvalues, you get an error

// The two main ways to access properties in JavaScript are with a dot and with square brackets. Both value.x and value[x] access a
// property on value—but not necessarily the same property. The difference is in how x is interpreted. When using a dot, the word
// after the dot is the literal name of the property. When using square brackets, the expression between the brackets is evaluated
// to get the property name. Whereas value.x fetches the property of value named “x”, value[x] tries to evaluate the expression x and
// uses the result, converted to a string, as the property name. (so x could be a variable referring to the string in the square bracket notation).

// So if you know that the property you are interested in is called color, you say value.color. If you want to extract the property
// named by the value held in the binding i, you say value[i]. Property names are strings. They can be any string, but the dot
// notation works only with names that look like valid binding names. So if you want to access a property named 2 or John Doe, you
// must use square brackets: value[2] or value["John Doe"].

// The elements in an array are stored as the array’s properties, using numbers as property names. Because you can’t use the dot
// notation with numbers and usually want to use a binding that holds the index anyway, you have to use the bracket notation to get at them.

// The length property of an array tells us how many elements it has. This property name is a valid binding name, and
// we know its name in advance, so to find the length of an array, you typically write array.length because that’s
// easier to write than array["length"].

// Methods
// Both string and array objects contain, in addition to the length property, a number of properties that hold function values.

let doh = 'Doh';
console.log(typeof doh.toUpperCase);
// → function
console.log(doh.toUpperCase());
// → DOH

// Every string has a toUpperCase property. When called, it will return a copy of the string in which all letters have been converted
// to uppercase. There is also toLowerCase, going the other way.

// Interestingly, even though the call to toUpperCase does not pass any arguments, the function somehow has access to the string "Doh",
// the value whose property we called. How this works is described in Chapter 6.

// Properties that contain functions are generally called methods of the value they belong to, as in “toUpperCase is a method of a string”.

// This example demonstrates two methods you can use to manipulate arrays:

let sequence = [1, 2, 3];
sequence.push(4);
sequence.push(5);
console.log(sequence);
// → [1, 2, 3, 4, 5]
console.log(sequence.pop());
// → 5
console.log(sequence);
// → [1, 2, 3, 4]
// The push method adds values to the end of an array, and the pop method does the opposite, removing the last value in the array and returning it.

// These somewhat silly names are the traditional terms for operations on a stack. A stack, in programming, is a data structure that allows
// you to push values into it and pop them out again in the opposite order so that the thing that was added last is removed first.
// These are common in programming—you might remember the function call stack from the previous chapter, which is an instance of the same idea.

// Objects
// Back to the weresquirrel. A set of daily log entries can be represented as an array. But the entries do not consist of just a number or a
// string — each entry needs to store a list of activities and a Boolean value that indicates whether Jacques turned into a squirrel or not.
// Ideally, we would like to group these together into a single value and then put those grouped values into an array of log entries.

// Values of the type object are arbitrary collections of properties. One way to create an object is by using braces as an expression.

let day1 = {
  squirrel: false,
  events: ['work', 'touched tree', 'pizza', 'running']
};
console.log(day1.squirrel);
// → false
console.log(day1['squirrel']);
// → false
console.log(day1.wolf);
// → undefined
day1.wolf = false;
console.log(day1.wolf);
// → false

// Inside the braces, there is a list of properties separated by commas. Each property has a name followed by a colon and a value. When
// an object is written over multiple lines, indenting it like in the example helps with readability. Properties whose names aren’t
// valid binding names or valid numbers have to be quoted.

let descriptions = {
  work: 'Went to work',
  'touched tree': 'Touched a tree'
};

// This means that braces have two meanings in JavaScript. At the start of a statement, they start a block of statements. In any other
// position, they describe an object. Fortunately, it is rarely useful to start a statement with an object in braces, so the ambiguity
// between these two is not much of a problem.

// Reading a property that doesn’t exist will give you the value undefined.

// It is possible to assign a value to a property expression with the = operator. This will replace the property’s value if it already existed
// or create a new property on the object if it didn’t.

// To briefly return to our tentacle model of bindings—property bindings are similar. They grasp values, but other bindings and properties
// might be holding onto those same values. You may think of objects as octopuses with any number of tentacles, each of which has a name tattooed on it.

// The delete operator cuts off a tentacle from such an octopus. It is a unary operator that, when applied to an object property,
// will remove the named property from the object. This is not a common thing to do, but it is possible.

let anObject = { left: 1, right: 2 };
console.log(anObject.left);
// → 1
delete anObject.left;
console.log(anObject.left);
// → undefined
console.log('left' in anObject);
// → false
console.log('right' in anObject);
// → true
// The binary in operator, when applied to a string and an object, tells you whether that object has a property with that name.
// The difference between setting a property to undefined and actually deleting it is that, in the first case, the object still
// has the property (it just doesn’t have a very interesting value), whereas in the second case the property is no longer present and in will return false.

// To find out what properties an object has, you can use the Object.keys function. You give it an object, and it returns an array
// of strings—the object’s property names.

console.log(Object.keys({ x: 0, y: 0, z: 2 }));
// → ["x", "y", "z"]

// There’s an Object.assign function that copies all properties from one object into another.
let objectA = { a: 1, b: 2 };
Object.assign(objectA, { b: 3, c: 4 });
console.log(objectA);

// → {a: 1, b: 3, c: 4}

// Arrays, then, are just a kind of object specialized for storing sequences of things. If you evaluate typeof [], it produces "object".
// You can see them as long, flat octopuses with all their tentacles in a neat row, labeled with numbers.

// Mutability
// We will get to actual programming real soon now. First there’s one more piece of theory to understand.

// We saw that object values can be modified. The types of values discussed in earlier chapters, such as numbers, strings,
// and Booleans, are all immutable—it is impossible to change values of those types. You can combine them and derive new
// values from them, but when you take a specific string value, that value will always remain the same. The text inside it
// cannot be changed. If you have a string that contains "cat", it is not possible for other code to change a character
// in your string to make it spell "rat".

// Objects work differently. You can change their properties, causing a single object value to have different content at different times.

// When we have two numbers, 120 and 120, we can consider them precisely the same number, whether or not they refer
// to the same physical bits. With objects, there is a difference between having two references to the same object and
// having two different objects that contain the same properties. Consider the following code:

let object1 = { value: 10 };
let object2 = object1;
let object3 = { value: 10 };

console.log(object1 == object2);
// → true
console.log(object1 == object3);
// → false

object1.value = 15;
console.log(object2.value);
// → 15
console.log(object3.value);
// → 10

// The object1 and object2 bindings grasp the same object, which is why changing object1 also changes the value of object2.
// They are said to have the same identity. The binding object3 points to a different object, which initially contains the same
// properties as object1 but lives a separate life.

// Bindings can also be changeable or constant, but this is separate from the way their values behave. Even though number values don’t change,
// you can use a let binding to keep track of a changing number by changing the value the binding points at. Similarly, though a const
// binding to an object can itself not be changed and will continue to point at the same object, the contents of that object might change.

const score = { visitors: 0, home: 0 };
// This is okay
score.visitors = 1;
// This isn't allowed
// score = { visitors: 1, home: 1 };

// When you compare objects with JavaScript’s == operator, it compares by identity: it will produce true only if both objects are
// precisely the same value. Comparing different objects will return false, even if they have identical properties. There is no “deep”
// comparison operation built into JavaScript, which compares objects by contents, but it is possible to write it yourself (which is
// one of the exercises at the end of this chapter).
