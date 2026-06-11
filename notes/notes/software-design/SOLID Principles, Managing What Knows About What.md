---
type: claim
tags:
  - solid
---
All five SOLID principles are responses to the same fundamental problem: managing dependencies — controlling what knows about what, the nature of those relationships, and what happens when things change. Each principle attacks the problem from a different angle.

- **SRP** — a class should have one reason to change, so changes don't ripple into unrelated concerns
- **OCP** — extend behavior without modifying existing code, so new requirements don't destabilize what already works
- **LSP** — subtypes must keep the parent's promise, so callers don't need to know what they're actually dealing with
- **ISP** — interfaces should be small and focused, so implementors aren't coupled to methods they don't need
- **DIP** — depend on abstractions not concretions, so high-level modules are protected from low-level changes

Following them collectively produces a codebase with high cohesion and low coupling — modules that are focused on one thing, connected to other modules only through what they need, and protected from the blast radius of change happening elsewhere.

_Connected to: [[Single responsibility principle - One Reason to Change, Not One Thing]] [[Open Close Principle, Extend Without Modifying]] [[Liskov subsitution principle, Subtypes Must Keep the Parent's Promise]] [[Interface Segregation Principle, Interfaces Should Be Small and Focused]] [[Dependency Inversion Principle, Depend on Abstractions, Not Concretions]] — each is an atomic note. [[Cohesion, the goal of good module design]] [[Coupling what it is, why it matters]] — the Day 1 concepts these principles operationalize. [[Separation of Concerns as Meta-Principle]] — the meta-principle all of SOLID serves._




