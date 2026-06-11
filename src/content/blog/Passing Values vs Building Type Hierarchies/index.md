---
title: "Passing Values vs Building Type Hierarchies"
description: "Richard Hickey argues that many problems in OOP come from encoding information as types. When variation is only in data, passing values into a single function is simpler and more honest than building a class hierarchy."
date: "Jun 11 2026"
tags: ["software-design", "oop"]
url: "passing-values-vs-building-type-hierarchies"
---

Richard Hickey argues that many problems in OOP come from encoding information as types. When different things only differ in data, the simpler approach is to pass the varying part as a value — a parameter, a query, a closure — into a single function, rather than building a class hierarchy with an interface and multiple implementations.

For example, if three dashboard alerts all do the same thing (run a query, count results, shape output) but with different queries, the OOP instinct is to create an interface and three implementing classes. But what actually varies is just the query. So instead of three classes and an interface, a single function that receives the query as a parameter does the same job.

```php
// OOP instinct
interface DashboardAlert { public function __invoke(): array; }
class UnpaidStudentsAlert implements DashboardAlert { ... }
class IdleTeachersAlert implements DashboardAlert { ... }
class LowAttendanceAlert implements DashboardAlert { ... }

// Simpler alternative
function buildAlert(Builder $query): array {
    $items = $query->limit(5)->get();
    return ['count' => $query->count(), 'items' => $items];
}
```

Three classes. Three files. An interface. Container bindings — versus one function.

A value is one thing with no methods to coordinate and no inheritance to trace. A type hierarchy is multiple things braided together: the contract, the implementations, the wiring. Hickey's key insight: don't use types to represent information. Information is data, data is values — pass them around.

Build type hierarchies only when you genuinely need different behavior that can't be captured as a parameter. When the logic is identical and only the inputs differ, polymorphism adds accidental complexity. The variation is expressed as a value passed into a function — not as a class hierarchy.
