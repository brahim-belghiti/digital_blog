---
type: definition
tags:
  - solid
  - polymorphism
  - ocp
  - interfaces
aliases:
  - OCP
---
Open/Closed Principle is about structuring code so that you don't have to change method definitions after you've defined them. Code should be closed to modification but open to extension. This avoids the risk of changing things in multiple places when a change is requested, and avoids growing if-checks when business requirements change later. New behavior means a new implementation, existing code stays untouched. OCP applies when there is behavioral variation — when different types genuinely do different things. When the variation is only in data — same logic, different inputs or queries — polymorphism is overkill and adds accidental complexity. In that case, parameterization or explicit code is more honest.

The mechanism that makes OCP possible depends on the language. In class-oriented languages like PHP, interfaces and class composition are the primary tools — you define contracts and let implementations vary. In function-oriented languages like JavaScript, higher-order functions and closures are the natural mechanism — you pass behavior as values. The principle is the same across languages, but the idiomatic mechanism differs.

**Connections:** [[SRP]] — SRP tells you where to draw boundaries, OCP tells you how to make those boundaries extensible. [[Data vs Behavioral Variation]] — the key test for whether OCP abstraction through polymorphism is warranted. [[Passing Values vs Building Type Hierarchies]] — the functional alternative to class-based extension.

**Connections:** [[Single responsibility principle - One Reason to Change, Not One Thing |SRP]] — SRP tells you where to draw boundaries, OCP tells you how to make those boundaries extensible. [[Data vs Behavioral Variation]] — the key test for whether OCP abstraction is warranted.

