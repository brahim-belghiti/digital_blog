---
tags:
  - anki-cards
source: "[[the bulk of software design is managing dependencies]]"
---

TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What is the central problem that software design solves?
Back: Managing dependencies — deciding what knows about what, and cutting unnecessary connections between modules. Rigidity, fragility, and non-reusability are all symptoms of the same cause: modules knowing more about each other than they need to.
Tags: software-design dependencies solid
<!--ID: 1779384126855-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Cloze
Text: Single Responsibility Principle: a class should have {{c1::one reason to change}}.
Tags: solid srp
<!--ID: 1779384126861-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What does "responsibility" mean in the Single Responsibility Principle?
Back: A source of change — not a function, but who or what could request a change to this class. Ask: how many different people or requirements could cause this class to change? If more than one, it has more than one responsibility.
Tags: solid srp responsibility
<!--ID: 1779384126866-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Cloze
Text: Open-Closed Principle: code should be open for {{c1::extension}} but closed for {{c2::modification}}.
Tags: solid ocp
<!--ID: 1779384126871-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: How is the Open-Closed Principle achieved in practice?
Back: Through interfaces. New behavior means a new implementation of an existing interface — not editing the class that already works. The calling code depends on the interface and never needs to change.
Tags: solid ocp interfaces
<!--ID: 1779384126877-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What does the Liskov Substitution Principle say?
Back: Subtypes must be substitutable for their base type. Any code that uses an interface must work with any implementation of that interface without knowing which specific type it has.
Tags: solid lsp
<!--ID: 1779384126883-->
END


TARGET DECK
programming languages::syntax & paradigms::OOP

START
Basic
Front: What is the practical sign that the Liskov Substitution Principle is violated?
Back: instanceof checks — when the caller needs to know the concrete type to behave correctly, the interface contract is broken and the subtype is not substitutable.
Tags: solid lsp instanceof
<!--ID: 1779384126889-->
END
