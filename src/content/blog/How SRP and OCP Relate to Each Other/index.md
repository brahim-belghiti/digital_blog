---
title: "How SRP and OCP Relate to Each Other"
description: "SRP and OCP are not sequential steps — they are two lenses you can apply in either order. Both work toward the same goal: code that can change without breaking."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "how-srp-and-ocp-relate-to-each-other"
---

SRP and OCP are not sequential steps — they are two lenses you can apply in either order.

You can reason about code from the perspective of what needs to be extended and not touched (OCP), and then apply SRP so that each extension changes for one reason. Or you can start with SRP, extract along axes of change, and then apply OCP to make those extracted pieces extensible through interfaces.

OCP requires creating interfaces, and the implementations of those interfaces — the services — should themselves respect SRP: each one changing for a single reason. They reinforce each other from different angles toward the same goal: code that can change without breaking.

SRP identifies the boundaries by finding axes of change. OCP makes those boundaries extensible through polymorphism. Whether you start with one or the other depends on what you already know about the code — which concerns you can see as distinct, which extension points you can anticipate. The outcome is the same: well-separated, stable modules that absorb change without propagating it.
