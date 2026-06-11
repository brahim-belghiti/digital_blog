---
tags:
  - complexity
  - architecture
  - moc
---

Software is complex, but we need to distinguish between [[Essential vs Accidental Complexity|essential and accidental complexity]]. Essential problems are inherent to the craft of making software: complexity, conformity, changeability, and invisibility. Accidental problems arise from the context of building software — the tools we use, the hardware, how teams organize. We have become better at tackling accidental problems with more performant hardware, better tools, higher level languages, and better management styles. But we can never remove the essential problems — we can only do our best at tackling them.

To address complexity we need to build good [[Abstraction as Complexity Management|abstractions]] to reason about it. A principle like [[Separation of Concerns as Meta-Principle|separation of concerns]] helps because we can break each problem into small concerns and tackle each one. Breaking things into concerns raises the question of [[Coupling what it is, why it matters|coupling]] and [[Cohesion, the goal of good module design|cohesion]] — and we should strive to always have high cohesion and low coupling to have better maintainable systems.

## Atomic Notes

- [[Essential vs Accidental Complexity]] — the foundational distinction, everything else is a response to essential complexity
- [[Separation of Concerns as Meta-Principle]] — the meta-principle that organizes complexity without reducing it
- [[Coupling what it is, why it matters]] — the measure of dependencies between modules, managed through interfaces, inversion, and injection
- [[Cohesion, the goal of good module design]] — the measure of unity within a module, the basis of SRP
- [[Abstraction as Complexity Management]] — hiding and naming as tools to make invisible software navigable
