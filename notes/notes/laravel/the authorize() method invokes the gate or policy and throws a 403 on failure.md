---
type: definition
aliases:
  - laravel-authorize-method
id: laravel-authorize-method
title: The authorize() Method in Controllers
tags: [laravel, authorization, controllers]
---
# The `authorize()` Method in Controllers

`$this->authorize()` is available in all controllers that extend Laravel's base `Controller`.  
It invokes the relevant Gate or Policy and **throws a `403` automatically** if the check fails.  
The controller does not need to handle the failure case.

## Syntax

```php
// Against a policy method on a model instance
$this->authorize('submit', $mockExam);
//               ↑ policy method name
//                         ↑ model instance → Laravel finds MockExamPolicy::submit()

// Against a policy method that checks a model type (no instance — e.g. viewAny, create)
$this->authorize('viewAny', User::class);

// Against a Gate (no model)
$this->authorize('access-admin-panel');
```

## Where `$this->authorize()` comes from

`$this` is the controller instance. `authorize()` is not a global function —
it is a method mixed in from the `AuthorizesRequests` trait via the base `Controller` class.
See [[the AuthorizesRequests trait is where the authorize() controller helper comes from|the AuthorizesRequests trait]] for the full chain.

## What happens internally

1. The trait calls the [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]] — the central authorization singleton.
2. The Gate reads the second argument to find the right policy:
   - Model instance → finds the Policy by naming convention, calls the method.
   - Class string → calls the `viewAny`/`create` method of that model's Policy.
   - No argument → looks for a Gate closure with that name.
3. The authenticated user is resolved automatically from `Auth::user()` — you never pass it.
4. If the policy returns `false` → `AuthorizationException` → 403 response.
5. If the policy returns `true` → execution continues normally, no `if` needed.

## Before and after

```php
// BEFORE — authorization mixed into business logic
public function submit(MockExam $mockExam, Request $request): JsonResponse
{
    if ($mockExam->user_id !== $request->user()->id) {
        return $this->forbiddenResponse('Unauthorized');
    }
    if ($mockExam->status !== ExamStatus::IN_PROGRESS) {
        return $this->errorResponse('Exam is not in progress');
    }
    // actual logic starts here, buried after 6 lines of auth checks
}

// AFTER — controller only does HTTP concerns
public function submit(MockExam $mockExam, Request $request): JsonResponse
{
    $this->authorize('submit', $mockExam); // one line, all rules in the Policy

    $request->validate([...]);
    // actual logic starts on line 2
}
```

## Checking without throwing — `$user->can()`

When you need a boolean (not an exception) — e.g. to build a `can` array for the frontend:

```php
'can' => [
    'delete_user' => $request->user()->can('delete', $user),
    'export'      => $request->user()->can('export', User::class),
]
```

`can()` returns `bool`. `authorize()` throws. Use each where appropriate.

## Related
- [[the AuthorizesRequests trait is where the authorize() controller helper comes from|the AuthorizesRequests trait]] — where `$this->authorize()` actually comes from
- [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]] — the singleton the trait delegates to
- [[a policy groups all authorization rules for one model in one class|policies]] — where the actual authorization rules live
- [[gates are closures that answer authorization questions not tied to a model|gates]] — for non-model authorization called the same way
- [[use a policy when authorization involves a model instance, a gate when it does not|gates vs policies]] — which one `authorize()` will invoke
- [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]] — `authorize()` is what keeps controllers thin
