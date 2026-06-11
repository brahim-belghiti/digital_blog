---
type: claim
aliases:
  - magic-strings-antipattern
id: magic-strings-antipattern
title: Magic Strings Anti-Pattern
tags: [antipattern, type-safety, maintainability]
---

# Magic Strings Anti-Pattern

A **magic string** is a raw string literal used to represent a value from a finite, known set — without any type or compile-time protection.

```php
// Magic string — nothing stops a typo or an invalid value
if ($user->role === 'admni') { ... }      // silent bug
->where('role', 'user')                   // repeated in 5 files
'role' => $request->role ?? 'user'        // user can send role: "admin"
```

## Why it's a problem

| Risk | Example |
|------|---------|
| **Typo** | `'admni'` compiles fine, fails silently at runtime |
| **Duplication** | The string `'admin'` scattered across controllers, services, seeders |
| **Security** | `role` in `$fillable` + magic string = mass assignment escalation |
| **Refactoring** | Renaming a role requires `grep` + manual search, easy to miss |
| **No IDE help** | No autocomplete, no "find all references" |

## The fix: replace with a typed constant

The finite set should be encoded once and referred to by name everywhere:

```php
// Before
'role' => $request->role ?? 'user'    // dangerous

// After
'role' => UserRole::User              // always safe, always correct
```

## Related
- [[backed enums map each case to a scalar so the type can reach the database|backed enums]] — the PHP 8.1 solution for string/int sets
- [[Eloquent casts convert raw database values into PHP types automatically|Eloquent casts]] — how to make Eloquent handle the conversion
