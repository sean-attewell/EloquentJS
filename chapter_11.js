// import { bigOak } from './crow-tech';
const { bigOak } = require('./crow-tech');
// import { defineRequestType } from './crow-tech';
const { defineRequestType } = require('./crow-tech');

// Asynchronous Programming

// The central part of a computer, the part that carries out the individual steps that make up our programs, is called the processor. The programs we have seen so far are things that will keep the processor busy until they have finished their work. The speed at which something like a loop that manipulates numbers can be executed depends pretty much entirely on the speed of the processor.

// But many programs interact with things outside of the processor. For example, they may communicate over a computer network or request data from the hard disk—which is a lot slower than getting it from memory.

// When such a thing is happening, it would be a shame to let the processor sit idle—there might be some other work it could do in the meantime. In part, this is handled by your operating system, which will switch the processor between multiple running programs. But that doesn’t help when we want a single program to be able to make progress while it is waiting for a network request.

// Asynchronicity

// In a synchronous programming model, things happen one at a time. When you call a function that performs a long-running action, it returns only when the action has finished and it can return the result. This stops your program for the time the action takes.

// An asynchronous model allows multiple things to happen at the same time. When you start an action, your program continues to run. When the action finishes, the program is informed and gets access to the result (for example, the data read from disk).

// We can compare synchronous and asynchronous programming using a small example: a program that fetches two resources from the network and then combines results.

// In a synchronous environment, where the request function returns only after it has done its work, the easiest way to perform this task is to make the requests one after the other. This has the drawback that the second request will be started only when the first has finished. The total time taken will be at least the sum of the two response times.

// The solution to this problem, in a synchronous system, is to start additional threads of control. A thread is another running program whose execution may be interleaved with other programs by the operating system—since most modern computers contain multiple processors, multiple threads may even run at the same time, on different processors. A second thread could start the second request, and then both threads wait for their results to come back, after which they resynchronize to combine their results.

// In the following diagram, the thick lines represent time the program spends running normally, and the thin lines represent time spent waiting for the network. In the synchronous model, the time taken by the network is part of the timeline for a given thread of control. In the asynchronous model, starting a network action conceptually causes a split in the timeline. The program that initiated the action continues running, and the action happens alongside it, notifying the program when it is finished.

// Another way to describe the difference is that waiting for actions to finish is implicit in the synchronous model, while it is explicit, under our control, in the asynchronous one.

// Asynchronicity cuts both ways. It makes expressing programs that do not fit the straight-line model of control easier, but it can also make expressing programs that do follow a straight line more awkward. We’ll see some ways to address this awkwardness later in the chapter.

// Both of the important JavaScript programming platforms—browsers and Node.js—make operations that might take a while asynchronous, rather than relying on threads. Since programming with threads is notoriously hard (understanding what a program does is much more difficult when it’s doing multiple things at once), this is generally considered a good thing.

// Callbacks

// One approach to asynchronous programming is to make functions that perform a slow action take an extra argument, a callback function. The action is started, and when it finishes, the callback function is called with the result.

// As an example, the setTimeout function, available both in Node.js and in browsers, waits a given number of milliseconds (a second is a thousand milliseconds) and then calls a function.

setTimeout(() => console.log('Tick'), 500);

// Waiting is not generally a very important type of work, but it can be useful when doing something like updating an animation or checking whether something is taking longer than a given amount of time.

// Performing multiple asynchronous actions in a row using callbacks means that you have to keep passing new functions to handle the continuation of the computation after the actions.

// Most crow nest computers have a long-term data storage bulb, where pieces of information are etched into twigs so that they can be retrieved later. Etching, or finding a piece of data, takes a moment, so the interface to long-term storage is asynchronous and uses callback functions.

// Storage bulbs store pieces of JSON-encodable data under names. A crow might store information about the places where it’s hidden food under the name "food caches", which could hold an array of names that point at other pieces of data, describing the actual cache. To look up a food cache in the storage bulbs of the Big Oak nest, a crow could run code like this:

bigOak.readStorage('food caches', caches => {
  let firstCache = caches[0];
  bigOak.readStorage(firstCache, info => {
    console.log(info);
  });
});

// (All binding names and strings have been translated from crow language to English.)

// This style of programming is workable, but the indentation level increases with each asynchronous action because you end up in another function. Doing more complicated things, such as running multiple actions at the same time, can get a little awkward.

// Crow nest computers are built to communicate using request-response pairs. That means one nest sends a message to another nest, which then immediately sends a message back, confirming receipt and possibly including a reply to a question asked in the message.

// Each message is tagged with a type, which determines how it is handled. Our code can define handlers for specific request types, and when such a request comes in, the handler is called to produce a response.

// The interface exported by the "./crow-tech" module provides callback-based functions for communication. Nests have a send method that sends off a request. It expects the name of the target nest, the type of the request, and the content of the request as its first three arguments, and it expects a function to call when a response comes in as its fourth and last argument.

bigOak.send('Cow Pasture', 'note', "Let's caw loudly at 7PM", () => console.log('Note delivered.'));

// But to make nests capable of receiving that request, we first have to define a request type named "note". The code that handles the requests has to run not just on this nest-computer but on all nests that can receive messages of this type. We’ll just assume that a crow flies over and installs our handler code on all the nests.

defineRequestType('note', (nest, content, source, done) => {
  console.log(`${nest.name} received note: ${content}`);
  done();
});

// The defineRequestType function defines a new type of request. The example adds support for "note" requests, which just sends a note to a given nest. Our implementation calls console.log so that we can verify that the request arrived. Nests have a name property that holds their name.

// The fourth argument given to the handler, done, is a callback function that it must call when it is done with the request. If we had used the handler’s return value as the response value, that would mean that a request handler can’t itself perform asynchronous actions. A function doing asynchronous work typically returns before the work is done, having arranged for a callback to be called when it completes. So we need some asynchronous mechanism—in this case, another callback function — to signal when a response is available.

// In a way, asynchronicity is contagious. Any function that calls a function that works asynchronously must itself be asynchronous, using a callback or similar mechanism to deliver its result. Calling a callback is somewhat more involved and error-prone than simply returning a value, so needing to structure large parts of your program that way is not great.

// Promises

// Working with abstract concepts is often easier when those concepts can be represented by values. In the case of asynchronous actions, you could, instead of arranging for a function to be called at some point in the future, return an object that represents this future event.

// This is what the standard class Promise is for. A promise is an asynchronous action that may complete at some point and produce a value. It is able to notify anyone who is interested when its value is available.

// The easiest way to create a promise is by calling Promise.resolve. This function ensures that the value you give it is wrapped in a promise. If it’s already a promise, it is simply returned—otherwise, you get a new promise that immediately finishes with your value as its result.

let fifteen = Promise.resolve(15);
fifteen.then(value => console.log(`Got ${value}`));
// → Got 15

// To get the result of a promise, you can use its then method. This registers a callback function to be called when the promise resolves and produces a value. You can add multiple callbacks to a single promise, and they will be called, even if you add them after the promise has already resolved (finished).

// But that’s not all the then method does. It returns another promise, which resolves to the value that the handler function returns or, if that returns a promise, waits for that promise and then resolves to its result.

// It is useful to think of promises as a device to move values into an asynchronous reality. A normal value is simply there. A promised value is a value that might already be there or might appear at some point in the future. Computations defined in terms of promises act on such wrapped values and are executed asynchronously as the values become available.

// To create a promise, you can use Promise as a constructor. It has a somewhat odd interface — the constructor expects a function as argument, which it immediately calls, passing it a function that it can use to resolve the promise. It works this way, instead of for example with a resolve method, so that only the code that created the promise can resolve it.

// This is how you’d create a promise-based interface for the readStorage function:

function storage(nest, name) {
  return new Promise(resolve => {
    nest.readStorage(name, result => resolve(result));
  });
}

storage(bigOak, 'enemies').then(value => console.log('Got', value));

// This asynchronous function returns a meaningful value. This is the main advantage of promises—they simplify the use of asynchronous functions. Instead of having to pass around callbacks, promise-based functions look similar to regular ones: they take input as arguments and return their output. The only difference is that the output may not be available yet.

// Failure

// Regular JavaScript computations can fail by throwing an exception. Asynchronous computations often need something like that. A network request may fail, or some code that is part of the asynchronous computation may throw an exception.

// One of the most pressing problems with the callback style of asynchronous programming is that it makes it extremely difficult to make sure failures are properly reported to the callbacks.

// A widely used convention is that the first argument to the callback is used to indicate that the action failed, and the second contains the value produced by the action when it was successful. Such callback functions must always check whether they received an exception and make sure that any problems they cause, including exceptions thrown by functions they call, are caught and given to the right function.

// Promises make this easier. They can be either resolved (the action finished successfully) or rejected (it failed). Resolve handlers (as registered with then) are called only when the action is successful, and rejections are automatically propagated to the new promise that is returned by then. And when a handler throws an exception, this automatically causes the promise produced by its then call to be rejected. So if any element in a chain of asynchronous actions fails, the outcome of the whole chain is marked as rejected, and no success handlers are called beyond the point where it failed.

// Much like resolving a promise provides a value, rejecting one also provides one, usually called the reason of the rejection. When an exception in a handler function causes the rejection, the exception value is used as the reason. Similarly, when a handler returns a promise that is rejected, that rejection flows into the next promise. There’s a Promise.reject function that creates a new, immediately rejected promise.

// To explicitly handle such rejections, promises have a catch method that registers a handler to be called when the promise is rejected, similar to how then handlers handle normal resolution. It’s also very much like then in that it returns a new promise, which resolves to the original promise’s value if it resolves normally and to the result of the catch handler otherwise. If a catch handler throws an error, the new promise is also rejected.

// As a shorthand, then also accepts a rejection handler as a second argument, so you can install both types of handlers in a single method call.

// A function passed to the Promise constructor receives a second argument, alongside the resolve function, which it can use to reject the new promise.

// The chains of promise values created by calls to then and catch can be seen as a pipeline through which asynchronous values or failures move. Since such chains are created by registering handlers, each link has a success handler or a rejection handler (or both) associated with it. Handlers that don’t match the type of outcome (success or failure) are ignored. But those that do match are called, and their outcome determines what kind of value comes next — success when it returns a non-promise value, rejection when it throws an exception, and the outcome of a promise when it returns one of those.

new Promise((_, reject) => reject(new Error('Fail')))
  .then(value => console.log('Handler 1'))
  .catch(reason => {
    console.log('Caught failure ' + reason);
    return 'nothing';
  })
  .then(value => console.log('Handler 2', value));
// → Caught failure Error: Fail
// → Handler 2 nothing

// Much like an uncaught exception is handled by the environment, JavaScript environments can detect when a promise rejection isn’t handled and will report this as an error.
