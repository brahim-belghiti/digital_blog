---
tags:
  - anki-cards
source: "[[the JavaScript engine creates an execution context for every function call]]"
---

TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is an execution context in JavaScript?
Back: The engine's unit of work for managing code. There are two kinds: a Global Execution Context created once when the engine starts, and a Function Execution Context created every time a function is invoked.
Tags: javascript execution-context fundamentals
<!--ID: 1779384126931-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What are the two phases of an execution context, and what happens in each?
Back: Creation phase — memory is allocated, variable declarations are set to undefined, function declarations are placed fully in memory. Execution phase — code runs line by line, real values are assigned to variables.
Tags: javascript execution-context creation-phase
<!--ID: 1779384126936-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is hoisting, really?
Back: Not a special mechanism — it is what the creation phase looks like from outside. Variables declared with var are set to undefined before any code runs. Function declarations are fully in memory. Nothing moved; the engine just processes declarations before execution.
Tags: javascript hoisting execution-context
<!--ID: 1779384126942-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is the difference between how var and let/const are hoisted?
Back: var is initialized to undefined during the creation phase — you can access it before its line without an error. let and const are processed during creation but not initialized. Accessing them before their declaration line throws a ReferenceError (the temporal dead zone).
Tags: javascript hoisting var let const
<!--ID: 1779384126948-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is the scope chain?
Back: When the engine looks up a variable and doesn't find it in the current execution context, it walks up to the parent context, then its parent, up to the Global Execution Context. If not found there, it throws a ReferenceError. This chain of parent contexts is the scope chain.
Tags: javascript scope scope-chain execution-context
<!--ID: 1779384126954-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: Can a parent execution context access variables declared inside a child function?
Back: No. The scope chain only goes upward — a child can access its parent's variables, but a parent cannot access a child's. Variables declared inside a function are locally scoped and disappear when the function's context is popped off the call stack.
Tags: javascript scope local-scope
<!--ID: 1779384126961-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is a closure?
Back: A function that retains access to its parent scope's variable environment even after that parent's execution context has been removed from the call stack. The engine preserves the outer function's variables in a closure scope as long as the inner function exists.
Tags: javascript closures scope
<!--ID: 1779384126967-->
END


TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: When does the JavaScript engine create a closure scope?
Back: When an inner function is returned or passed elsewhere and outlives its outer function. Because the inner function still needs access to the outer function's variables through the scope chain, the engine keeps that environment alive as a closure scope.
Tags: javascript closures execution-context
<!--ID: 1779384126973-->
END
