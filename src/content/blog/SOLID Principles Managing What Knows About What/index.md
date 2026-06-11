---
title: "SOLID Principles: Managing What Knows About What"
description: "All five SOLID principles are responses to the same fundamental problem: managing dependencies — controlling what knows about what, the nature of those relationships, and what happens when things change."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "solid-principles-managing-what-knows-about-what"
---

All five SOLID principles are responses to the same fundamental problem: managing dependencies — controlling what knows about what, the nature of those relationships, and what happens when things change. Each principle attacks the problem from a different angle.

**SRP** — a class should have one reason to change, so changes don't ripple into unrelated concerns.

**OCP** — extend behavior without modifying existing code, so new requirements don't destabilize what already works.

**LSP** — subtypes must keep the parent's promise, so callers don't need to know what they're actually dealing with.

**ISP** — interfaces should be small and focused, so implementors aren't coupled to methods they don't need.

**DIP** — depend on abstractions not concretions, so high-level modules are protected from low-level changes.

Following them collectively produces a codebase with high cohesion and low coupling — modules that are focused on one thing, connected to other modules only through what they need, and protected from the blast radius of change happening elsewhere.

The principles are not a checklist to apply mechanically. They are diagnostic tools. When code is fragile, rigid, or hard to reuse, one of these principles points at the source. Fragility — SRP and ISP, things that shouldn't change together are coupled. Rigidity — DIP, high-level modules are depending on low-level details that keep changing. Non-reusability — OCP, useful logic is tangled into context it shouldn't know about. Surprise — LSP, callers are being betrayed by the types they thought they could trust.
