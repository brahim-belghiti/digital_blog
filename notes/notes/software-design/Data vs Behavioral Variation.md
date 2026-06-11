---
type: claim
tags:
  - polymorphism
  - ocp
---
Data variation is when the logic does not change but the expected results or the data could be different. Behavioral variation is when the implementation changes, which requires a change in the logic itself. This distinction matters because it tells you which tool to reach for. Polymorphism (interfaces with different implementations) is suited to behavioral variation — different types genuinely do different things. For data variation, a simple reusable method with parameters suffices — you pass the varying part as a value rather than building a type hierarchy. Reaching for polymorphism when you only have data variation adds accidental complexity: you end up with multiple classes where every implementation has the same structural logic with different values plugged in.

**Connections:** [[Open Close Principle, Extend Without Modifying | OCP]] — data vs behavioral variation is the key test for whether OCP abstraction through polymorphism is warranted. [[Essential vs Accidental Complexity]] — using polymorphism for data variation is accidental complexity.



---

Anything to adjust? Then we do the SRP + OCP connection note.