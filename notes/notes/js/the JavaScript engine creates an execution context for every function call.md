---
type: definition
tags:
  - javascript
---
When the JavaScript engine runs code, it creates an execution context to manage that code. There are two kinds.

The **Global Execution Context** is created once when the engine first starts. It creates a global object (`window` in the browser, `global` in Node) and a `this` reference pointing to that object.

A **Function Execution Context** is created every time a function is invoked. Each one has two phases:

- **Creation phase** — the engine sets up memory: creates `this`, creates an `arguments` object, allocates space for variables and functions. Variable declarations are set to `undefined`. Function declarations are placed fully in memory.
- **Execution phase** — the engine runs the code line by line, assigning real values to the variables already in memory.

Function execution contexts are placed on the **call stack** (also called the execution stack). When a function finishes, its context is popped off the stack.

This model — creation then execution, stacked contexts — is the foundation for understanding hoisting, scope, and closures. All three are consequences of how execution contexts are created and destroyed.

Related: [[hoisting is what happens during the creation phase of an execution context]], [[the scope chain lets a function access variables from its parent execution contexts]], [[a closure preserves access to a parent scope after that scope leaves the call stack]]
