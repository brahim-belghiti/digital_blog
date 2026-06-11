---
title: "Data vs Behavioral Variation"
description: "When variation is in data, parameterize. When variation is in behavior, use polymorphism. Reaching for polymorphism when you only have data variation adds accidental complexity."
date: "Jun 11 2026"
tags: ["software-design", "oop", "solid"]
url: "data-vs-behavioral-variation"
---

Data variation is when the logic does not change but the expected results or the data could be different. Behavioral variation is when the implementation changes — which requires a change in the logic itself.

This distinction matters because it tells you which tool to reach for.

Polymorphism — interfaces with different implementations — is suited to behavioral variation. Different types genuinely do different things. For data variation, a simple reusable method with parameters suffices — you pass the varying part as a value rather than building a type hierarchy.

Reaching for polymorphism when you only have data variation adds accidental complexity. You end up with multiple classes where every implementation has the same structural logic with different values plugged in. Three classes, three files, an interface, container bindings — when what actually varied was one parameter.

This is the key test for whether OCP abstraction through polymorphism is warranted: is the variation behavioral (different logic, different structure, different outcomes) or is it just different data flowing through the same logic? If it's just data, pass it as a value.
