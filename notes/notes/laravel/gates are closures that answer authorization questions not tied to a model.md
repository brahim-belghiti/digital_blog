---
type: definition
aliases:
  - laravel-gates
id: laravel-gates
title: Laravel Gates
tags: [laravel, authorization, security]
---

# Laravel Gates (closures)

> **Naming warning:** The word "Gate" has two meanings in Laravel.
> This note covers **individual gate closures** — rules you define with `Gate::define()`.
> The central registry that manages all policies and closures is covered in [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]].

A **gate** (lowercase) is a closure registered in `AppServiceProvider` that answers a yes/no authorization question — not tied to a specific model instance.

```php
// app/Providers/AppServiceProvider.php
use Illuminate\Support\Facades\Gate;

public function boot(): void
{
    Gate::define('access-admin-panel', function (User $user): bool {
        return $user->isAdmin();
    });

    Gate::define('manage-settings', function (User $user): bool {
        return $user->isAdmin() && $user->email_verified_at !== null;
    });
}
```

## Usage

```php
// In a controller
if (Gate::denies('access-admin-panel')) {
    abort(403);
}

// Or using the helper
$this->authorize('access-admin-panel'); // throws 403 if denied

// In Blade
@can('access-admin-panel')
    <a href="/admin">Admin Panel</a>
@endcan

// On the user object
$user->can('access-admin-panel'); // bool
```

## When to use a Gate

Use a Gate when the authorization question is **not tied to a specific model instance**:
- "Can this user access the admin panel?" — no model involved
- "Can this user export reports?" — action, not a specific record
- "Can this user manage settings?" — global capability

When the question involves a specific record ("can this user edit *this* article?"), use a [[a policy groups all authorization rules for one model in one class|policies]] instead.

## Related
- [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]] — the Gate singleton that stores and calls these closures
- [[a policy groups all authorization rules for one model in one class|policies]] — model-specific authorization (the more common case)
- [[use a policy when authorization involves a model instance, a gate when it does not|gates vs policies]] — decision guide
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — `$this->authorize()` works for both Gates and Policies
- [[authentication asks who you are, authorization asks what you can do|authentication vs authorization]] — Gates answer the "authorized?" question
