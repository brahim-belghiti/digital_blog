---
type: claim
tags:
  - abstraction
  - architecture
  - complexity
---
Abstraction is the process of removing unnecessary details so you can focus on the essential parts. Dealing with complexity, we are either subtracting things, simplifying things, or generalizing and identifying patterns.

This breaks down into two core operations:

**Hiding** — removing details that aren't relevant at the current level. You create a boundary that says "you don't need to know what's behind this." When you use an Eloquent model, the SQL details are hidden. They're not gone — they're unnecessary at the level you're working at.

**Naming** — giving a concept an identity so you can reason about it without holding its internals. "Concern," "service," "repository," "business logic" — these are names for abstractions that make [[Essential vs Accidental Complexity#Invisibility|invisible software]] navigable. Software has no shape, so abstraction creates shape through hiding and naming.

[[Separation of Concerns as Meta-Principle|Separation of concerns]] is a form of abstraction — SoC is abstraction applied to organizing code. So the same risks apply. Abstraction can lead to over-simplification — sometimes that level of complexity is needed. 
A leaky abstraction is when the hidden details force their way back up — you're using Eloquent thinking it's just objects, then a query performs terribly because the SQL underneath matters and you abstracted it away.
Generalization could miss edge cases, because when you abstract a pattern from a few cases, you might build it around what those cases have in common and miss that the next case breaks the pattern entirely. Premature generalization is as dangerous as premature optimization.

Abstraction can lead to over-simplification — sometimes that level of complexity is needed. 