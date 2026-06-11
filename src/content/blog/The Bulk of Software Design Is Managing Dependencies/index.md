---
title: "The Bulk of Software Design Is Managing Dependencies"
description: "The central problem in software is not writing logic — it is deciding where to put things and cutting unnecessary connections between them. Fragility, rigidity, and non-reusability all trace back to the same source: modules knowing more about each other than they need to."
date: "Jun 11 2026"
tags: ["software-design"]
url: "the-bulk-of-software-design-is-managing-dependencies"
---

The central problem in software is not writing logic — it is deciding where to put things and cutting unnecessary connections between them.

When code is confusing, fragile, or rigid, the cause is almost always dependencies. Fragility means changing one thing breaks unrelated things. Rigidity means a change in a low-level module forces high-level modules to recompile and update. Non-reusability means you can't extract a useful part because it is tangled to parts you don't want.

All three symptoms come from the same source: modules knowing more about each other than they need to.

Software design — SOLID principles, design patterns, layered architecture, dependency injection — is the set of techniques for deciding which modules should know about which other modules, and in which direction. The direction matters as much as the existence of the dependency. A high-level business rule depending on a low-level database detail is a design problem. The same information flowing the other way, with the detail depending on an abstraction the high-level module defines, is a design solution.

This is why design patterns exist. Not to be clever or to follow fashionable abstractions, but to give names to common dependency structures that have known properties — known blast radii, known extension points, known failure modes.
