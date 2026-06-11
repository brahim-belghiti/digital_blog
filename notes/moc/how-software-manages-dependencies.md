---
tags:
  - moc
  - oop
  - software-design
---
# How software manages dependencies

Every symptom of bad code — confusing, fragile, rigid, not reusable — has the same root cause: modules knowing more about each other than they need to. [[the bulk of software design is managing dependencies]] is the claim. This MOC is the argument behind it.

## The problem

When a high-level module depends directly on a low-level one, a change in the low-level module forces the high-level one to change too. The flow of control and the direction of dependency point the same way. That is rigidity: everything is coupled, so nothing can change in isolation. Fragility follows — you change one thing and something unrelated breaks. Non-reusability follows too — you cannot extract the useful part because it is tangled to parts you don't want.

All three are symptoms of unmanaged dependencies.

## What OOP actually contributes

OOP is marketed as a way to model the real world. That framing is misleading and sometimes produces bad designs — a good abstraction does not always align with how the domain looks. [[OOP is primarily a tool for managing dependencies, not for modeling the real world]] is the more accurate claim.

The tool it contributes is [[polymorphism inverts the dependency between modules by introducing an interface|polymorphism]]. Without an interface, A depends on B: source code dependency and flow of control run the same direction. Introduce an interface: A depends on the interface, B implements it. Now the source code dependency points against the flow of control. A can change without knowing B changed. B can be swapped for another implementation without A noticing. You have control over the dependency structure.

Encapsulation and inheritance predate OOP — procedural C had `struct` with data hidden behind functions, and some languages had prototype chains. What OOP gave the industry at scale was safe, managed polymorphism through interfaces. [[the four principles of OOP are encapsulation, inheritance, polymorphism, and abstraction|The four principles]] are worth knowing by name, but polymorphism is the structurally important one.

## SOLID: the formalization

SOLID is the set of principles that tell you where to apply the dependency-management tools. Each one is an answer to a specific version of the same question.

**[[a class should have one reason to change|Single Responsibility Principle]]** — a class should have one reason to change. "Responsibility" means source of change, not function. If two methods in a class would change for different reasons — different people, different requirements — they should be in different classes. Mixing concerns in one class means a change for one reason risks the code serving a different reason.

**[[add new features without modifying existing code|Open-Closed Principle]]** — adding a new feature should not require changing old code. New behavior comes from new code — a new implementation of an existing interface — not from opening a working class and editing it. This is the same mechanism as dependency inversion: the calling code depends on an interface, not the implementation, so you add implementations without touching the caller.

**[[Liskov subsitution principle, Subtypes Must Keep the Parent's Promise|Liskov Substitution Principle]]** — if a class implements an interface, any code using the interface must work with that class without knowing which specific type it is. The practical violation is `instanceof` checks: when the caller needs to know the concrete type to behave correctly, the interface contract is broken. Subtypes can only narrow behavior — they cannot make different promises from the base type.

**[[Interface Segregation Principle, Interfaces Should Be Small and Focused|Interface Segregation Principle]]** — interfaces should be small and focused, so that classes only implement what they actually need. A fat interface that demands too many methods moves the problem of a bloated class up one level — the implementing class is still forced to carry weight that isn't its concern. When those irrelevant methods change, the class is affected anyway. ISP is SRP applied to interfaces: one reason to change, at the contract level.

**[[Dependency Inversion Principle, Depend on Abstractions, Not Concretions|Dependency Inversion Principle]]** — high-level modules should not depend on low-level details. Both should depend on an abstraction. The flow of control still goes from A to B at runtime, but the source-code dependency points to an interface, not to B directly. A knows the interface; B implements it; A never imports B. This is what makes OCP possible at the system level — you can add new implementations without the caller ever changing. An interface only earns its place when there is real behavioral variation; introducing one where a single implementation will always exist is accidental complexity.

## The connection to architecture

These principles appear at every scale. In Laravel: a controller that imports a service class directly is a high-level module depending on a low-level one. Injecting through the service container with an interface binding inverts that dependency — the controller knows the interface, the container wires the implementation. The same pattern runs through [[a layer should only know its direct dependency, never who depends on it|layered architecture]], action classes, and every design pattern that decouples a caller from what it calls.

## Re-reading

The argument is one claim at different levels of abstraction: keep what changes separate from what it affects, and use interfaces to control which direction the knowledge flows. SOLID names five specific applications of that claim. OOP provides the mechanism. The patterns and architectures are the techniques for applying it at scale.
