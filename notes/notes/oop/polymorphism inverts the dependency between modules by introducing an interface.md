---
type: claim
tags:
  - oop
  - software-design
---
Without an interface, module A that calls a method on module B has a source code dependency on B. If B changes, A must change too. The flow of control and the direction of dependency point the same way: A → B.

Polymorphism breaks this. You introduce an interface between them. A depends on the interface. B implements the interface. Now:

```
Flow of control:  A → Interface → B
Source dependency: A → Interface ← B
```

The source code dependency now points against the flow of control. A no longer knows B exists. You can change B, replace B with another implementation, or test A without B at all.

This is why polymorphism is the most important property of OOP — not inheritance, not encapsulation. Those existed before OOP. Polymorphism through interfaces is what gives you structural control over your codebase.

In practice: every time you type-hint an interface in a constructor instead of a concrete class, you're using this. Laravel's service container makes it automatic — bind an interface to an implementation in a service provider, and any class that depends on the interface gets the right concrete class injected.

Related: [[OOP is primarily a tool for managing dependencies, not for modeling the real world]]
