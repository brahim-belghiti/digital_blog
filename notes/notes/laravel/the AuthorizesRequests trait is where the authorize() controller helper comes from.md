---
type: definition
aliases:
  - authorizes-requests-trait
id: authorizes-requests-trait
title: The AuthorizesRequests Trait
tags: [laravel, authorization, traits, controllers]
---

# The `AuthorizesRequests` Trait

This is where `$this->authorize()` comes from.  
It is not a global function, not a controller method you write — it is mixed in via a trait.

---

## The inheritance chain

```php
// Your controller
class MockExamController extends Controller { }

// app/Http/Controllers/Controller.php  (your base controller — almost empty)
class Controller
{
    use AuthorizesRequests;  // ← this line provides authorize()
}

// Illuminate\Foundation\Auth\Access\AuthorizesRequests  (Laravel framework)
trait AuthorizesRequests
{
    public function authorize(string $ability, mixed $arguments = []): void
    {
        // delegates to the Gate
    }
}
```

Every controller in your app extends `Controller`, which uses `AuthorizesRequests`,  
so every controller automatically has `authorize()` available as `$this->authorize()`.

---

## What `$this` refers to

`$this` is the **controller instance**.  
`$this->authorize()` means: "call the `authorize` method that was mixed into this controller by the trait."

It is identical to calling any other method on the class.  
The trait makes it feel built-in, but it is just a method inherited via PHP's trait system.

---

## What the trait's `authorize()` actually does

```php
public function authorize(string $ability, mixed $arguments = []): void
{
    // 1. Resolve the Gate from Laravel's service container
    $gate = app(Gate::class);

    // 2. Ask the Gate to inspect the ability
    $response = $gate->inspect($ability, $arguments);

    // 3. If denied, throw — Laravel's exception handler converts this to 403
    if ($response->denied()) {
        throw new AuthorizationException($response->message());
    }

    // 4. If allowed, do nothing — execution continues in the controller
}
```

The controller never sees the result — either it throws and stops, or it does nothing and continues.  
There is no `if` for the happy path. That is why controllers stay clean.

---

## PHP traits — the mechanism

A trait is PHP's way of sharing methods across classes that do not share a parent.  
When a class uses a trait, it gets all the trait's methods as if it had written them itself.

```php
trait AuthorizesRequests
{
    public function authorize(...) { ... }
    public function authorizeForUser(...) { ... }
}

class Controller
{
    use AuthorizesRequests;
    // Controller now "has" authorize() and authorizeForUser()
    // without inheriting from anything
}
```

The trait is defined once in the Laravel framework.  
Every controller in every Laravel app gets it for free through the base `Controller` class.

---

## Related
- [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]] — the Gate singleton that `authorize()` delegates to
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — how to use `authorize()` in practice
- [[a policy groups all authorization rules for one model in one class|policies]] — where the actual rules live after the Gate dispatches
