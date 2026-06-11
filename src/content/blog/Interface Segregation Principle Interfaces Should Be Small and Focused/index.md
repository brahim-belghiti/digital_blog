---
title: "Interface Segregation Principle: Interfaces Should Be Small and Focused"
description: "ISP says that interfaces should be small and focused, so that classes only implement what they actually need. A fat interface that demands too many methods just moves the bloated class problem up one level."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "interface-segregation-principle-interfaces-should-be-small-and-focused"
---

Interface Segregation Principle says that interfaces should be small and focused, so that classes only have to implement what they actually need. A fat interface that demands too many methods just moves the problem of a bloated class up one level — the implementing class is still forced to carry weight that isn't its concern.

Violating ISP creates unnecessary coupling — a class becomes dependent on methods it doesn't use, and when those methods change, the class is affected anyway. This is the blast radius problem at the interface level.

ISP connects directly to SRP — each interface should have one reason to change. And small, focused interfaces mean implementors only depend on what is relevant to them, which is high cohesion at the contract level.

A common sign of ISP violation is stub implementations — classes that implement an interface but leave several methods throwing `NotImplementedException` or returning null because they don't need those capabilities. If a class has to pretend to implement something, the interface is too broad. Split it.
