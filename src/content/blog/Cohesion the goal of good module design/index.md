---
title: "Cohesion: The Goal of Good Module Design"
description: "Cohesion means code grouped in a module serves the same purpose and changes for the same reason. High cohesion reduces coupling and is the foundation behind the Single Responsibility Principle."
date: "May 30 2026"
tags: ["cohesion", "architecture", "complexity", "coupling"]
url: "cohesion-the-goal-of-good-module-design"
---

Cohesion means code grouped in a module serves the same purpose and changes for the same reason. A module with high cohesion has one job, and everything inside it contributes to that job. If you remove any piece, the module can't fulfill its purpose. If you add an unrelated piece, you've lowered cohesion.

Higher cohesion reduces coupling because when everything that belongs together is grouped together, there are few reasons to reach outside the module. This is different from low cohesion where code does different things that need to communicate with many external dependencies, because each piece has its own purpose and its own needs.

This is the basis of the first principle in SOLID, which Robert Martin coined as the Single Responsibility Principle. He stipulated that a class needs one reason to change, and later refined it to say that code depends on one actor. SRP is a formalization of cohesion — cohesion gives you the goal, SRP gives you the test.

[Separation of concerns](./separation-of-concerns-as-meta-principle) is how you achieve high cohesion. By disentangling interleaved concerns, each module ends up with a single unified purpose. And high cohesion naturally reduces [coupling](./coupling-what-it-is-why-it-matters) — misplaced responsibilities inside a module become external dependencies outside it.

### Test for cohesion

> *What single reason would cause me to edit this file?*

If you can answer with one clean sentence, cohesion is functional. If the answer is "lots of different reasons, because lots of features live here," it is weak.

### The cohesion spectrum (Stevens/Myers/Constantine, 1974)

The naive definition — "related code grouped together" — is correct but ambiguous, because *related* has degrees.

| Level | Things grouped because… | Quality |
|---|---|---|
| Coincidental | …no reason at all | worst |
| Logical | …same category ("all I/O") | weak |
| Temporal | …same time ("all startup code") | weak |
| Procedural | …same sequence of steps | medium |
| Communicational | …same data | medium |
| Sequential | …output of one feeds the next | strong |
| **Functional** | **…they accomplish one task** | **best** |

A dashboard controller that bundles finance, alerts, and activity is at the **logical/temporal** level — its contents are grouped because they all happen to show up on one screen, not because they share a task.
