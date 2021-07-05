complete these exercises from javascript.info and paste your solutions in to this file:
* [promise basics](https://javascript.info/promise-basics#tasks)
* [promise chaining](https://javascript.info/promise-chaining#tasks) 
* [promise api](https://javascript.info/promise-api)

and here's another [helpful resources](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Using_promises)

# Promise Basics

## 1. what is the output of the code

```js
let promise = new Promise(function(resolve, reject) {
  resolve(1);

  setTimeout(() => resolve(2), 1000);
});

promise.then(alert);
```
solution : 

The output is: 1.

The second call to resolve is ignored, because only the first call of reject/resolve is taken into account. Further calls are ignored.

## 2. Delay with a promise

The built-in function setTimeout uses callbacks. Create a promise-based alternative.

The function delay(ms) should return a promise. That promise should resolve after ms milliseconds, so that we can add .then to it, like this:

```js
function delay(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

delay(3000).then(() => alert('runs after 3 seconds'));
```
## 3. Animated circle with promise

Rewrite the showCircle function in the solution of the task Animated circle with callback so that it returns a promise instead of accepting a callback.

The new usage:
```js

showCircle(150, 150, 100).then(div => {
  div.classList.add('message-ball');
  div.append("Hello, world!");
});
```
[solution](https://plnkr.co/edit/gSQLOOs3AK3jbcCBKuna?p=preview)

# Promise chaining

## 1. Promise: then versus catch

Are these code fragments equal? 
 ```promise.then(f1).catch(f2);``` Vs ```promise.then(f1, f2);```
```solution``` : no, they are not the equal:
The difference is that if an error happens in f1, then it is handled by .catch here:
```js 
promise
  .then(f1)
  .catch(f2);
  ```
  but not here
  ```js
  promise
  .then(f1, f2);
  ```
  
