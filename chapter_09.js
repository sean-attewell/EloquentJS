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

// Dynamically creating RegExp objects
// There are cases where you might not know the exact pattern you need to match against when you are writing your code.
// Say you want to look for the user’s name in a piece of text and enclose it in underscore characters to make it stand out.
// Since you will know the name only once the program is actually running, you can’t use the slash-based notation.

// But you can build up a string and use the RegExp constructor on that. Here’s an example:

let name = 'harry';
let text = 'Harry is a suspicious character.';
let regexp = new RegExp('\\b(' + name + ')\\b', 'gi');
console.log(regexp);
/// \b(harry)\b/gi
console.log(text.replace(regexp, '_$1_'));
// → _Harry_ is a suspicious character.

// When creating the \b boundary markers, we have to use two backslashes because we are writing them in a normal string,
// not a slash-enclosed regular expression. The second argument to the RegExp constructor contains the options for the regular expression—in
// this case, "gi" for global and case insensitive.

// But what if the name is "dea+hl[]rd" because our user is a nerdy teenager? That would result in a nonsensical regular
// expression that won’t actually match the user’s name.

// To work around this, we can add backslashes before any character that has a special meaning.

let name2 = 'dea+hl[]rd';
let text2 = 'This dea+hl[]rd guy is super annoying.';
let escaped = name2.replace(/[\\[.+*?(){|^$]/g, '\\$&');
console.log(escaped);
// dea\+hl\[]rd
let regexp2 = new RegExp('\\b' + escaped + '\\b', 'gi');
console.log(regexp2);
console.log(text2.replace(regexp2, '_$&_'));
// → This _dea+hl[]rd_ guy is super annoying.

// The search method
// The indexOf method on strings cannot be called with a regular expression. But there is another method, search, that does expect a regular
// expression. Like indexOf, it returns the first index on which the expression was found, or -1 when it wasn’t found.

console.log('  word'.search(/\S/));
// → 2
console.log('    '.search(/\S/));
// → -1

// Unfortunately, there is no way to indicate that the match should start at a given offset (like we can with the second argument to indexOf),
// which would often be useful.

// The lastIndex property
// The exec method similarly does not provide a convenient way to start searching from a given position in the string.
// But it does provide an inconvenient way.

// Regular expression objects have properties. One such property is source, which contains the string that expression was created from.
// Another property is lastIndex, which controls, in some limited circumstances, where the next match will start.

// Those circumstances are that the regular expression must have the global (g) or sticky (y) option enabled, and the match
// must happen through the exec method. Again, a less confusing solution would have been to just allow an extra argument to be
// passed to exec, but confusion is an essential feature of JavaScript’s regular expression interface.

let pattern = /y/g;
pattern.lastIndex = 3;
let match2 = pattern.exec('xyzzy');
console.log(match2.index);
// → 4
console.log(pattern.lastIndex);
// → 5

// If the match was successful, the call to exec automatically updates the lastIndex property to point after the match.
// If no match was found, lastIndex is set back to zero, which is also the value it has in a newly constructed regular expression object.

// The difference between the global and the sticky options is that, when sticky is enabled, the match will succeed only if it starts
// directly at lastIndex, whereas with global, it will search ahead for a position where a match can start.

let global = /abc/g;
console.log(global.exec('xyz abc'));
// → ["abc"]
let sticky = /abc/y;
console.log(sticky.exec('xyz abc'));
// → null

// When using a shared regular expression value for multiple exec calls, these automatic updates to the lastIndex property can cause problems.
// Your regular expression might be accidentally starting at an index that was left over from a previous call.

let digit = /\d/g;

console.log(digit.exec('here it is: 1'));
// → ["1"]
console.log(digit.exec('and now: 1'));
// → null

// Another interesting effect of the global option is that it changes the way the match method on strings works.
// When called with a global expression, instead of returning an array similar to that returned by exec, match will find all matches of the
// pattern in the string and return an array containing the matched strings.

console.log('Banana'.match(/an/g));
// → ["an", "an"]

// So be cautious with global regular expressions. The cases where they are necessary—calls to replace and places where you want
// to explicitly use lastIndex—are typically the only places where you want to use them.

// Looping over matches

// A common thing to do is to scan through all occurrences of a pattern in a string, in a way that gives us access to the match object in the loop body.
// We can do this by using lastIndex and exec.

let input = 'A string with 3 numbers in it... 42 and 88.';
let number = /\b\d+\b/g;
let match3;
while ((match3 = number.exec(input))) {
  console.log('Found', match3[0], 'at', match3.index);
}
// → Found 3 at 14
//   Found 42 at 33
//   Found 88 at 40

// This makes use of the fact that the value of an assignment expression (=) is the assigned value. So by using match = number.exec(input) as
// the condition in the while statement, we perform the match at the start of each iteration, save its result in a binding,
// and stop looping when no more matches are found.

// Parsing an INI file

// To conclude the chapter, we’ll look at a problem that calls for regular expressions. Imagine we are writing a program to automatically
// collect information about our enemies from the Internet. (We will not actually write that program here, just the part that reads the configuration file. Sorry.)
// The configuration file looks like this:

// searchengine=https://duckduckgo.com/?q=$1
// spitefulness=9.7

// ; comments are preceded by a semicolon...
// ; each section concerns an individual enemy
// [larry]
// fullname=Larry Doe
// type=kindergarten bully
// website=http://www.geocities.com/CapeCanaveral/11451

// [davaeorn]
// fullname=Davaeorn
// type=evil wizard
// outputdir=/home/marijn/enemies/davaeorn

// The exact rules for this format (which is a widely used format, usually called an INI file) are as follows:

// Blank lines and lines starting with semicolons are ignored.

// Lines wrapped in [ and ] start a new section.

// Lines containing an alphanumeric identifier followed by an = character add a setting to the current section.

// Anything else is invalid.

// Our task is to convert a string like this into an object whose properties hold strings for settings written before the first section
// header and subobjects for sections, with those subobjects holding the section’s settings.

// Since the format has to be processed line by line, splitting up the file into separate lines is a good start. We saw the split method
// in Chapter 4. Some operating systems, however, use not just a newline character to separate lines but a carriage return character followed by a
// newline ("\r\n"). Given that the split method also allows a regular expression as its argument, we can use a regular expression like /\r?\n/ to
// split in a way that allows both "\n" and "\r\n" between lines.

function parseINI(string) {
  // Start with an object to hold the top-level fields
  let result = {};
  let section = result;
  string.split(/\r?\n/).forEach(line => {
    let match;
    if ((match = line.match(/^(\w+)=(.*)$/))) {
      section[match[1]] = match[2];
    } else if ((match = line.match(/^\[(.*)\]$/))) {
      section = result[match[1]] = {};
    } else if (!/^\s*(;.*)?$/.test(line)) {
      throw new Error("Line '" + line + "' is not valid.");
    }
  });
  return result;
}

console.log(
  parseINI(`
name=Vasilis
[address]
city=Tessaloniki`)
);
// → {name: "Vasilis", address: {city: "Tessaloniki"}}

// The code goes over the file’s lines and builds up an object. Properties at the top are stored directly into that object, whereas
// properties found in sections are stored in a separate section object. The section binding points at the object for the current section.

// There are two kinds of significant lines—section headers or property lines. When a line is a regular property, it is stored in the current section.
// When it is a section header, a new section object is created, and section is set to point at it.

// Note the recurring use of ^ and $ to make sure the expression matches the whole line, not just part of it. Leaving these out results in code
// that mostly works but behaves strangely for some input, which can be a difficult bug to track down.

// The pattern if (match = string.match(...)) is similar to the trick of using an assignment as the condition for while. You often aren’t sure
// that your call to match will succeed, so you can access the resulting object only inside an if statement that tests for this. To not break the
// pleasant chain of else if forms, we assign the result of the match to a binding and immediately use that assignment as the test for the if statement.

// If a line is not a section header or a property, the function checks whether it is a comment or an empty line using the expression /^\s*(;.*)?$/.
// Do you see how it works? The part between the parentheses will match comments, and the ? makes sure it also matches lines containing only whitespace.
// When a line doesn’t match any of the expected forms, the function throws an exception.

// International characters

// Because of JavaScript’s initial simplistic implementation and the fact that this simplistic approach was later set in stone as standard behavior,
// JavaScript’s regular expressions are rather dumb about characters that do not appear in the English language. For example, as far as JavaScript’s
// regular expressions are concerned, a “word character” is only one of the 26 characters in the Latin alphabet (uppercase or lowercase), decimal
// digits, and, for some reason, the underscore character. Things like é or β, which most definitely are word characters, will not match \w (and will
// match uppercase \W, the nonword category).

// By a strange historical accident, \s (whitespace) does not have this problem and matches all characters that the Unicode standard considers whitespace,
// including things like the nonbreaking space and the Mongolian vowel separator.

// Another problem is that, by default, regular expressions work on code units, as discussed in Chapter 5, not actual characters. This means characters that
// are composed of two code units behave strangely.

console.log(/🍎{3}/.test('🍎🍎🍎'));
// → false
console.log(/<.>/.test('<🌹>'));
// → false
console.log(/<.>/u.test('<🌹>'));
// → true

// The problem is that the 🍎 in the first line is treated as two code units, and the {3} part is applied only to the second one. Similarly, the
// dot matches a single code unit, not the two that make up the rose emoji.

// You must add a u option (for Unicode) to your regular expression to make it treat such characters properly. The wrong behavior remains the default,
// unfortunately, because changing that might cause problems for existing code that depends on it.

// Though this was only just standardized and is, at the time of writing, not widely supported yet, it is possible to use \p in a regular expression
// (that must have the Unicode option enabled) to match all characters to which the Unicode standard assigns a given property.

console.log(/\p{Script=Greek}/u.test('α'));
// → true
console.log(/\p{Script=Arabic}/u.test('α'));
// → false
console.log(/\p{Alphabetic}/u.test('α'));
// → true
console.log(/\p{Alphabetic}/u.test('!'));
// → false

// Unicode defines a number of useful properties, though finding the one that you need may not always be trivial.
// You can use the \p{Property=Value} notation to match any character that has the given value for that property.
// If the property name is left off, as in \p{Name}, the name is assumed to be either a binary property such as Alphabetic or a category such as Number.

// Summary
// Regular expressions are objects that represent patterns in strings. They use their own language to express these patterns.

// /abc/	A sequence of characters
// /[abc]/	Any character from a set of characters
// /[^abc]/	Any character not in a set of characters
// /[0-9]/	Any character in a range of characters
// /x+/	One or more occurrences of the pattern x
// /x+?/	One or more occurrences, nongreedy
// /x*/	Zero or more occurrences
// /x?/	Zero or one occurrence
// /x{2,4}/	Two to four occurrences
// /(abc)/	A group
// /a|b|c/	Any one of several patterns
// /\d/	Any digit character
// /\w/	An alphanumeric character (“word character”)
// /\s/	Any whitespace character
// /./	Any character except newlines
// /\b/	A word boundary
// /^/	Start of input
// /$/	End of input

// A regular expression has a method test to test whether a given string matches it. It also has a method exec that, when a match is found,
// returns an array containing all matched groups. Such an array has an index property that indicates where the match started.

// Strings have a match method to match them against a regular expression and a search method to search for one, returning only the starting
// position of the match. Their replace method can replace matches of a pattern with a replacement string or function.

// Regular expressions can have options, which are written after the closing slash. The i option makes the match case insensitive. The g option
// makes the expression global, which, among other things, causes the replace method to replace all instances instead of just the first. The y
// option makes it sticky, which means that it will not search ahead and skip part of the string when looking for a match. The u option turns
// on Unicode mode, which fixes a number of problems around the handling of characters that take up two code units.

// Regular expressions are a sharp tool with an awkward handle. They simplify some tasks tremendously but can quickly become unmanageable when
// applied to complex problems. Part of knowing how to use them is resisting the urge to try to shoehorn things that they cannot cleanly express into them.
