---
title: "Dependency Inversion Principle: Depend on Abstractions, Not Concretions"
description: "DIP says that high-level modules should not depend on low-level details — both should depend on an abstraction. An interface breaks change propagation: as long as the contract holds, the implementation can change freely."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "dependency-inversion-principle-depend-on-abstractions-not-concretions"
---

Dependency Inversion Principle says that high-level modules should not depend on low-level details — both should depend on an abstraction. The flow of control still goes from A to B at runtime, but the source-code dependency points to an interface C, not to B directly. A knows about C, B implements C, and A never imports B.

The problem it solves is change propagation. When you depend directly on a concrete class — especially by creating it yourself with `new` — any change to that class can break your code, and the blast radius is unknown. An interface breaks that propagation: as long as the contract holds, the implementation can change freely.

An interface earns its place when there is real behavioral variation — different implementations that could swap depending on context. When there is only one implementation and no realistic reason to swap, depending on a concrete class is fine. Introducing an interface there is accidental complexity, not good design.

Laravel's IoC container is DIP in practice. You declare what you need in the constructor, and the container does the wiring — delivering the concrete implementation without your class ever calling `new`. You depend on the abstraction; the container resolves the detail.

DIP is what makes OCP possible at the system level. Without depending on abstractions, there is no clean place to swap implementations, and extension always requires modification.
