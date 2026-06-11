---
title: "A Class Should Have One Reason to Change"
description: "The Single Responsibility Principle: responsibility means a source of change, not a function. A class that changes for multiple reasons puts different concerns at risk whenever any one of them evolves."
date: "Jun 11 2026"
tags: ["solid", "software-design"]
url: "a-class-should-have-one-reason-to-change"
---

The Single Responsibility Principle says a class should have one, and only one, reason to change.

"Responsibility" here means a source of change, not a function. Ask: how many different people or requirements could ask this class to change? If the answer is more than one, the class has more than one responsibility.

A class that calculates pay and generates a report will change when payroll rules change and when the reporting format changes. These are different reasons, from different sources. They should be in different classes.

The practical test: if two methods in a class would change for different reasons, they should be in separate classes. Mixing concerns in one class means a change for one reason risks breaking behavior that serves a different reason.

This conflicts with how OOP is often taught — "model the real world, put all the employee's behavior in an Employee class." A real employee does many things, but those things change for different reasons and should live in different classes.
