---
title: "Liskov Substitution Principle: Subtypes Must Keep the Parent's Promise"
description: "LSP says a subtype must be substitutable for its parent without breaking the expected behavior. The practical violation to watch for is instanceof checks — when callers need to know the specific type, the interface contract is broken."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "liskov-substitution-principle-subtypes-must-keep-the-parents-promise"
---

Liskov Substitution Principle says that a subtype should be able to replace its parent type without breaking the expected behavior. The rest of the application is written against the parent — it doesn't know or care if a subclass shows up at runtime. So the subclass must honor what the parent promised.

Violating LSP causes the application to break in unexpected ways — a caller expecting a certain type or structure gets something different, and things that were working suddenly stop working without an obvious reason.

The moment to be careful is when overriding an inherited method. You can change the internal logic completely — how something is calculated, how something is fetched — but you must keep the contract: the return type, the shape of the result, the expected behavior from the caller's perspective.

The practical violation is `instanceof` checks — `if ($shape instanceof Square)` branches. When callers need to know the specific type to behave correctly, the interface contract is broken.

In Laravel terms: if you have an interface `PaymentGateway` with a method `charge(int $amount): Receipt`, every implementation must return a `Receipt` — not throw unconditionally, not return null. The controller that calls `charge()` should not need to care which gateway it has.

LSP is what makes polymorphism trustworthy. Without it, adding a new subclass is a risk. With it, the subclass is just a new implementation — safe to swap in, safe to extend.
