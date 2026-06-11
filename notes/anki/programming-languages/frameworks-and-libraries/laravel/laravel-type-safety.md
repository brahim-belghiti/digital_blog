---
tags:
  - anki-cards
source: "[[magic strings are raw literals standing in for a finite set of values|magic strings]], [[backed enums map each case to a scalar so the type can reach the database|backed enums]], [[Eloquent casts convert raw database values into PHP types automatically|Eloquent casts]]"
---

TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a magic string, and why is it a problem?
Back: A raw string literal used to represent a value from a finite known set, without type protection. Problems: typos fail silently at runtime ('admni' compiles fine), the string is duplicated across files, refactoring requires grep, no IDE autocomplete, and role strings in $fillable create mass assignment risks.
Tags: laravel magic-strings antipattern type-safety
<!--ID: 1779385226196-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a PHP backed enum?
Back: An enum where each case maps to a scalar value (string or int). Can be serialized to the database, compared against a value, and cast automatically by Eloquent. Unlike class constants, an enum is a type — functions typed to accept UserRole cannot receive an arbitrary string.
Tags: laravel php enums type-safety
<!--ID: 1779385226206-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: How do you reconstruct a backed enum from a raw value in PHP?
Back: UserRole::from('admin') — returns the matching case, throws ValueError if not found. UserRole::tryFrom('unknown') — returns null if not found, no exception. Use tryFrom when the input is untrusted.
Tags: laravel php enums from tryFrom
<!--ID: 1779385226215-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What does Eloquent model casting do?
Back: Automatically converts raw database column values into PHP types on read, and converts them back on write, based on the $casts property. You define the conversion once in the model — all consumers get the right type automatically.
Tags: laravel eloquent casting models
<!--ID: 1779385226224-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Cloze
Text: Eloquent cast types: 'boolean' → {{c1::bool}}, 'array' → {{c2::array (from JSON)}}, 'datetime' → {{c3::Carbon}}, 'hashed' → {{c4::auto-bcrypt on write}}, EnumClass::class → {{c5::enum case}}.
Tags: laravel eloquent casting
<!--ID: 1779385226236-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the full type-safety chain for a status field in Laravel?
Back: php-backed-enums defines the valid set as a type. Eloquent casting converts DB string → enum on read and enum → string on write. The rest of the application only ever sees the typed enum, never a raw string.
Tags: laravel type-safety enums casting
<!--ID: 1779385226246-->
END
