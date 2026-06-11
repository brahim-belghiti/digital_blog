---
type: claim
aliases:
  - laravel-has-four-kinds-of-state
id: laravel-has-four-kinds-of-state
title: The Four Kinds of State in Laravel
tags:
  - laravel
  - architecture
  - state
---

# The Four Kinds of State in Laravel

State in a Laravel app lives in four distinct places, each with different lifetime and scope:

| Kind | Lifetime | Examples |
|---|---|---|
| Request state | One HTTP request | `$request->all()`, route parameters, middleware-modified data |
| Session state | Across requests for one user | `Auth::user()`, flash messages, cart data |
| Application state | All requests, all users | Config values, cached data, container singletons |
| Database state | Persistent, source of truth | User records, posts, any Eloquent model |

## Why it matters for Actions

When moving logic from controllers into Actions, ask: "What state does this operation need, and where should it come from?"

```php
// Ambiguous — mixing state sources inside the Action
class CreateQuiz
{
    public function execute(array $data): Quiz
    {
        $user = Auth::user();          // session state — leaks in
        $status = config('...');       // app state — leaks in
        return Quiz::create([...]);
    }
}

// Explicit — state passed in as arguments
class CreateQuiz
{
    public function execute(array $data, User $creator, string $defaultStatus): Quiz
    {
        return Quiz::create([
            'title'      => $data['title'],
            'created_by' => $creator->id,
            'status'     => $defaultStatus,
        ]);
    }
}
```

When an Action takes explicit state dependencies through its parameters, it is testable without a request context, a session, or any config setup.

→ [[action classes encapsulate one business operation in one class|action classes]]: explicit state dependencies make Actions reusable from CLI, jobs, and tests.
→ [[a layer should only know its direct dependency, never who depends on it|layered architecture]]: the controller owns the request and session state; Actions should not reach for it.
