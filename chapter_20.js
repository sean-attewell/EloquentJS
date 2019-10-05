// Chapter 20

// Node.js, a program that allows you to apply your JavaScript skills outside of the browser. With it, you can build anything from small command line tools to HTTP servers that power dynamic websites.

// Node was initially conceived for the purpose of making asynchronous programming easy and convenient. JavaScript lends itself well to a system like Node. It is one of the few programming languages that does not have a built-in way to do in- and output. Thus, JavaScript could be fit onto Node’s rather eccentric approach to in- and output without ending up with two inconsistent interfaces. In 2009, when Node was being designed, people were already doing callback-based programming in the browser, so the community around the language was used to an asynchronous programming style.

let message = 'Hello world';
console.log(message);

// If you run node without giving it a file, it provides you with a prompt at which you can type JavaScript code and immediately see the result.

// $ node
// > 1 + 1
// 2
// > [-1, -2, -3].map(Math.abs)
// [1, 2, 3]
// > process.exit(0)
// $
// The process binding, just like the console binding, is available globally in Node. It provides various ways to inspect and manipulate the current program. The exit method ends the process and can be given an exit status code, which tells the program that started node (in this case, the command line shell) whether the program completed successfully (code zero) or encountered an error (any other code).

// To find the command line arguments given to your script, you can read process.argv, which is an array of strings. Note that it also includes the name of the node command and your script name, so the actual arguments start at index 2. If showargv.js contains the statement console.log(process.argv), you could run it like this:

// $ node showargv.js one --and two
// ["node", "/tmp/showargv.js", "one", "--and", "two"]
// All the standard JavaScript global bindings, such as Array, Math, and JSON, are also present in Node’s environment. Browser-related functionality, such as document or prompt, is not.

console.log(process.argv);

// Modules
// Beyond the bindings I mentioned, such as console and process, Node puts few additional bindings in the global scope. If you want to access built-in functionality, you have to ask the module system for it.

// The CommonJS module system, based on the require function, was described in Chapter 10. This system is built into Node and is used to load anything from built-in modules to downloaded packages to files that are part of your own program.

// When require is called, Node has to resolve the given string to an actual file that it can load. Pathnames that start with /, ./, or ../ are resolved relative to the current module’s path, where . stands for the current directory, ../ for one directory up, and / for the root of the file system. So if you ask for "./graph" from the file /tmp/robot/robot.js, Node will try to load the file /tmp/robot/graph.js.

// The .js extension may be omitted, and Node will add it if such a file exists. If the required path refers to a directory, Node will try to load the file named index.js in that directory.

// When a string that does not look like a relative or absolute path is given to require, it is assumed to refer to either a built-in module or a module installed in a node_modules directory. For example, require("fs") will give you Node’s built-in file system module. And require("robot") might try to load the library found in node_modules/robot/. A common way to install such libraries is by using NPM, which we’ll come back to in a moment.

// Let’s set up a small project consisting of two files. The first one, called main.js, defines a script that can be called from the command line to reverse a string.

const { reverse } = require('./reverse');

// Index 2 holds the first actual command line argument
let argument = process.argv[2];

console.log(reverse(argument));

// The file reverse.js defines a library for reversing strings, which can be used both by this command line tool and by other scripts that need direct access to a string-reversing function.

// exports.reverse = function(string) {
//   return Array.from(string).reverse().join("");
// };

// Remember that adding properties to exports adds them to the interface of the module. Since Node.js treats files as CommonJS modules, main.js can take the exported reverse function from reverse.js.

// We can now call our tool like this:

// $ node main.js JavaScript
// tpircSavaJ

// Installing with NPM
// NPM, which was introduced in Chapter 10, is an online repository of JavaScript modules, many of which are specifically written for Node. When you install Node on your computer, you also get the npm command, which you can use to interact with this repository.

// NPM’s main use is downloading packages. We saw the ini package in Chapter 10. We can use NPM to fetch and install that package on our computer.

// $ npm install ini
// npm WARN enoent ENOENT: no such file or directory,
//          open '/tmp/package.json'
// + ini@1.3.5
// added 1 package in 0.552s

// $ node
// > const {parse} = require("ini");
// > parse("x = 1\ny = 2");
// { x: '1', y: '2' }
// After running npm install, NPM will have created a directory called node_modules. Inside that directory will be an ini directory that contains the library. You can open it and look at the code. When we call require("ini"), this library is loaded, and we can call its parse property to parse a configuration file.

// By default NPM installs packages under the current directory, rather than in a central place. If you are used to other package managers, this may seem unusual, but it has advantages—it puts each application in full control of the packages it installs and makes it easier to manage versions and clean up when removing an application.

// Package files
// In the npm install example, you could see a warning about the fact that the package.json file did not exist. It is recommended to create such a file for each project, either manually or by running npm init. It contains some information about the project, such as its name and version, and lists its dependencies.

// The robot simulation from Chapter 7, as modularized in the exercise in Chapter 10, might have a package.json file like this:

// {
//   "author": "Marijn Haverbeke",
//   "name": "eloquent-javascript-robot",
//   "description": "Simulation of a package-delivery robot",
//   "version": "1.0.0",
//   "main": "run.js",
//   "dependencies": {
//     "dijkstrajs": "^1.0.1",
//     "random-item": "^1.0.0"
//   },
//   "license": "ISC"
// }
// When you run npm install without naming a package to install, NPM will install the dependencies listed in package.json. When you install a specific package that is not already listed as a dependency, NPM will add it to package.json.

// Versions
// A package.json file lists both the program’s own version and versions for its dependencies. Versions are a way to deal with the fact that packages evolve separately, and code written to work with a package as it existed at one point may not work with a later, modified version of the package.

// NPM demands that its packages follow a schema called semantic versioning, which encodes some information about which versions are compatible (don’t break the old interface) in the version number. A semantic version consists of three numbers, separated by periods, such as 2.3.0. Every time new functionality is added, the middle number has to be incremented. Every time compatibility is broken, so that existing code that uses the package might not work with the new version, the first number has to be incremented.

// A caret character (^) in front of the version number for a dependency in package.json indicates that any version compatible with the given number may be installed. So, for example, "^2.3.0" would mean that any version greater than or equal to 2.3.0 and less than 3.0.0 is allowed.

// The npm command is also used to publish new packages or new versions of packages. If you run npm publish in a directory that has a package.json file, it will publish a package with the name and version listed in the JSON file to the registry. Anyone can publish packages to NPM—though only under a package name that isn’t in use yet since it would be somewhat scary if random people could update existing packages.

// Since the npm program is a piece of software that talks to an open system—the package registry—there is nothing unique about what it does. Another program, yarn, which can be installed from the NPM registry, fills the same role as npm using a somewhat different interface and installation strategy.

// This book won’t delve further into the details of NPM usage. Refer to https://npmjs.org for further documentation and a way to search for packages.
