// Regexp Golf

let one = /ca[tr]/;

let two = /pr?op/;

let three = /ferr(|et|y|ari)/;

let four = /ious\b/;

let five = /\s[.,:;]{1}/;

let six = /\w{7}/;

let seven = /\b[^\We]+\b/i; // A word without the letter e or E

// Quoting style

let story = "'There was a 'story' full of 'quotes' but also didn't and couldn't'";

console.log(story.replace(/(^|\W)'|'(\W|$)/g, '$1"$2'));

// if there is a single quote after non-word character or the start
// Or
// if there is a single quote before the non-word character or the end

// without the g it replaces only the first quote.
// So in the second arg to replace, it must just ignore which group isn't on the or.

// Numbers again

let numbers = /^[+\-]?(\d+(\.\d*)?|\.\d+)([eE][+\-]?\d+)?$/;
