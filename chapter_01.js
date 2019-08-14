// A typical modern computer has more than 30 billion bits in its volatile data storage (working memory).
// Nonvolatile storage (the hard disk or equivalent) tends to have yet a few orders of magnitude more.

/* To be able to work with such quantities of bits without getting lost, we must separate them into chunks that represent pieces of information. 
In a JavaScript environment, those chunks are called values */

/* Though all values are made of bits, they play different roles. Every value has a type that determines its role. 
Some values are numbers, some values are pieces of text, some values are functions, and so on. */

// As soon as you no longer use a value, it will dissipate, leaving behind its bits to be recycled as building material for the next generation of values.

// JavaScript uses a fixed number of bits, 64 of them, to store a single number value.
// given 64 binary digits, you can represent 2^64 different numbers, which is about 18 quintillion (an 18 with 18 zeros after it).

// Not all whole numbers less than 18 quintillion fit in a JavaScript number, though. Those bits also store negative numbers,
// so one bit indicates the sign of the number. A bigger issue is that nonwhole numbers must also be represented. To do this, some of the bits are used
// to store the position of the decimal point. The actual maximum whole number that can be stored is more in the
// range of 9 quadrillion (15 zeros)—which is still pleasantly huge.

// For very big or very small numbers, you may also use scientific notation by adding an e (for exponent), followed by the exponent of the number:

console.log(2.998e8);
// That is 2.998 × 10^8 = 299,800,000.

// Just as π (pi) cannot be precisely expressed by a finite number of decimal digits, many numbers lose some precision when only 64
// bits are available to store them. This is a shame, but it causes practical problems only in specific situations. The important thing
// is to be aware of it and treat fractional digital numbers as approximations, not as precise values.

// The % symbol is used to represent the remainder operation. X % Y is the remainder of dividing X by Y.
// For example, 314 % 100 produces 14, and 144 % 12 gives 0. The remainder operator’s precedence is the same
// as that of multiplication and division. You’ll also often see this operator referred to as modulo.

// There are three special values in JavaScript that are considered numbers but don’t behave like normal numbers.

// The first two are Infinity and -Infinity, which represent the positive and negative infinities. Infinity - 1 is still Infinity, and so on.
// Don’t put too much trust in infinity-based computation, though. It isn’t mathematically sound, and it will quickly lead to the next special number: NaN.

// NaN stands for “not a number”, even though it is a value of the number type. You’ll get this result when you, for example, try to calculate
// 0 / 0 (zero divided by zero), Infinity - Infinity, or any number of other numeric operations that don’t yield a meaningful result.

// You can use single quotes, double quotes, or backticks to mark strings, as long as the quotes at the start and the end of the string match.
// Newlines (the characters you get when you press enter) can be included *without* escaping only when the string is quoted with backticks (`).

let newline = 'This is the first line\nAnd this is the second';
console.log(newline);
console.log('A newline character is written like "\\n".');

// Strings, too, have to be modeled as a series of bits to be able to exist inside the computer.
// The way JavaScript does this is based on the Unicode standard. This standard assigns a number to virtually
// every character you would ever need, including characters from Greek, Arabic, Japanese, Armenian, and so on

// But there’s a complication: JavaScript’s representation uses 16 bits per string element, which can describe up to 216 different characters.
// But Unicode defines more characters than that—about twice as many, at this point. So some characters, such as many emoji,
// take up two “character positions” in JavaScript strings.

let concatenate = 'con' + 'cat' + 'e' + 'nate';

console.log(concatenate);

// Backtick-quoted strings, usually called template literals, can do a few more tricks. Apart from being able to span lines,
// they can also embed other values.

console.log(`half of 100 is ${100 / 2}`);
// its result will be computed, converted to a string, and included at that position.

// Not all operators are symbols. Some are written as words. One example is the typeof operator, which produces a string value
// naming the type of the value you give it.

console.log(typeof 4.5);
// → number
console.log(typeof 'x');
// → string
console.log(typeof NaN);
// → number
console.log(typeof `${100 / 2}`);
// → string

// Operators that use two values are called binary operators, while those that take one are called unary operators.
// The minus operator can be used both as a binary operator and as a unary operator.

console.log(-(10 - 2));
// → -8

// Here is one way to produce Boolean values:

console.log(3 > 2);
// → true
console.log(3 < 2);
// → false

// Strings can be compared in the same way.

console.log('Aardvark' < 'Zoroaster');
// → true

// The way strings are ordered is roughly alphabetic but not really what you’d expect to see in a dictionary:
// uppercase letters are always “less” than lowercase ones, so "Z" < "a", and nonalphabetic characters (!, -, and so on)
// are also included in the ordering. When comparing strings, JavaScript goes over the characters from left to right,
// comparing the Unicode codes one by one.

// Other similar operators are >= (greater than or equal to), <= (less than or equal to), == (equal to), and != (not equal to).

console.log('Itchy' != 'Scratchy');
// → true
console.log('Apple' == 'Orange');
// → false

// There is only one value in JavaScript that is not equal to itself, and that is NaN (“not a number”).
console.log(NaN == NaN);
// → false
// NaN is supposed to denote the result of a nonsensical computation, and as such, it isn’t equal to the result of any other nonsensical computations.

// JavaScript supports three logical operators: and, or, and not. These can be used to “reason” about Booleans.

//The && operator represents logical and. It is a binary operator, and its result is true only if both the values given to it are true.
console.log(true && false);
// → false
console.log(true && true);
// → true

// The || operator denotes logical or. It produces true if either of the values given to it is true.
console.log(false || true);
// → true
console.log(false || false);
// → false

// Not is written as an exclamation mark (!). It is a unary operator that flips the value given to it

// When mixing these Boolean operators with arithmetic and other operators, it is not always obvious when parentheses are needed.
// In practice, you can usually get by with knowing that of the operators we have seen so far, || has the lowest precedence,
// then comes &&, then the comparison operators (>, ==, and so on), and then the rest. This order has been chosen such that,
// in typical expressions like the following one, as few parentheses as possible are necessary:

console.log(1 + 1 == 2 && 10 * 10 > 50);
// → true

// The last logical operator I will discuss is not unary, not binary, but ternary, operating on three values.
// It is written with a question mark and a colon, like this:

console.log(true ? 1 : 2);
// → 1
console.log(false ? 1 : 2);
// → 2

// This one is called the conditional operator (or sometimes just the ternary operator since it is the only such
// operator in the language). The value on the left of the question mark “picks” which of the other two values will
// come out. When it is true, it chooses the middle value, and when it is false, it chooses the value on the right.

// Empty values
// There are two special values, written null and undefined, that are used to denote the absence of a meaningful value.
// They are themselves values, but they carry no information.

// Many operations in the language that don’t produce a meaningful value (you’ll see some later) yield undefined simply because
// they have to yield some value.

// The difference in meaning between undefined and null is an accident of JavaScript’s design, and it doesn’t matter most of the time.
// In cases where you actually have to concern yourself with these values, I recommend treating them as mostly interchangeable.

// Automatic type conversion
// In the Introduction, I mentioned that JavaScript goes out of its way to accept almost any program you give it, even programs that do odd things.
// This is nicely demonstrated by the following expressions:

console.log(8 * null);
// → 0
console.log('5' - 1);
// → 4
console.log('5' + 1);
// → 51
console.log('five' * 2);
// → NaN
console.log(false == 0);
// → true

// When an operator is applied to the “wrong” type of value, JavaScript will quietly convert that value to the type it needs,
// using a set of rules that often aren’t what you want or expect. This is called type coercion. The null in the first
// expression becomes 0, and the "5" in the second expression becomes 5 (from string to number). Yet in the third expression,
// + tries string concatenation before numeric addition, so the 1 is converted to "1" (from number to string).

// When something that doesn’t map to a number in an obvious way (such as "five" or undefined) is converted to a number, you get the value NaN.
// Further arithmetic operations on NaN keep producing NaN, so if you find yourself getting one of those in an unexpected place, look for
// accidental type conversions.

// When comparing values of the same type using ==, the outcome is easy to predict: you should get true when both values are the same,
// except in the case of NaN. But when the types differ, JavaScript uses a complicated and confusing set of rules to determine what to do.
// In most cases, it just tries to convert one of the values to the other value’s type. However, when null or undefined occurs on
// either side of the operator, it produces true only if both sides are one of null or undefined.

console.log(null == undefined);
// → true
console.log(null == 0);
// → false

// That behavior is often useful. When you want to test whether a value has a real value instead of null or undefined,
// you can compare it to null with the == (or !=) operator.

// But what if you want to test whether something refers to the precise value false? Expressions like 0 == false and "" ==
// false are also true because of automatic type conversion. When you do not want any type conversions to happen, there are two additional operators:
// === and !==. The first tests whether a
// value is precisely equal to the other, and the second tests whether it is not precisely equal. So "" === false is false as expected.

// I recommend using the three-character comparison operators defensively to prevent unexpected type conversions from tripping you up.

// Short-circuiting of logical operators (whether you compare values of a type that's boolean or not)

// The logical operators && and || handle *values of different types* in a peculiar way. They will convert the value on their left side to Boolean type
// in order to decide what to do, but depending on the operator and the result of that conversion, they will return either the original left-hand
// value or the right-hand value.

// The || operator, for example, will return the value to its left when that can be converted to true and will return the value on its right otherwise.
// This has the expected effect when the values are Boolean and does something analogous for values of other types.

console.log(null || 'user');
// → user
console.log('Agnes' || 'user');
// → Agnes

// We can use this functionality as a way to fall back on a default value. If you have a value that might be empty,
// you can put || after it with a replacement value. If the initial value can be converted to false, you’ll get the replacement instead.
// The rules for converting strings and numbers to Boolean values state that 0, NaN, and the empty string ("") count as false, while all
// the other values count as true. So 0 || -1 produces -1, and "" || "!?" yields "!?".

// The && operator works similarly but the other way around. When the value to its left is something that converts to false, it returns that value,
// and otherwise it returns the value on its right.
// e.g. {this.props.adventureBeingEditedId && <AdventureEditForm />}

// Another important property of these two operators is that the part to their right is evaluated only when necessary.
// In the case of true || X, no matter what X is—even if it’s a piece of program that does something terrible—the result will be true,
// and X is never evaluated. The same goes for false && X, which is false and will ignore X. This is called short-circuit evaluation.

// The conditional (ternary) operator works in a similar way. Of the second and third values, only the one that is selected is evaluated.

// ***************************************************************************************************************************************************
// We saw binary operators for arithmetic (+, -, *, /, and %), string concatenation (+), comparison (==, !=, ===, !==, <, >, <=, >=),
// and logic (&&, ||),

// as well as several unary operators (- to negate a number, ! to negate logically, and typeof to find a value’s type)

// and a ternary operator (?:) to pick one of two values based on a third value.
// ***************************************************************************************************************************************************
