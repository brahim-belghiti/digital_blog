---
type: claim
tags:
  - oop
---
The four principles — learn the names and one-sentence definitions:

- **Encapsulation** — bundle data and the methods that operate on it together; hide internal state from outside access.
- **Inheritance** — a class can be based on another class, reusing its properties and methods.
- **Polymorphism** — the same interface, different implementations; different classes respond to the same method call in different ways.
- **Abstraction** — expose only what the caller needs, hide the complexity behind a clean interface.

Of the four, polymorphism is structurally the most important. Encapsulation existed in C through structured programming. Inheritance is useful but limited (multiple inheritance creates problems; composition often replaces it). Abstraction is not unique to OOP. Polymorphism through interfaces is what OOP actually contributes: the ability to invert source-code dependencies.

Related: [[polymorphism inverts the dependency between modules by introducing an interface]], [[OOP is primarily a tool for managing dependencies, not for modeling the real world]]
