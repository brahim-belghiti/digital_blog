---
type: claim
tags:
  - architecture
  - complexity
  - separation-of-concerns
---
[[Essential vs Accidental Complexity|Essential complexity]] can't be eliminated. SoC is one way we manage it — by breaking complex problems into parts we can reason about. Instead of looking at the problem as a whole, we look at it through concerns that need to be taken care of separately.

SoC does not reduce essential complexity — it redistributes it. The validation still exists, the business logic still exists. None of it goes away. What changes is that no single place carries multiple braided concerns.

Through the simple vs easy lens: SoC first makes things simple — it disentangles interleaved concerns so each piece has one fold, one responsibility. Then as a consequence, the now-simple pieces become easy — near to our ability to reason about them.

The risk is that SoC could lead to over-complicating straightforward problems by overthinking things. It could also hurt maintenance by having many parts scattered that need to be maintained. There is a tension between separation and indirection — every separation gains clarity inside a module but adds a hop someone has to follow to understand the whole flow. At some point the hops cost more than the tangling did.

The engineering judgment is knowing where on that spectrum a given problem belongs.


**Connections:**

- [[Essential vs Accidental Complexity]] — SoC is a response to essential complexity, it organizes what can't be eliminated
- [[Coupling what it is, why it matters]] — SoC is how you achieve low coupling
- [[Cohesion, the goal of good module design]] — SoC is how you achieve high cohesion
- [[Abstraction as Complexity Management]] — abstraction and SoC work together, abstraction names the concerns that SoC separates




