---
type: definition
tags:
  - javascript
---
Hoisting is not a special JavaScript mechanism. It is a consequence of how execution contexts work.

During the creation phase, before any code runs, the engine allocates memory for variables and functions. Variable declarations (`var`) are set to `undefined`. Function declarations are placed fully in memory — the whole function body, not just a reference.

```js
console.log(name)      // undefined — not an error
console.log(getUser)   // [Function: getUser] — fully available

var name = 'Tyler'
function getUser() { return name }
```

It looks like `name` and `getUser` were "hoisted" to the top of the file. Nothing moved. The engine just processed declarations during the creation phase before reaching the execution phase.

`let` and `const` behave differently — they are also processed during the creation phase, but they are not initialized to `undefined`. Accessing them before their declaration line throws a `ReferenceError` (the "temporal dead zone").

Related: [[the JavaScript engine creates an execution context for every function call]]
