---
type: definition
tags:
  - javascript
---
When the JavaScript engine looks up a variable inside a function, it first checks the current execution context. If the variable is not there, it moves to the parent execution context. It keeps moving up until it reaches the Global Execution Context. If the variable is not found there either, it throws a `ReferenceError`.

This chain of parent contexts is the scope chain.

```js
var name = 'Tyler'

function logName() {
  console.log(name)  // not in logName's context — walks up to global, finds 'Tyler'
}
```

Each execution context has its own variable environment. Variables declared inside a function are locally scoped — they exist only while that context is on the call stack. Once the function finishes and its context is popped, those variables are gone. Code outside cannot access them.

The scope chain only goes upward. A parent context cannot look into a child's variables.

Related: [[the JavaScript engine creates an execution context for every function call]], [[a closure preserves access to a parent scope after that scope leaves the call stack]]
