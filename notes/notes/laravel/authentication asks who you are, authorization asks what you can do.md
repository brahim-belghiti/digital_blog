---
type: definition
aliases:
  - authentication-vs-authorization
id: authentication-vs-authorization
title: Authentication vs Authorization
tags:
  - security
  - laravel
---

# Authentication vs Authorization

Two distinct security concerns that are often conflated.

| | Authentication (AuthN) | Authorization (AuthZ) |
|---|---|---|
| **Question** | Who are you? | Are you allowed to do this? |
| **Answers** | Identity (user ID, token) | Permission (yes/no for an action) |
| **Laravel tool** | Sanctum, session guard | Gates, Policies |
| **When it runs** | Before the controller | Inside or before the controller |
| **Fails with** | `401 Unauthorized` | `403 Forbidden` |

## Why the distinction matters

Authentication only tells you a request comes from user #42.  
It says nothing about whether user #42 can delete user #99, submit exam #7, or access the admin panel.

**Authentication middleware alone is not enough:**
```php
// This route requires a valid token — but ANY authenticated user reaches this
Route::delete('/users/{user}', [UserController::class, 'destroy'])
    ->middleware('auth:sanctum');

// Without authorization, user #42 can delete user #99
public function destroy(User $user)
{
    $user->delete(); // no check — authenticated ≠ authorized
}
```

## In Laravel

- **Authentication** = `auth:sanctum` middleware resolves and verifies the token.
- **Authorization** = [[a policy groups all authorization rules for one model in one class|policies]] or [[gates are closures that answer authorization questions not tied to a model|gates]] answer "can this user do this?".

Both must be present. A logged-in user is not automatically permitted to do everything.

## Related
- [[gates are closures that answer authorization questions not tied to a model|gates]] — closure-based authorization for simple, non-model checks
- [[a policy groups all authorization rules for one model in one class|policies]] — class-based authorization tied to Eloquent models
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — how to enforce authorization inside a controller
