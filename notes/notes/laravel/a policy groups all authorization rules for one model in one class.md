---
type: definition
aliases:
  - laravel-policies
id: laravel-policies
title: Laravel Policies
tags: [laravel, authorization, security]
---

# Laravel Policies

A **Policy** is a dedicated PHP class that groups all authorization rules for a single Eloquent model.  
Each method answers: "can `$user` perform `[action]` on `$model`?"

```bash
php artisan make:policy MockExamPolicy --model=MockExam
# generates app/Policies/MockExamPolicy.php
```

```php
// app/Policies/MockExamPolicy.php
class MockExamPolicy
{
    public function view(User $user, MockExam $exam): bool
    {
        return $user->id === $exam->user_id;
    }

    public function submit(User $user, MockExam $exam): bool
    {
        // Encodes BOTH: ownership AND business state
        return $user->id === $exam->user_id
            && $exam->status === ExamStatus::IN_PROGRESS;
    }
}
```

## Auto-discovery (Laravel 11)

Laravel auto-discovers policies following the convention:  
`App\Models\MockExam` → `App\Policies\MockExamPolicy`  
No registration needed.

## Standard policy methods (CRUD convention)

| Method | Signature | Question |
|--------|-----------|----------|
| `viewAny` | `(User $user)` | Can user see the index/list? |
| `view` | `(User $user, Model $model)` | Can user see this record? |
| `create` | `(User $user)` | Can user create a new record? |
| `update` | `(User $user, Model $model)` | Can user edit this record? |
| `delete` | `(User $user, Model $model)` | Can user delete this record? |

You can also define custom methods: `submit`, `export`, `publish`, etc.

## What a policy method can encode

A policy method is not limited to ownership checks. It can encode any combination of:
- Ownership (`$user->id === $model->user_id`)
- Role (`$user->isAdmin()`)
- Business state (`$exam->status === ExamStatus::IN_PROGRESS`)
- Time constraints (`$model->created_at->diffInDays() < 7`)

The controller no longer needs to know *how* the rule works — it just calls `authorize()`.

## Before hook — admin bypass

```php
public function before(User $user, string $ability): bool|null
{
    if ($user->isAdmin()) {
        return true; // admin passes all checks in this policy
    }
    return null; // null = continue to the specific method
}
```

## Design pattern behind this

Policies are an application of the **Strategy Pattern** — each policy is a concrete strategy for "how to authorize actions on this model." The Gate is the context that picks and calls the right strategy.

→ [[the strategy pattern makes a family of behaviors interchangeable behind one interface|strategy pattern]]: the full pattern — Context, Strategy interface, concrete strategies, and what it gives you.

## Related
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — how to call a policy from a controller
- [[gates are closures that answer authorization questions not tied to a model|gates]] — for authorization not tied to a model
- [[use a policy when authorization involves a model instance, a gate when it does not|gates vs policies]] — decision guide
- [[policies are plain PHP classes, the easiest thing to unit test in Laravel|policy unit testing]] — how to test policies in isolation
- [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]] — policies move auth out of controllers
- [[authentication asks who you are, authorization asks what you can do|authentication vs authorization]] — policies answer the AuthZ question
