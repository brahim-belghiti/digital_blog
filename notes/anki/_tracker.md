---
tags:
  - meta
---

# Anki card tracker

Each row is a note cluster. When you export to Anki, check the box. When new atomic notes are added to a cluster, uncheck it and add a note.

## Done — exported to Anki

- [x] `notes/js/` — execution context, hoisting, scope chain, closures (4 notes → 8 cards) `execution-context-scope-closures.md`
- [x] `notes/oop/` — four principles, polymorphism, OOP as dependency tool (3 notes → 6 cards) `oop-principles-and-polymorphism.md`
- [x] `notes/software-design/` — managing dependencies, SRP, OCP, LSP (4 notes → 7 cards) `solid-principles.md`
- [x] `notes/laravel/` — form requests, API resources, jobs, state layers, architecture vs performance (5 notes → 10 cards) `laravel-architecture.md`
- [x] `notes/reactjs/` — business rules separation, RuleResult, form vs domain validation, extract heuristic (4 notes → 7 cards) `business-logic-separation.md`
- [x] `notes/laravel/` — authorization: gates, policies, gate registry, authorize method, trait, auth vs authz, policy testing (8 notes → 9 cards) `laravel-authorization.md`
- [x] `notes/laravel/` — type safety: magic strings, backed enums, eloquent casting (3 notes → 6 cards) `laravel-type-safety.md`
- [x] `notes/laravel/` — patterns & architecture: observer, command, strategy, events/listeners, layered architecture, action classes, DTOs, controller SRP (8 notes → 12 cards) `laravel-patterns-and-architecture.md`
- [x]  - ~~`notes/reactjs/` — existing 49 notes: large cluster, needs a full pass (hooks, state, reconciliation, performance, patterns, server components, etc.)~~

## Not yet done

- [ ] `notes/js/` — existing 8 notes: values, variables, expressions (some covered by JS memory cards already — check for overlap before extracting)
- [ ] `notes/payloadcms/` — 6 notes: config, collections, fields, hooks, database layer
- [ ] `notes/philosophy/` — 4 notes: review for card-worthiness (not everything here is recall-worthy)

## Overlap to check before extracting js/ existing notes

The existing cards in `javascript-mental-models/JS Memory = Reference Graph.md` already cover:
- What is a value in JavaScript
- Variables as bindings / references
- Garbage collection and reachability
- Primitives vs objects (value vs reference semantics)

Don't duplicate those when doing the pass on `notes/js/`.
