---
tags:
  - anki-cards
---
TARGET DECK
programming languages::language specific concepts::Javascript mental models

START
Basic
Front: What is a sparse array in JavaScript?
Back: A sparse array is an array that has missing indices (holes), not values like undefined or null. The index does not exist at all in the array object.
Tags: javascript arrays sparse-array mental-models
<!--ID: 1776877831178-->
END

START
Basic
Front: How is a sparse array different from an array containing undefined?
Back: A sparse array has missing indexes (e.g. 2 in arr === false), while an array with undefined still has the index defined with a value of undefined.
Tags: javascript arrays sparse-array undefined
<!--ID: 1776877831184-->
END

START
Basic
Front: How do you check if an index exists in a JavaScript array?
Back: Use the `in` operator, e.g. `i in array`, which returns true only if the index exists (even if the value is undefined).
Tags: javascript arrays operators sparse-array
<!--ID: 1776877831189-->
END

START
Basic
Front: Why is `i in array` important when implementing Array.prototype.filter?
Back: Because it ensures sparse array holes are skipped. Native filter does not process missing indices, only existing ones.
Tags: javascript filter sparse-array polyfill
<!--ID: 1776877831194-->
END


