---
type: definition
aliases:
  - laravel-gate-registry
id: laravel-gate-registry
title: The Gate — Laravel's Authorization Registry
tags: [laravel, authorization, internals]
---

# The Gate — Laravel's Authorization Registry

The word "Gate" has two meanings in Laravel. This note covers the **capital-G Gate** —
the singleton registry that is the central authorization switchboard for the entire app.

The other meaning (lowercase "gates" — individual closures you define) is covered in [[gates are closures that answer authorization questions not tied to a model|gates]].

---

## What it is

The Gate is a **singleton** — one instance, created at boot, shared across the entire request lifecycle.  
It does not contain your authorization rules. It knows how to **find and call** them.

At boot time it builds one internal map:

```
App\Models\MockExam  →  App\Policies\MockExamPolicy
App\Models\User      →  App\Policies\UserPolicy
```

This map is built automatically from naming conventions — no registration needed in Laravel 11.  
Convention: `App\Models\Foo` → `App\Policies\FooPolicy`.

---

## What happens on every authorization call

```
$this->authorize('delete', $user)
          │
          ▼
AuthorizesRequests trait  (mixed into the controller)
          │   calls Gate::inspect('delete', $user)
          ▼
Gate (singleton registry)
          │
          ├─ Step 1: Who is asking?
          │          reads Auth::user() automatically
          │
          ├─ Step 2: Which policy?
          │          $user is App\Models\User → finds UserPolicy
          │
          └─ Step 3: Call the method
                     UserPolicy::delete($currentUser, $user)
                     returns true / false
          │
          ▼
AuthorizesRequests
          ├─ true  → execution continues
          └─ false → throws AuthorizationException → 403
```

The controller never instantiates the policy. The controller never calls `Auth::user()`.  
The Gate handles both invisibly.

---

## Why the Gate exists as a separate layer

Without the Gate, controllers would need to know which policy to use:

```php
// Without Gate — controller knows too much
$policy = new UserPolicy();
if (! $policy->delete(Auth::user(), $user)) {
    abort(403);
}
```

With the Gate, the controller only declares intent:

```php
// With Gate — controller knows nothing about the policy
$this->authorize('delete', $user);
```

The Gate is the middleman that decouples controllers from policy classes.  
Controllers don't import policies. Policies don't know about controllers.

---

## Accessing the Gate directly

The Gate is available as a facade anywhere in the app:

```php
use Illuminate\Support\Facades\Gate;

Gate::allows('delete', $user);   // bool — does not throw
Gate::denies('delete', $user);   // bool — does not throw

// Same thing via the user model
$request->user()->can('delete', $user);
$request->user()->cannot('delete', $user);

// Same thing in Blade
@can('delete', $user) ... @endcan
```

All syntaxes delegate to the same Gate singleton underneath.

---

## Design patterns behind this

The Gate uses two patterns together:

**Registry Pattern** — a central object that holds a map of names to implementations and resolves them on request. The Gate's internal `App\Models\Foo → App\Policies\FooPolicy` map is a registry. Callers ask the registry for the right handler; they don't instantiate it themselves.

**Strategy Pattern** — the Gate is the *context* that selects and executes the right authorization strategy (policy) based on the model type. Each policy is a concrete strategy.

→ [[the strategy pattern makes a family of behaviors interchangeable behind one interface|strategy pattern]]: the Strategy Pattern in full — how policies fit as interchangeable authorization strategies.

## Related
- [[gates are closures that answer authorization questions not tied to a model|gates]] — individual gate closures registered with `Gate::define()`
- [[a policy groups all authorization rules for one model in one class|policies]] — the policy classes the Gate dispatches to
- [[the AuthorizesRequests trait is where the authorize() controller helper comes from|the AuthorizesRequests trait]] — the trait that gives controllers access to the Gate
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — `$this->authorize()` — the controller-level entry point
