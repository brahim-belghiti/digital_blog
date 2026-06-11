---
type: claim
tags:
  - complexity
  - simplicity
---
Richard Hickey argues that many problems in OOP come from encoding information as types. When different things only differ in data, the simpler approach is to pass the varying part as a value (a parameter, a query, a closure) into a single function — rather than building a class hierarchy with an interface and multiple implementations. For example, if three dashboard alerts all do the same thing (run a query, count results, shape output) but with different queries, the OOP instinct is to create an interface and three implementing classes. But what actually varies is just the query — so instead of three classes and an interface, a single function that receives the query as a parameter does the same job. A value is one thing with no methods to coordinate and no inheritance to trace. A type hierarchy is multiple things braided together: the contract, the implementations, the wiring. Hickey's key insight is: don't use types to represent information. Information is data, data is values — pass them around. Build type hierarchies only when you genuinely need different behavior that can't be captured as a parameter.

Here's a concrete example from your world. Say you have three alerts that each query different models with different conditions. The OOP instinct is:

```php
interface DashboardAlert { public function __invoke(): array; }
class UnpaidStudentsAlert implements DashboardAlert { ... }
class IdleTeachersAlert implements DashboardAlert { ... }
class LowAttendanceAlert implements DashboardAlert { ... }
```

Three classes. Three files. An interface. Container bindings. But what actually varies between them? Just the query. Everything else — run the query, count results, shape the output — is identical.

Hickey would say: **the query IS the value. Just pass it.**

```php
function buildAlert(Builder $query): array {
    $items = $query->limit(5)->get();
    return ['count' => $query->count(), 'items' => $items];
}
```

Now the variation is expressed as a value (the query builder) passed into a function — not as a class hierarchy. The logic lives in one place. The differences are just different inputs.

**Connections:** [[Data vs Behavioral Variation]] — this is the practical application of that distinction. [[Essential vs Accidental Complexity]] — type hierarchies for data variation are accidental complexity. [[Open Close Principle, Extend Without Modifying]] — OCP through polymorphism is warranted only when values can't capture the variation.



---

Anything to adjust?