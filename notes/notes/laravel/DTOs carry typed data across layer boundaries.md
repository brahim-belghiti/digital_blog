---
type: claim
aliases:
  - laravel-dtos
id: laravel-dtos
title: DTOs in Laravel
tags: [laravel, architecture, type-safety, coupling]
links: [action classes encapsulate one business operation in one class, a layer should only know its direct dependency, never who depends on it]
---

# DTOs in Laravel

A DTO (Data Transfer Object) is a simple immutable object that carries structured, typed data across layer boundaries. In Laravel, the typical flow is:

```
Request → DTO → Action/Service → Domain/Model
```

The DTO sits between the HTTP layer and the business logic layer. Without it, business logic either receives raw arrays (`$data['email']`) — untyped and fragile — or directly receives the `Request` object, coupling domain code to the HTTP layer.

## What a DTO looks like

```php
class CreateUserData
{
    public function __construct(
        public readonly string $name,
        public readonly string $email,
    ) {}
}
```

Immutable, no methods, no logic — only data. A factory method on the DTO is a common pattern:

```php
CreateUserData::fromRequest($request);
```

This keeps the mapping logic in one place and keeps the action clean.

## Why not pass the Request directly

Passing `$request` into an action couples business logic to the Laravel HTTP layer. The action becomes harder to test (you must mock a Request), can't be called from CLI or jobs without constructing a Request, and leaks framework concerns into domain code.

A DTO defines a clean boundary: the action only knows about the data it needs, not where that data came from.

## DTO vs array

An array is flexible but unsafe — no structure guarantee, weak IDE support, hard to refactor. A DTO is strict and typed: the shape is explicit, autocomplete works, and renaming a property is a safe refactor across the codebase.

## Relation to other patterns

→ [[action classes encapsulate one business operation in one class|action classes]]: actions receive DTOs instead of raw requests — the two patterns are designed to be used together.  
→ [[a layer should only know its direct dependency, never who depends on it|layered architecture]]: DTOs are the typed contracts that separate the HTTP layer from the domain layer.
