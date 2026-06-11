---
type: claim
aliases:
  - laravel-gates-vs-policies
id: laravel-gates-vs-policies
title: Gates vs Policies — When to Use Which
tags: [laravel, authorization, decision]
---

# Gates vs Policies — When to Use Which

Both solve the same problem (authorization), but at different granularities.

## Decision rule

```
Does the authorization question involve a specific model instance?
  YES → Policy
  NO  → Gate
```

## Examples

| Question | Tool | Why |
|----------|------|-----|
| "Can this user access the admin panel?" | Gate | No model instance involved |
| "Can this user view *this* MockExam?" | Policy | Involves a specific `$exam` |
| "Can this user submit *this* MockExam?" | Policy | Involves a specific `$exam` |
| "Can this user export reports?" | Gate | Global capability, no record |
| "Can this user delete *this* User?" | Policy | Involves a specific `$user` |
| "Can this user create a new article?" | Policy (`create` method) | Attached to a model type |

## Route middleware vs Policy vs Gate

These are three different levels — they are not alternatives, they compose:

```
Route middleware  →  coarse gate at entry ("is this person an admin?")
       ↓
Gate / Policy     →  fine-grained check ("can this admin delete *this* user?")
       ↓
Controller logic  →  zero authorization code
```

A route can have `middleware('auth:sanctum')` (authentication) AND still need a `$this->authorize()` call (authorization) inside the controller for per-record rules.

## Anti-pattern: using only route middleware

```php
// Route has admin middleware — but ANY admin can delete ANY user
Route::delete('/users/{user}', ...)->middleware(['auth', 'admin']);

public function destroy(User $user)
{
    $user->delete(); // no policy — admins can delete other admins, themselves, etc.
}
```

Route middleware answers "what role does this person need?".  
A Policy answers "given this role and this specific record, is this allowed?"

## Related
- [[gates are closures that answer authorization questions not tied to a model|gates]] — closure-based, non-model authorization
- [[a policy groups all authorization rules for one model in one class|policies]] — class-based, model-specific authorization
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — unified way to invoke both from a controller
- [[authentication asks who you are, authorization asks what you can do|authentication vs authorization]] — the broader distinction
