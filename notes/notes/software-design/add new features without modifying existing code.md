---
type: claim
tags:
  - software-design
  - solid
---
The Open-Closed Principle: code should be open for extension but closed for modification. Adding a new feature should not require changing old code.

In practice: if every new requirement forces you to open an existing class and edit it, that class has too many reasons to change, and any edit risks breaking existing behavior. The goal is to add behavior by adding new code — a new class, a new implementation — not by modifying what already works.

This is achieved through the same mechanism as dependency inversion: define an interface or abstract type; add new behavior by writing a new implementation of that type. The classes that depend on the interface are never touched.

The principle connects to how business problems work: you have a prototype, you ship it, and customers tell you what to change. The changes should be as localized as possible. If adding a new payment method requires editing the checkout flow, the routing logic, and the notification system, the design is not closed for modification.

Related: [[the bulk of software design is managing dependencies]], [[a class should have one reason to change]], [[Liskov subsitution principle, Subtypes Must Keep the Parent's Promise]]
