---
tags:
  - anki-cards
source: "[[OOP is primarily a tool for managing dependencies, not for modeling the real world]]"
---

TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What are the four principles of OOP?
Back: Encapsulation — bundle data and methods, hide internal state. Inheritance — a class can be based on another, reusing properties and methods. Polymorphism — same interface, different implementations. Abstraction — expose only what the caller needs, hide complexity.
Tags: oop principles fundamentals
<!--ID: 1779384126896-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: Which OOP principle is structurally the most important, and why?
Back: Polymorphism. Encapsulation existed in procedural C through structs. Inheritance has serious limitations. What OOP uniquely contributes at scale is safe, managed polymorphism through interfaces — the ability to invert source-code dependencies.
Tags: oop polymorphism principles
<!--ID: 1779384126902-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What is the real purpose of OOP?
Back: Managing dependencies — giving you control over which direction dependencies point in your code. Not modeling the real world. A good abstraction does not always align with how the domain looks.
Tags: oop dependencies fundamentals
<!--ID: 1779384126907-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What are the three symptoms of unmanaged dependencies in a codebase?
Back: Rigidity — a change in one module forces changes in others. Fragility — changing one thing breaks unrelated things. Non-reusability — you can't extract a useful part because it's tangled to parts you don't want.
Tags: oop dependencies design
<!--ID: 1779384126912-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: How does polymorphism invert the dependency between module A and module B?
Back: Without an interface: A depends on B directly — both flow of control and source dependency go A → B. With an interface: A depends on the interface, B implements it. Flow of control is A → Interface → B, but source dependency is A → Interface ← B. B can change or be replaced without A knowing.
Tags: oop polymorphism dependency-inversion interfaces
<!--ID: 1779384126918-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Cloze
Text: Without an interface, A → B (flow of control and dependency go the same way). With an interface: flow of control is A → Interface → B, but source dependency is {{c1::A → Interface ← B}}. The dependency now points against the flow of control.
Tags: oop polymorphism dependency-inversion
<!--ID: 1779384126924-->
END
