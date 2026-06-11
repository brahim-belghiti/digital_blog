---
type: definition
aliases:
  - php-backed-enums
id: php-backed-enums
title: PHP 8.1 Backed Enums
tags: [php, enums, type-safety]
---

# PHP 8.1 Backed Enums

A **backed enum** maps each case to a primitive scalar value (`string` or `int`).  
Unlike pure enums, backed enums can be serialized to DB, compared against a value, and cast automatically.

```php
enum UserRole: string
{
    case Admin = 'admin';
    case User  = 'user';
}

// Access the underlying value
UserRole::Admin->value; // 'admin'

// Reconstruct from a raw value (e.g. from DB)
UserRole::from('admin'); // UserRole::Admin
UserRole::tryFrom('unknown'); // null (safe, no exception)
```

## Why use it over a class constant

- Constants (`const ADMIN = 'admin'`) are still plain strings — no type enforcement.
- An enum **is a type**. A function typed `UserRole` cannot receive an arbitrary string.
- The compiler catches `UserRole::Adimn` (typo). It cannot catch `'adimn'`.

## Eloquent integration

Declare the cast in the model and Eloquent handles conversion automatically on read and write:

```php
protected function casts(): array
{
    return ['role' => UserRole::class];
}

// Reading from DB: string 'admin' → UserRole::Admin
// Writing to DB:   UserRole::Admin → string 'admin'
```

## Related
- [[magic strings are raw literals standing in for a finite set of values|magic strings]] — the problem backed enums solve
- [[Eloquent casts convert raw database values into PHP types automatically|Eloquent casts]] — how the cast mechanism works
- [[a policy groups all authorization rules for one model in one class|policies]] — where UserRole is used for authorization decisions
