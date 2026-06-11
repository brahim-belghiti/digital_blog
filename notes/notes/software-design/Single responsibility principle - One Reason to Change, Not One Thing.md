---
type: claim
tags:
  - solid
  - single-responsibility
---
Single Responsibility Principle is an approach to organising and structuring code — it is not about solving business domain problems — to ensure good quality maintainable code. It consists of looking at classes and identifying reasons for them to change: either _what_ can cause a change, or _who_ (what agent of the system) can request a change. If there is more than one reason, the class is doing too much and you should think of extracting code. A class can violate SRP even if only one stakeholder uses it, when their requests touch different domains that evolve independently. If the problem is not addressed, the code becomes hard to reason about, hard to maintain and grow. There is also the risk of bugs — you want to change something and you touch other methods unintentionally. The blast radius of a change becomes unpredictable.

**Connections:** [[Cohesion, the goal of good module design|cohesion]] — high cohesion means everything in a class changes for the same reason, which is what SRP aims for. [[Separation of Concerns as Meta-Principle|separation of concern]] — SRP is SoC applied at the class level. [[a class should have one reason to change]] — concise formulation with a concrete example.

