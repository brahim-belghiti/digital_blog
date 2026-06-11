---
type: claim
tags:
  - javascript
---

Variables in JavaScript always point to values, not to other variables. Changing the value of a variable means it now points to a different value. 
so in this example:
```
let x = 10
let  y = x
```
we are not assigning the variable x to y, but x in the second line, is an [[expression]] and [[expressions are questions we ask JavaScript, that it answer back with a value]] so JavaScript will figure out what the current value of x (the number 10 in this example) and assign it to y. 







