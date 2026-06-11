---
type: definition
tags:
  - solid
  - isp
  - interfaces
---
Interface Segregation Principle says that interfaces should be small and focused, so that classes only have to implement what they actually need. A fat interface that demands too many methods just moves the problem of a bloated class up one level — the implementing class is still forced to carry weight that isn't its concern.

Violating ISP creates unnecessary coupling — a class becomes dependent on methods it doesn't use, and when those methods change, the class is affected anyway. This is the blast radius problem at the interface level.

ISP connects directly to SRP — each interface should have one reason to change. And small, focused interfaces mean implementors only depend on what is relevant to them, which is high cohesion at the contract level.

_Connected to: [[Single responsibility principle - One Reason to Change, Not One Thing]] — one reason to change applies to interfaces too. [[Cohesion, the goal of good module design]] — focused interfaces produce focused dependencies. [[Coupling what it is, why it matters]] — fat interfaces force coupling to irrelevant concerns._