---
type: definition
tags:
  - javascript
---
You interact with [[value]] in [[JavaScript]] by assigning it to a [[variable]]. Think of variables as wires that connect to values. You can change the assignment of a variable from one value to another, but this is only possible if you declared the variable with `let` or `var` (not `const`).
what we actually do is assign an expression but since [[expressions always results in a single value]], we are assigning a value to a variable so that [[variables in JavaScript always point to values, not to other variables]] .

JavaScript provides three keywords for declaring variables:
`let`: Allows reassignment, meaning you can change the value a variable points to.
`const`: Doesn't allow reassignment but still allows mutation for objects or functions referenced by the variable.
`var`: Similar to `let`, but has different scoping behaviour (function-scoped rather than block-scoped).
Think of [[variable]] as wires that connect to [[value]] . You can change the [[assignment]] of a variable from one value to another, but this is only possible if you declared the variable with `let` or `var` (not `const`).

[[variables in JavaScript always point to values, not to other variables]]. Changing the value of a variable means it now points to a different value.



