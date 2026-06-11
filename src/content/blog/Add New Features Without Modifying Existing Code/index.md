---
title: "Add New Features Without Modifying Existing Code"
description: "The Open-Closed Principle says that adding a new feature should not require changing old code. The goal is to add behavior by adding new code — a new class, a new implementation — not by modifying what already works."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "add-new-features-without-modifying-existing-code"
---

The Open-Closed Principle says code should be open for extension but closed for modification. Adding a new feature should not require changing old code.

In practice: if every new requirement forces you to open an existing class and edit it, that class has too many reasons to change, and any edit risks breaking existing behavior. The goal is to add behavior by adding new code — a new class, a new implementation — not by modifying what already works.

This is achieved through the same mechanism as dependency inversion: define an interface or abstract type, add new behavior by writing a new implementation of that type. The classes that depend on the interface are never touched.

The principle connects to how business problems work: you have a prototype, you ship it, and customers tell you what to change. The changes should be as localized as possible. If adding a new payment method requires editing the checkout flow, the routing logic, and the notification system, the design is not closed for modification.

The test is simple: can you add a new use case by adding files, or do you have to modify existing ones? A design that passes this test is one where the blast radius of any change is contained.
