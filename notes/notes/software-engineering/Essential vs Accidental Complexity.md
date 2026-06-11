---
type: definition
tags:
  - "#complexity"
---
In the essay "No Silver Bullet," Frederick P. Brooks argues that there are two types of complexity in software engineering: essential problems and accidental problems.

Essential problems are inherent properties of the craft itself. They consist of four properties: complexity, conformity, changeability, and invisibility.

Complexity emerges because the real world is complex, and its needs are complex. Solving real world problems requires dealing with complex concerns that interlink with each other and depend on each other.

Conformity emerges from the fact that the world has limitations that software needs to conform to and respect — legacy systems, regulations, institutional processes that won't change for you. The software has to bend because those things won't.

Changeability emerges from the fact that the world is forever changing. Also, new requirements emerge once a solution is being built, as users interact with it. Clients don't really know what they want, which is why Brooks suggests prototyping and thinking in terms of growing software instead of building it.

Invisibility — software is a non-tangible thing. You don't see it. You need abstraction to be able to reason about it, in terms of business domains, concerns, layers, modules.

Accidental problems result from the context of building software — the tools, technologies, and the way the work is organized. They are consequences of the technological environment and how teams work.

Brooks argues that no single technology will ever give us a 10x productivity gain because essential complexity is immune to tooling improvements. We've gotten good at reducing accidental complexity with better languages and frameworks, but the essential stuff doesn't shrink. What we can do is build best practices for growing software — identifying patterns, being aware of [[Separation of Concerns as Meta-Principle|separation of concerns]], [[Coupling what it is, why it matters|coupling]], and [[Cohesion, the goal of good module design|cohesion]] — to manage the inherent problems of complexity and changeability.






