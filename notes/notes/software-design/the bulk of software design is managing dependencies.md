---
type: opinion
tags:
  - software-design
---
The central problem in software is not writing logic — it is deciding where to put things and cutting unnecessary connections between them.

When code is confusing, fragile, or rigid, the cause is almost always dependencies. Fragility means changing one thing breaks unrelated things. Rigidity means a change in a low-level module forces high-level modules to recompile and update. Non-reusability means you can't extract a useful part because it is tangled to parts you don't want.

All three symptoms come from the same source: modules knowing more about each other than they need to.

Software design — SOLID principles, design patterns, layered architecture, dependency injection — is the set of techniques for deciding which modules should know about which other modules, and in which direction.

Related: [[OOP is primarily a tool for managing dependencies, not for modeling the real world]], [[a class should have one reason to change]], [[add new features without modifying existing code]]
