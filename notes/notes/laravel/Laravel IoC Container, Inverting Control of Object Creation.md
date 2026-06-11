---
type: claim
tags:
  - IOC
---
Inversion of Control is a principle where a class gives up responsibility for creating its own dependencies. Instead of writing `new CalculationService()` inside a class — taking control of creation and becoming tightly coupled to that concrete detail — the class declares what it needs and something external handles creation and delivery.

Laravel's service container is its implementation of this principle. You type-hint a class or interface in your constructor, and the container resolves and injects the concrete implementation at runtime. Your class never calls `new`, never knows how the dependency was built, and never knows what other dependencies that dependency might have.

This is DIP made practical. The class depends on an abstraction — or at minimum stops owning the creation of a concretion — and the container does the wiring between what is declared and what is delivered.

_Connected to: [[Dependency Inversion Principle, Depend on Abstractions, Not Concretions]] — IoC container is the mechanism that makes DIP practical in Laravel. [[Coupling what it is, why it matters]] — giving up `new` reduces coupling to concrete implementation details. [[Open Close Principle, Extend Without Modifying]] — swapping implementations becomes possible when the container controls creation._