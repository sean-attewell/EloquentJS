// Regular Expressions

// "Yuan-Ma said, ‘When you cut against the grain of the wood, much strength is needed. When you program against the grain of the problem,
// much code is needed.’

// Regular expressions are a way to describe patterns in string data. They form a small, separate language that is part of JavaScript and many
// other languages and systems.

// Regular expressions are both terribly awkward and extremely useful. Their syntax is cryptic, and the programming interface JavaScript
// provides for them is clumsy. But they are a powerful tool for inspecting and processing strings. Properly understanding regular expressions
// will make you a more effective programmer.

// Creating a regular expression

// A regular expression is a type of object. It can be either constructed with the RegExp constructor or written as a literal
// value by enclosing a pattern in forward slash (/) characters.

let re1 = new RegExp('abc');
let re2 = /abc/;

// Both of those regular expression objects represent the same pattern: an a character followed by a b followed by a c.

// When using the RegExp constructor, the pattern is written as a normal string, so the usual rules apply for backslashes.

// The second notation, where the pattern appears between slash characters, treats backslashes somewhat differently. First, since
// a forward slash ends the pattern, we need to put a backslash before any forward slash that we want to be part of the pattern.
// In addition, backslashes that aren’t part of special character codes (like \n) will be preserved, rather than ignored as
// they are in strings, and change the meaning of the pattern. Some characters, such as question marks and plus signs,
// have special meanings in regular expressions and must be preceded by a backslash if they are meant to represent the character itself.

// let eighteenPlus = /eighteen\+/;

// Testing for matches
// Regular expression objects have a number of methods. The simplest one is test. If you pass it a string, it will return a Boolean
// telling you whether the string contains a match of the pattern in the expression.

console.log(/abc/.test('abcde'));
// → true
console.log(/abc/.test('abxde'));
// → false

// A regular expression consisting of only nonspecial characters simply represents that sequence of characters. If abc occurs anywhere
// in the string we are testing against (not just at the start), test will return true.

console.log(/[0123456789]/.test('in 1992'));
// → true
console.log(/[0-9]/.test('in 1992'));
// → true

// \d	Any digit character
// \w	An alphanumeric character (“word character”)
// \s	Any whitespace character (space, tab, newline, and similar)
// \D	A character that is not a digit
// \W	A nonalphanumeric character
// \S	A nonwhitespace character
// .	Any character except for newline

let dateTime = /\d\d-\d\d-\d\d\d\d \d\d:\d\d/;
console.log(dateTime.test('01-30-2003 15:20'));
// → true
console.log(dateTime.test('30-jan-2003 15:20'));
// → false

// These backslash codes can also be used inside square brackets. For example, [\d.] means any digit or a period character.
// But the period itself, between square brackets, loses its special meaning. The same goes for other special characters, such as +.

// To invert a set of characters—that is, to express that you want to match any character except the ones in the set—you can write
// a caret (^) character after the opening bracket.

let notBinary = /[^01]/;

console.log(notBinary.test('1100100010100110'));
// → false
console.log(notBinary.test('1100100010200110'));
// → true

// When you put a plus sign (+) after something in a regular expression, it indicates that the element may be repeated more than once.
// Thus, /\d+/ matches one or more digit characters.

console.log(/'\d+'/.test("'123'"));
// → true
console.log(/'\d+'/.test("''"));
// → false
console.log(/'\d*'/.test("'123'"));
// → true
console.log(/'\d*'/.test("''"));
// → true

// The star (*) has a similar meaning but also allows the pattern to match zero times. Something with a star after it never prevents
// a pattern from matching—it’ll just match zero instances if it can’t find any suitable text to match.

// A question mark makes a part of a pattern optional, meaning it may occur zero times or one time. In the following example, the u
// character is allowed to occur, but the pattern also matches when it is missing.

let neighbor = /neighbou?r/;

console.log(neighbor.test('neighbour'));
// → true
console.log(neighbor.test('neighbor'));
// → true

// To indicate that a pattern should occur a precise number of times, use braces. Putting {4} after an element, for example,
// requires it to occur exactly four times. It is also possible to specify a range this way: {2,4} means the element must occur at
// least twice and at most four times.

// Here is another version of the date and time pattern that allows both single- and double-digit days, months, and hours. It is also
// slightly easier to decipher.

let dateTime2 = /\d{1,2}-\d{1,2}-\d{4} \d{1,2}:\d{2}/;
console.log(dateTime2.test('1-30-2003 8:45'));
// → true

// You can also specify open-ended ranges when using braces by omitting the number after the comma. So, {5,} means five or more times.

// Grouping subexpressions
let cartoonCrying = /boo+(hoo+)+/i;
console.log(cartoonCrying.test('Boohoooohoohooo'));
// → true

// Matches and groups

// The test method is the absolute simplest way to match a regular expression. It tells you only whether it matched and nothing else.
// Regular expressions also have an exec (execute) method that will return null if no match was found and return an object with
// information about the match otherwise.

let match = /\d+/.exec('one two 100');
console.log(match);
// → [ '100', index: 8, input: 'one two 100', groups: undefined ]
console.log(match.index);
// → 8

// An object returned from exec has an index property that tells us where in the string the successful match begins.
// Other than that, the object looks like (and in fact is) an array of strings, whose first element is the string that
// was matched. In the previous example, this is the sequence of digits that we were looking for.

// String values have a match method that behaves similarly.

console.log('one two 100'.match(/\d+/));
// → [ '100', index: 8, input: 'one two 100', groups: undefined ]

// When the regular expression contains subexpressions grouped with parentheses, the text that matched those groups
// will also show up in the array. The whole match is always the first element. The next element is the part matched
// by the first group (the one whose opening parenthesis comes first in the expression), then the second group, and so on.

let quotedText = /'([^']*)'/;
console.log(quotedText.exec("she said 'hello'"));
// → ["'hello'", "hello"]

// When a group does not end up being matched at all (for example, when followed by a question mark), its position in the
// output array will hold undefined. Similarly, when a group is matched multiple times, only the last match ends up in the array.

console.log(/bad(ly)?/.exec('bad'));
// → ["bad", undefined]
console.log(/(\d)+/.exec('123'));
// → ["123", "3"]

// Groups can be useful for extracting parts of a string. If we don’t just want to verify whether a string contains a date but also
// extract it and construct an object that represents it, we can wrap parentheses around the digit patterns and directly pick the
// date out of the result of exec.

// But first we’ll take a brief detour, in which we discuss the built-in way to represent date and time values in JavaScript.

// The Date class

// JavaScript has a standard class for representing dates—or, rather, points in time. It is called Date.
// If you simply create a date object using new, you get the current date and time.

console.log(new Date());
// → Mon Nov 13 2017 16:19:11 GMT+0100 (CET)

// You can also create an object for a specific time.

console.log(new Date(2009, 11, 9));
// → Wed Dec 09 2009 00:00:00 GMT+0100 (CET)
console.log(new Date(2009, 11, 9, 12, 59, 59, 999));
// → Wed Dec 09 2009 12:59:59 GMT+0100 (CET)

// JavaScript uses a convention where month numbers start at zero (so December is 11), yet day numbers start at one.
// This is confusing and silly. Be careful.

// The last four arguments (hours, minutes, seconds, and milliseconds) are optional and taken to be zero when not given.

// Timestamps are stored as the number of milliseconds since the start of 1970, in the UTC time zone. This follows a convention
// set by “Unix time”, which was invented around that time. You can use negative numbers for times before 1970. The getTime
// method on a date object returns this number. It is big, as you can imagine.

console.log(new Date(2013, 11, 19).getTime());
// → 1387407600000
console.log(new Date(1387407600000));
// → Thu Dec 19 2013 00:00:00 GMT+0100 (CET)

// If you give the Date constructor a single argument, that argument is treated as such a millisecond count. You can get
// the current millisecond count by creating a new Date object and calling getTime on it or by calling the Date.now function.

// Date objects provide methods such as getFullYear, getMonth, getDate, getHours, getMinutes, and getSeconds to extract their
// components. Besides getFullYear there’s also getYear, which gives you the year minus 1900 (98 or 119) and is mostly useless.

// Putting parentheses around the parts of the expression that we are interested in, we can now create a date object from a string.

function getDate(string) {
  let [_, month, day, year] = /(\d{1,2})-(\d{1,2})-(\d{4})/.exec(string);
  console.log(_);
  return new Date(year, month - 1, day);
}
console.log(getDate("some random crap, but here's a date 1-30-2003"));
// → Thu Jan 30 2003 00:00:00 GMT+0100 (CET)

// The _ (underscore) binding is ignored and used only to skip the full match element in the array returned by exec.

// Word and string boundaries
// Unfortunately, getDate will also happily extract the nonsensical date 00-1-3000 from the string "100-1-30000".
// A match may happen anywhere in the string, so in this case, it’ll just start at the second character and end at the second-to-last character.

// If we want to enforce that the match must span the whole string, we can add the markers ^ and $. The caret matches
// the start of the input string, whereas the dollar sign matches the end. So, /^\d+$/ matches a string consisting entirely
// of one or more digits, /^!/ matches any string that starts with an exclamation mark, and /x^/ does not match any string
// (there cannot be an x before the start of the string).

// If, on the other hand, we just want to make sure the date starts and ends on a word boundary, we can use the marker \b. A word
// boundary can be the start or end of the string or any point in the string that has a word character (as in \w) on one side and a
// nonword character on the other.

console.log(/cat/.test('concatenate'));
// → true
console.log(/\bcat\b/.test('concatenate'));
// → false

// Note that a boundary marker doesn’t match an actual character. It just enforces that the regular expression
// matches only when a certain condition holds at the place where it appears in the pattern.

// Choice patterns
// Say we want to know whether a piece of text contains not only a number but a number followed by one of the words pig,
// cow, or chicken, or any of their plural forms.

// We could write three regular expressions and test them in turn, but there is a nicer way. The pipe character (|) denotes a
// choice between the pattern to its left and the pattern to its right. So I can say this:

let animalCount = /\b\d+ (pig|cow|chicken)s?\b/;

console.log(animalCount.test('15 pigs'));
// → true
console.log(animalCount.test('15 pigchickens'));
// → false

// Parentheses can be used to limit the part of the pattern that the pipe operator applies to, and you can put multiple such
// operators next to each other to express a choice between more than two alternatives.

// The end of a string counts as a word boundary

// The mechanics of matching
// Conceptually, when you use exec or test, the regular expression engine looks for a match in your string by trying to match the expression
// first from the start of the string, then from the second character, and so on, until it finds a match or reaches the end of the string.
// It’ll either return the first match that can be found or fail to find any match at all.

// The matcher stops as soon as it finds a full match. This means that if multiple branches could potentially match a string, only the first one
// (ordered by where the branches appear in the regular expression) is used.

// Backtracking also happens for repetition operators like + and *. If you match /^.*x/ against "abcxe", the .* part will first try to consume
// the whole string. The engine will then realize that it needs an x to match the pattern. Since there is no x past the end of the string, the
// star operator tries to match one character less. But the matcher doesn’t find an x after abcx either, so it backtracks again, matching the
// star operator to just abc. Now it finds an x where it needs it and reports a successful match from positions 0 to 4.

// It is possible to write regular expressions that will do a lot of backtracking. This problem occurs when a pattern can match a piece of input
// in many different ways. For example, if we get confused while writing a binary-number regular expression, we might accidentally write
// something like /([01]+)+b/.

// If that tries to match some long series of zeros and ones with no trailing b character, the matcher first goes through the inner loop
// until it runs out of digits. Then it notices there is no b, so it backtracks one position, goes through the outer loop once, and gives up
// again, trying to backtrack out of the inner loop once more. It will continue to try every possible route through these two loops. This
// means the amount of work doubles with each additional character. For even just a few dozen characters, the resulting match will take practically forever.

// The replace method

// String values have a replace method that can be used to replace part of the string with another string.

console.log('papa'.replace('p', 'm'));
// → mapa

// The first argument can also be a regular expression, in which case the first match of the regular expression is replaced.
// When a g option (for global) is added to the regular expression, all matches in the string will be replaced, not just the first.

console.log('Borobudur'.replace(/[ou]/, 'a'));
// → Barobudur
console.log('Borobudur'.replace(/[ou]/g, 'a'));
// → Barabadar

// It would have been sensible if the choice between replacing one match or all matches was made through an additional
// argument to replace or by providing a different method, replaceAll. But for some unfortunate reason, the choice relies on a
// property of the regular expression instead.

// The real power of using regular expressions with replace comes from the fact that we can refer to matched groups in the replacement string.
// For example, say we have a big string containing the names of people, one name per line, in the format Lastname, Firstname.
// If we want to swap these names and remove the comma to get a Firstname Lastname format, we can use the following code:

console.log('Liskov, Barbara\nMcCarthy, John\nWadler, Philip'.replace(/(\w+), (\w+)/g, '$2 $1'));
// → Barbara Liskov
//   John McCarthy
//   Philip Wadler

// The $1 and $2 in the replacement string refer to the parenthesized groups in the pattern. $1 is replaced by the text that
// matched against the first group, $2 by the second, and so on, up to $9. The whole match can be referred to with $&.

// It is possible to pass a function—rather than a string—as the second argument to replace. For each replacement, the function
// will be called with the matched groups (as well as the whole match) as arguments, and its return value will be inserted into the new string.

// Here’s a small example:

let s = 'the cia and fbi';
console.log(s.replace(/\b(fbi|cia)\b/g, str => str.toUpperCase()));
// → the CIA and FBI

// Here’s a more interesting one:

let stock = '1 lemon, 2 cabbages, and 101 eggs';
function minusOne(match, amount, unit) {
  amount = Number(amount) - 1;
  if (amount == 1) {
    // only one left, remove the 's'
    unit = unit.slice(0, unit.length - 1);
  } else if (amount == 0) {
    amount = 'no';
  }
  return amount + ' ' + unit;
}
console.log(stock.replace(/(\d+) (\w+)/g, minusOne));
// → no lemon, 1 cabbage, and 100 eggs
// This takes a string, finds all occurrences of a number followed by an alphanumeric word, and returns a string wherein every such occurrence is decremented by one.

// The (\d+) group ends up as the amount argument to the function, and the (\w+) group gets bound to unit. The function converts amount to a number—which
// always works since it matched \d+ — and makes some adjustments in case there is only one or zero left.

// Greed

// It is possible to use replace to write a function that removes all comments from a piece of JavaScript code. Here is a first attempt:

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*\*\//g, '');
}
console.log(stripComments('1 + /* 2 */3'));
// → 1 + 3
console.log(stripComments('x = 10;// ten!'));
// → x = 10;
console.log(stripComments('1 /* a */+/* b */ 1'));
// → 1  1

// The part before the or operator matches two slash characters followed by any number of non-newline characters.
// The part for multiline comments is more involved. We use [^] (any character that is not in the empty set of characters) as
// a way to match any character. We cannot just use a period here because block comments can continue on a new line, and
// the period character does not match newline characters.

// But the output for the last line appears to have gone wrong. Why?

// The [^]* part of the expression, as I described in the section on backtracking, will first match as much as it can. If that causes the next
// part of the pattern to fail, the matcher moves back one character and tries again from there. In the example, the matcher first tries
// to match the whole rest of the string and then moves back from there. It will find an occurrence of */ after going back four characters
// and match that. This is not what we wanted—the intention was to match a single comment, not to go all the way to the end of the code and
// find the end of the last block comment.

// Because of this behavior, we say the repetition operators (+, *, ?, and {}) are greedy, meaning they match as much as they can and backtrack from there.
// If you put a question mark after them (+?, *?, ??, {}?), they become nongreedy and start by matching as little as possible, matching more only
// when the remaining pattern does not fit the smaller match.

// And that is exactly what we want in this case. By having the star match the smallest stretch of characters that brings us to a */, we consume one block
// comment and nothing more.

function stripComments(code) {
  return code.replace(/\/\/.*|\/\*[^]*?\*\//g, '');
}
console.log(stripComments('1 /* a */+/* b */ 1'));
// → 1 + 1

// A lot of bugs in regular expression programs can be traced to unintentionally using a greedy operator where a nongreedy one would work better.
// When using a repetition operator, consider the nongreedy variant first.
