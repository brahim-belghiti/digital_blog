---
tags:
  - moc
  - javascript
---

# How JavaScript runs code

Hoisting, scope, and closures feel like separate features to learn. They are not — they are consequences of one mechanism: the execution context. Understand how the engine creates and destroys execution contexts, and the other three become obvious.

## The execution context

When the JavaScript engine runs code, it creates an [[the JavaScript engine creates an execution context for every function call|execution context]] to manage it. There are two kinds: a single Global Execution Context created when the engine starts, and a Function Execution Context created every time a function is invoked.

Each context has two phases. The **creation phase** runs before any code executes: the engine allocates memory, sets variable declarations to `undefined`, and places function declarations fully in memory. The **execution phase** runs the code line by line, assigning real values.

Function contexts are placed on the call stack. When a function finishes, its context is popped off. This stack is what makes JavaScript single-threaded — one context executes at a time.

## Hoisting

[[hoisting is what happens during the creation phase of an execution context|Hoisting]] is not a special feature. It is what the creation phase looks like from outside.

Because variable declarations are set to `undefined` during the creation phase — before execution begins — they appear to be "available" before the line that declares them. Because function declarations are placed fully in memory during the creation phase, they can be called before they appear in the source. Nothing moved. The engine just processes declarations before running any code.

`let` and `const` are processed during the creation phase too, but not initialized to `undefined`. Accessing them before their declaration line throws a `ReferenceError` — the temporal dead zone.

## The scope chain

When the engine looks up a variable, it checks the current execution context first. If the variable is not there, it moves to the parent context. It keeps walking up until it reaches the Global Execution Context. If the variable is not found there, it throws a `ReferenceError`. This walk is the [[the scope chain lets a function access variables from its parent execution contexts|scope chain]].

Each context has its own variable environment. Variables declared inside a function exist only in that context — they disappear when the context is popped off the stack. The chain only goes upward: a parent context cannot look into a child's variables.

## Closures

The one exception to "variables disappear when the context is popped" is a [[a closure preserves access to a parent scope after that scope leaves the call stack|closure]].

When a function is defined inside another function and returned or passed elsewhere — outliving its parent — the engine creates a closure scope. This preserves the outer function's variable environment even after its execution context has been removed from the stack. The inner function still has access to the outer function's variables through the scope chain, because that environment was kept alive.

Closures are how JavaScript achieves private state, partial application, and callbacks that remember context. Any function that uses a variable from the scope where it was defined — rather than where it was called — is using a closure.

## Re-reading

The execution context is the engine's unit of work. Its creation phase explains hoisting. Its scope chain explains variable lookup. Its persistence through closures explains how functions carry their environment. Three concepts, one mechanism.
