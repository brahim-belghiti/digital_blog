---
type: claim
tags:
  - srp
  - ocp
  - solid
---
SRP and OCP are not sequential steps — they are two lenses you can apply in either order. You can reason about code from the perspective of what needs to be extended and not touched (OCP), and then apply SRP so that each extension changes for one reason. Or you can start with SRP, extract along axes of change, and then apply OCP to make those extracted pieces extensible through interfaces. OCP requires creating interfaces, and the implementations of those interfaces (the services) should themselves respect SRP — each one changing for a single reason. They reinforce each other from different angles toward the same goal: code that can change without breaking.

**Connections:** [[Single responsibility principle - One Reason to Change, Not One Thing|SRP]] — identifies the boundaries by finding axes of change. [[Open Close Principle, Extend Without Modifying]] — makes those boundaries extensible through polymorphism. [[Data vs Behavioral Variation]] — determines whether OCP abstraction at those boundaries is warranted.

