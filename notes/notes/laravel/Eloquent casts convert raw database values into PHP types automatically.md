---
type: definition
aliases:
  - eloquent-model-casting
id: eloquent-model-casting
title: Eloquent Model Casting
tags: [laravel, eloquent, models]
---
# Eloquent Model Casting

The `$casts` property (or `casts()` method in Laravel 11) tells Eloquent how to convert a raw DB column value into a PHP type — and back — automatically.

```php
protected function casts(): array
{
    return [
        'role'             => UserRole::class,   // string → Enum
        'is_anonymized'    => 'boolean',         // 0/1 → bool
        'category_breakdown' => 'array',         // JSON string → array
        'email_verified_at'  => 'datetime',      // string → Carbon
        'password'           => 'hashed',        // auto-hashes on set
    ];
}
```

## How it works

- **On read** (`$model->role`): raw DB value is passed through the cast and returned as the target type.
- **On write** (`$model->role = UserRole::Admin`): the value is converted back to its DB representation before the query.
- You never write the conversion logic yourself — Eloquent handles it at the accessor/mutator level.

## Cast types available

| Cast | DB type | PHP type |
|------|---------|----------|
| `'boolean'` | `0` / `1` | `bool` |
| `'array'` | JSON string | `array` |
| `'datetime'` | datetime string | `Carbon` |
| `'hashed'` | plain string | auto-bcrypt on write |
| `EnumClass::class` | enum's backing value | `EnumClass` case |
| `'encrypted'` | encrypted string | plain string |

## Why this matters

Without casts, you do the conversion manually in every place you read the value.  
With casts, the model is the single place where the type contract is defined — all consumers get the right type automatically.

## Related
- [[backed enums map each case to a scalar so the type can reach the database|backed enums]] — most common use case for enum casts
- [[magic strings are raw literals standing in for a finite set of values|magic strings]] — casting enums eliminates magic strings from model reads
