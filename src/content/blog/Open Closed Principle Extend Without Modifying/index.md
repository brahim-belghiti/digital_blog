---
title: "Open/Closed Principle: Extend Without Modifying"
description: "Code should be open for extension but closed for modification. New behavior means a new implementation — existing code stays untouched. The mechanism differs by language but the goal is the same."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "open-closed-principle-extend-without-modifying"
---

The Open/Closed Principle says code should be closed to modification but open to extension. You should not have to change method definitions after you've defined them. New behavior means a new implementation — existing code stays untouched.

This avoids the risk of changing things in multiple places when a change is requested, and avoids growing if-checks when business requirements change later.

OCP applies when there is behavioral variation — when different types genuinely do different things. When the variation is only in data — same logic, different inputs or queries — polymorphism is overkill and adds accidental complexity. In that case, parameterization is more honest.

The mechanism that makes OCP possible depends on the language. In class-oriented languages like PHP, interfaces and class composition are the primary tools — you define contracts and let implementations vary. In function-oriented languages like JavaScript, higher-order functions and closures are the natural mechanism — you pass behavior as values. The principle is the same across languages, but the idiomatic mechanism differs.

SRP tells you where to draw boundaries; OCP tells you how to make those boundaries extensible. Together they describe a codebase that can absorb new requirements without touching what already works.
