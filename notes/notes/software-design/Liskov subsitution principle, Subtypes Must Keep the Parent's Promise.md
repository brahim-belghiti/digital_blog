---
type: definition
tags:
  - solid
  - lsp
---
Liskov Substitution Principle says that a subtype should be able to replace its parent type without breaking the expected behavior. The rest of the application is written against the parent — it doesn't know or care if a subclass shows up at runtime. So the subclass must honor what the parent promised.

Violating LSP causes the application to break in unexpected ways — a caller expecting a certain type or structure gets something different, and things that were working suddenly stop working without an obvious reason.

The moment to be careful is when overriding an inherited method. You can change the internal logic completely — how something is calculated, how something is fetched — but you must keep the contract: the return type, the shape of the result, the expected behavior from the caller's perspective.

The practical violation is `instanceof` checks — `if ($shape instanceof Square)` branches. When callers need to know the specific type to behave correctly, the interface contract is broken.

In Laravel terms: if you have an interface `PaymentGateway` with a method `charge(int $amount): Receipt`, every implementation must return a `Receipt` — not throw unconditionally, not return null. The controller that calls `charge()` should not need to care which gateway it has.

_Connected to: [[Open Close Principle, Extend Without Modifying]] — you extend without modifying; LSP ensures that extension doesn't betray existing code. [[Coupling what it is, why it matters]] — LSP violations create hidden coupling between caller and subclass internals. [[polymorphism inverts the dependency between modules by introducing an interface]] — LSP is what makes polymorphism trustworthy._