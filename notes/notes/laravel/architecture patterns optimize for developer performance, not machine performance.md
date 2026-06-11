---
type: opinion
aliases:
  - architecture-patterns-optimize-for-developer-performance-not-machine-performance
id: architecture-patterns-optimize-for-developer-performance-not-machine-performance
title: Architecture Patterns vs Runtime Performance
tags:
  - laravel
  - architecture
  - performance
---

# Architecture Patterns Optimize for Developer Performance, Not Machine Performance

A fat controller and a thin controller with Form Request, Action, and Resource compile to PHP opcodes that run at nearly the same speed. The architectural difference adds microseconds. Real performance problems live elsewhere: N+1 queries, missing indexes, eager loading, synchronous external API calls, absent caching.

```
Architectural patterns → 0.01ms overhead
Missing database index → 10x to 100x slower queries
N+1 query problem     → queries × rows slower
```

## What patterns actually buy

Patterns solve human problems, not machine problems:

- **Testability** — an Action can be unit tested with no HTTP stack, no database, no mocks. A fat controller needs the full environment.
- **Maintainability** — when business logic lives in one place, changing requirements means one file. Fat controllers scatter logic.
- **Reusability** — an Action can be called from a controller, a CLI command, and a queued job. Controller logic can only be called via HTTP.
- **Readability** — the controller method signature documents what happens. A fat controller requires reading 50 lines to understand intent.

## The cost of over-abstraction

Abstraction is not free either. Five classes for a simple CRUD operation increases cognitive load, makes execution flow harder to follow, and adds indirection that obscures simple logic. The pattern should match the complexity.

## The mental model

**Code architecture** = optimizing for developer experience (future maintainer, onboarding, debugging time).  
**Runtime optimization** = optimizing for machine and user experience (response time, throughput).

These are different problems, solved with different tools, measured in different ways. First make it right, then make it fast — and profile before optimizing.

→ [[action classes encapsulate one business operation in one class|action classes]]: the pattern worth its cost when logic is complex or reused.
→ [[a layer should only know its direct dependency, never who depends on it|layered architecture]]: the macro version of the same tradeoff.
