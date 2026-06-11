---
tags:
  - meta
---
# Vault context

This file is for Claude Code sessions in this vault. Read it before reading other files.

## Purpose

This vault is for developing opinions about software, systems, and business. Full purpose and philosophy is in `_meta/why this exist, why it will be shaped and maintained.md`.

Three domains: software development, systems thinking, business and value.
Secondary purposes: philosophy, literature, art — and Morocco politics, history, social and geopolitical realities.

Pipeline: `inbox/` (raw) → `notes/` (atomic) → `moc/` (connected) → opinions (formed).

## Folder structure

```
inbox/          Raw captures, not yet processed
notes/          Atomic notes organized by topic
  reactjs/      React JS — 49 notes
  laravel/      Laravel patterns — 26 notes
  payloadcms/   Payload CMS — 6 notes
  js/           JavaScript — 12 notes (values, variables, expressions, execution context, closures)
  oop/          Object-Oriented Programming — 3 notes
  software-design/   SOLID principles, dependency management — 11 notes
  software-engineering/  General software engineering principles — 7 notes
  security/     Web security concepts — 4 notes (CORS, XSS, CSRF, HttpOnly)
  philosophy/   Philosophy, personal reflection — 4 notes
  ai/           AI/LLM concepts — 3 notes
  java/         Java — 1 note
moc/            Maps of Content — entry points to topic clusters
anki/           Flashcard-style notes — folder structure mirrors Anki deck hierarchy
  _template.md  Card template (Basic and Cloze formats)
  abstractions-about-the-self/
  core-programming-concepts/control-flow/, data-structures/
  programming-languages/
    frameworks-and-libraries/react-js/, laravel/
    language-specific-concepts/javascript-mental-models/
    syntax-and-paradigms/oop/
  software-architecture/back-end-concepts/, front-end-concepts/, system-design/
assets/         Images
_meta/          Notes about the vault itself (purpose, templates)
sources/        Raw source material kept for reference
  The Ultimate Guide to Hoisting, Scopes, and Closures in JavaScript.md
notes-by-date.md  All notes/ sorted by last-modified date (newest first) — use for recent-activity overview
```

## MOCs

Read the relevant MOC before reading atomic notes. Each MOC is a narrative that covers its whole cluster.

- `moc/where-logic-lives-in-laravel.md` — all 26 laravel notes: type safety (enums, casts, magic strings), authorization (gates, policies, gate registry), architecture (action classes, form requests, API resources, jobs, events/listeners), design patterns (observer, command, strategy), layered architecture, state layers, architecture vs performance
- `moc/software-complexity.md` — essential vs accidental complexity, abstraction, separation of concerns, coupling, cohesion — links into `notes/software-engineering/`
- `moc/how-payload-generates-an-app.md` — all 6 payloadcms notes: config, collections, fields, hooks, database layer
- `moc/how-react-turns-state-into-ui.md` — React thesis MOC (`UI = f(state)`), links out to React sub-MOCs below
- `moc/how-software-manages-dependencies.md` — OOP and SOLID: why dependencies cause fragility and rigidity, polymorphism as the mechanism to invert them, SRP / OCP / LSP as the formalization
- `moc/how-javascript-runs-code.md` — JS execution model: execution contexts, hoisting, scope chain, closures — all as consequences of one mechanism

## React sub-MOCs (in notes/reactjs/)

The React folder is large. These files act as sub-MOCs:

- `_React JS.md` — onboarding entry: what to know, understand, and practice if new to React
- `core concepts to understand in React JS.md` — render lifecycle, reconciliation, hooks, state types, server components, suspense, concurrent mode
- `react application architecture.md` — patterns: container/presenter, custom hooks, HOCs, folder structure
- `rules of React JS.md` — rules that must not be broken (hooks at top level, keys, unidirectional data flow, etc.)

## Note maturity

Every atomic note has a `type:` field in its frontmatter. Three values:

- **`type: definition`** — what something is. Correctness is the only bar. Fine to stay here permanently as load-bearing vocabulary.
- **`type: claim`** — a statement about how things work that could be argued with. Has a position; includes a cost, a trade-off, or a when-it's-wrong.
- **`type: opinion`** — a position the author would defend in a design discussion, backed by wikilinks to supporting notes.

The upgrade trigger is real experience: a disagreement, a choice between approaches, a time the docs were wrong. Open the note, edit it in place, bump the type. The note's backlinks survive. Do not write a new note next to it.

To see what the vault has actually produced: search `type: opinion` or `type: claim` in Obsidian to filter.

When writing new notes: assign `type:` at creation. When quizzing or reviewing: prefer claims and opinions over definitions.

## Note style

- **Atomic notes**: one idea per note, written in the author's words
- **Filename style**: sentence-as-title everywhere (`useState is a hook for managing state.md`, `a policy groups all authorization rules for one model in one class.md`). The laravel notes were renamed from kebab-slugs; each keeps its old slug as a frontmatter alias (`aliases: [laravel-policies]`), so old slugs still resolve in autocomplete. New notes: always sentence-as-title, ideally claim-form.
- **Wikilinks**: aliased when title is long — `[[full title|short display]]`
- **MOC prose**: narrative with inline wikilinks, not bullet lists
- **Writing style**: plain prose, direct sentences, simple words — no metaphors, no clever framings

## Key single files


- `_meta/why this exist, why it will be shaped and maintained.md` — full vault purpose; read this when you need depth on what the vault is optimizing for
