---
type: definition
tags:
  - javascript
---
When a function is defined inside another function, the inner function has access to the outer function's variables through the scope chain. Normally, once the outer function finishes executing, its execution context is removed from the call stack and its variables are gone.

But if the inner function is returned or passed elsewhere — so it outlives the outer function — the engine creates a **closure scope**. This preserves the outer function's variable environment even after its context has been removed from the stack.

```js
function makeAdder(x) {
  return function inner(y) {
    return x + y  // x comes from the outer scope, preserved in the closure
  }
}

const add5 = makeAdder(5)
add5(2)  // 7 — x is still 5, even though makeAdder is done executing
```

`inner` "closes over" the variable environment of `makeAdder`. That environment persists as long as `inner` exists.

Closures are how JavaScript achieves private state, partial application, and callbacks that remember context. Any time a function remembers variables from where it was defined rather than where it was called, it is using a closure.

Related: [[the scope chain lets a function access variables from its parent execution contexts]], [[the JavaScript engine creates an execution context for every function call]]
