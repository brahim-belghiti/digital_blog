---
type: claim
tags:
  - architecture
  - coupling
  - dependency-injection
  - interfaces
  - complexity
  - separation-of-concerns
---
Coupling is the level of how components of a system are linked and dependent on each other. It is one of the practical tools for managing [[Essential vs Accidental Complexity|essential complexity]] — by controlling how much components know about each other, we control how much change propagates through the system.

Tight coupling means the connection is very deep. Components know about each other and change in one leads to change in the other. Loose coupling means they are connected but not to a degree where changes in one lead to changes in the other.

"Knows about" in code means there is a statement like `import B from "path"` — A knows B exists. But what B is and how it's used affects the level of coupling. A direct import of a concrete class implies tight coupling.

Loose coupling happens by changing the flow of control. Three distinct concepts work together to achieve this:

- **Interface** is the mechanism — a contract that defines what the abstraction looks like. Instead of A -> B we have A -> C <- B, where C is the contract.
- **Dependency Inversion** is the principle — depend on abstractions, not concretions. It's the idea that high-level modules should not depend on low-level details.
- **Dependency Injection** is the technique — injecting the dependency from outside instead of having the class create it. It's how you deliver the abstraction.

You can do injection without interfaces, and define interfaces without injection. The full power comes when you combine all three.

[[Separation of Concerns as Meta-Principle|Separation of concerns]] is how you achieve low coupling — by disentangling interleaved concerns, you reduce how much any one module needs to know about others.

### Test for coupling

> *If I change this file, what else has to change, and how would I know?*

If the answer requires tribal knowledge, the coupling is hidden and fragile.
