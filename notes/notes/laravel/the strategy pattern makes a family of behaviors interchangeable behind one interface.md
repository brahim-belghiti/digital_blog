---
type: definition
aliases:
  - strategy-pattern
id: strategy-pattern
title: Strategy Pattern
tags: [design-patterns, architecture, authorization]
links: [a policy groups all authorization rules for one model in one class, use a policy when authorization involves a model instance, a gate when it does not]
---

# Strategy Pattern

## The core idea

Define a family of algorithms (or behaviors), put each one in its own class, and make them interchangeable. The caller picks the right strategy at runtime — without knowing how each one works internally.

```
Context → picks Strategy → calls strategy.execute()

           Strategy A  (one implementation)
           Strategy B  (another implementation)
           Strategy C  (another implementation)
```

All strategies share the same interface. The context doesn't care which one it's calling.

## The analogy

A navigation app that can route by car, bike, or walking. The UI (context) says "get me from A to B." The routing algorithm (strategy) changes based on your selection. The UI doesn't contain routing logic for each mode — it delegates to whichever strategy is selected.

```
Navigator      = Context   → calls route(start, end)
RouteStrategy  = Interface → defines the contract
CarRoute       = Strategy A
BikeRoute      = Strategy B
WalkingRoute   = Strategy C
```

## Structure (classical OOP)

```php
interface AuthorizationStrategy {
    public function canView(User $user, Model $model): bool;
}

class MockExamAuthStrategy implements AuthorizationStrategy {
    public function canView(User $user, Model $model): bool {
        return $user->id === $model->user_id;
    }
}

class DocumentAuthStrategy implements AuthorizationStrategy {
    public function canView(User $user, Model $model): bool {
        return $user->department === $model->department;
    }
}
```

## The problem it solves

Without Strategy, the caller contains all the branching logic:

```php
// controller knows about every authorization rule
if ($model instanceof MockExam) {
    if ($user->id !== $model->user_id) abort(403);
} elseif ($model instanceof Document) {
    if ($user->department !== $model->department) abort(403);
}
```

Adding a new model type means editing this block. With Strategy, you add a new class without touching existing code.

## Laravel's implementation

Laravel Policies are the Strategy Pattern for authorization:

| Pattern term | Laravel term |
|---|---|
| Context | Gate (selects and calls the right policy) |
| Strategy interface | The policy method convention (`view`, `delete`, etc.) |
| Concrete strategy | `MockExamPolicy`, `UserPolicy` |
| Strategy selection | Auto-discovery: `App\Models\Foo` → `App\Policies\FooPolicy` |

The Gate is the context — it picks the right policy (strategy) based on the model type, then calls the method. The controller never decides which policy to use.

```php
// Controller calls the context (Gate via authorize())
$this->authorize('view', $mockExam);

// Gate selects MockExamPolicy and calls view()
// Controller never knows which policy was chosen
```

## What the pattern gives you

- **Open to extension** — add `InvoicePolicy` without touching the Gate or controllers
- **Closed to modification** — existing policies don't change when new ones are added
- **Isolated rules** — each strategy is independently testable
- **Uniform interface** — every policy looks the same to the Gate

## Difference from Command

Command encapsulates one operation to be executed.  
Strategy encapsulates one *behavior variant* to be selected and called by a context.

→ [[the command pattern turns an operation into an object|command pattern]]: the pattern behind Action Classes — encapsulating one operation as an object.

## Relation to Laravel

→ [[a policy groups all authorization rules for one model in one class|policies]]: Laravel's concrete application — one policy class per model, all following the same method convention.  
→ [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]]: the Gate is the "context" that selects and executes the right policy strategy.
