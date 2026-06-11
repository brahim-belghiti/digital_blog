---
title: "Single Responsibility Principle: One Reason to Change, Not One Thing"
description: "SRP is about organizing code so that each class has exactly one reason to change. It's not about how many things a class does, but how many different stakeholders or concerns could force it to change."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "single-responsibility-principle-one-reason-to-change"
---

Single Responsibility Principle is an approach to organizing and structuring code — it is not about solving business domain problems — to ensure good quality maintainable code. It consists of looking at classes and identifying reasons for them to change: either _what_ can cause a change, or _who_ (what agent of the system) can request a change. If there is more than one reason, the class is doing too much.

A class can violate SRP even if only one stakeholder uses it, when their requests touch different domains that evolve independently. The test is not "how many methods does this class have?" but "how many different kinds of requests could force this class to change?"

If the problem is not addressed, the code becomes hard to reason about and hard to grow. There is also the risk of bugs — you want to change something and you touch other methods unintentionally. The blast radius of a change becomes unpredictable.

SRP connects directly to cohesion — high cohesion means everything in a class changes for the same reason, which is exactly what SRP aims for. It is also separation of concerns applied at the class level: each class should be concerned with one axis of change, one stakeholder, one domain. When those axes are mixed, you lose the ability to change any one of them safely.
