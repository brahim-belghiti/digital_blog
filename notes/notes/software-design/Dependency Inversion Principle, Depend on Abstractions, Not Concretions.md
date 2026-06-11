---
type: definition
tags:
  - dip
  - solid
---
Dependency Inversion Principle says that high-level modules should not depend on low-level details — both should depend on an abstraction. The flow of control still goes from A to B at runtime, but the source-code dependency points to an interface C, not to B directly. A knows about C, B implements C, and A never imports B.

The problem it solves is change propagation. When you depend directly on a concrete class — especially by creating it yourself with `new` — any change to that class can break your code, and the blast radius is unknown. An interface breaks that propagation: as long as the contract holds, the implementation can change freely.

An interface earns its place when there is real behavioral variation — different implementations that could swap depending on context. When there is only one implementation and no realistic reason to swap, depending on a concrete class is fine. Introducing an interface there is accidental complexity, not good design.

Laravel's IoC container is DIP in practice. You declare what you need in the constructor, and the container does the wiring — delivering the concrete implementation without your class ever calling `new`. You depend on the abstraction; the container resolves the detail.

_Connected to: [[Open Close Principle, Extend Without Modifying]] — DIP is what makes OCP possible at the system level. [[Coupling what it is, why it matters]] — depending on abstractions reduces coupling to implementation details. [[Laravel IoC Container, Inverting Control of Object Creation]] — Laravel's mechanism for doing the wiring that DIP requires._