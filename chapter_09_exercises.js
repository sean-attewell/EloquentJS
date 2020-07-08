// Regexp golf

// car and cat
// pop and prop
// ferret, ferry, and ferrari
// Any word ending in ious
// A whitespace character followed by a period, comma, colon, or semicolon
// A word longer than six letters
// A word without the letter e (or E)

// Fill in the regular expressions

verify(/ca[rt]/, ['my car', 'bad cats'], ['camper', 'high art']);

verify(/pr?op/, ['pop culture', 'mad props'], ['plop', 'prrrop']);

verify(/ferr[et|y|ari]/, ['ferret', 'ferry', 'ferrari'], ['ferrum', 'transfer A']);

verify(/ious\b/, ['how delicious', 'spacious room'], ['ruinous', 'consciousness']);

verify(/\s[.,:;]/, ['bad punctuation .'], ['escape the period']);

verify(/\w{7}/, ['hottentottententen'], ['no', 'hotten totten tenten']);

verify(/\b[^\We]+\b/i, ['red platypus', 'wobbling nest'], ['earth bed', 'learning ape', 'BEET']);

function verify(regexp, yes, no) {
  // Ignore unfinished exercises
  if (regexp.source == '...') return;
  for (let str of yes)
    if (!regexp.test(str)) {
      console.log(`Failure to match '${str}'`);
    }
  for (let str of no)
    if (regexp.test(str)) {
      console.log(`Unexpected match for '${str}'`);
    }
}

// Quoting style

// Imagine you have written a story and used single quotation marks
// throughout to mark pieces of dialogue. Now you want to replace all the
// dialogue quotes with double quotes, while keeping the single quotes
// used in contractions like aren’t.

// Think of a pattern that distinguishes these two kinds of quote usage
// and craft a call to the replace method that does the proper replacement.

let text = "'I'm the cook,' he said, 'it's my job.'";
let regex = /(^|\W)'|'(\W|$)/;
// Change this call.
console.log(text.replace(regex, '$1"$2'));
// → "I'm the cook," he said, "it's my job."

// if there is a single quote after non-word character or the start
// Or
// if there is a single quote before the non-word character or the end

// without the g it replaces only the first quote.
// So in the second arg to replace, it must just ignore which group isn't on the or.

// Numbers again
// Write an expression that matches only JavaScript-style numbers. It must support an optional minus or plus sign in
// front of the number, the decimal dot, and exponent notation—5e-3 or 1E10—again with an optional sign in front of
// the exponent. Also note that it is not necessary for there to be digits in front of or after the dot, but the
// number cannot be a dot alone. That is, .5 and 5. are valid JavaScript numbers, but a lone dot isn’t.

// Fill in this regular expression.
let number = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;

// Tests:
for (let str of ['1', '-1', '+15', '1.55', '.5', '5.', '1.3e2', '1E-4', '1e+12']) {
  if (!number.test(str)) {
    console.log(`Failed to match '${str}'`);
  }
}
for (let str of ['1a', '+-1', '1.2.3', '1+1', '1e4.5', '.5.', '1f5', '.']) {
  if (number.test(str)) {
    console.log(`Incorrectly accepted '${str}'`);
  }
}
