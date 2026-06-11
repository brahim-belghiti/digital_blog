---
type: definition
aliases:
  - command-pattern
id: command-pattern
title: Command Pattern
tags: [design-patterns, architecture, single-responsibility]
links: [action classes encapsulate one business operation in one class]
---

# Command Pattern

## The core idea

Turn an operation into an object. Instead of calling a method directly, you wrap the operation in a class that can be passed around, stored, queued, or undone.

```
Without Command:               With Command:
  caller.doSomething()           cmd = new DoSomething(data)
                                 cmd.execute()
```

The operation becomes a first-class citizen — it has a name, a type, and can be handled generically.

## The analogy

A restaurant order ticket. The waiter doesn't cook the food — they write down "burger + fries" and pass it to the kitchen. The ticket (command) encapsulates the request. The kitchen (receiver) executes it. The waiter (invoker) doesn't need to know how cooking works.

```
Waiter     = Invoker   → creates and sends commands
Ticket     = Command   → encapsulates the request
Kitchen    = Receiver  → executes the request
```

## Structure (classical OOP)

```php
interface Command {
    public function execute(): void;
}

class UpdateUserProfile implements Command {
    public function __construct(private User $user, private array $data) {}
    public function execute(): void { /* ... */ }
}

// Invoker
$command = new UpdateUserProfile($user, $data);
$command->execute();
```

## The problem it solves

Without Command, the invoker (controller) knows how every operation works:

```php
// Controller knows too much about the operation
if ($request->hasFile('avatar')) {
    Storage::disk('public')->delete($user->avatar);
    $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
}
$user->update($data);
```

With Command, the controller just creates and executes:

```php
($this->updateUserProfile)($user, $data, $avatar, $removeAvatar);
```

The operation is named, isolated, and reusable.

## What the pattern gives you

- **Named operations** — `UpdateUserProfile` is readable, searchable, and meaningful
- **Single place** — logic lives in one class, not scattered across callers
- **Reusability** — call the same action from two controllers, a console command, or a job
- **Testability** — test the action directly without HTTP

## Laravel's implementation

Laravel Action Classes are the Command Pattern:

| Pattern term | Laravel term |
|---|---|
| Command | Action class (`UpdateUserProfile`) |
| `execute()` | `__invoke()` or `execute()` method |
| Invoker | Controller calling `($this->action)(...)` |
| Receiver | Services / Eloquent models the action calls |

## Difference from Observer

Observer is about reactions to something that happened (many receivers, decoupled).  
Command is about encapsulating an operation to be executed (one operation, named and portable).

→ [[the observer pattern lets objects react to an event without the subject knowing them|observer pattern]]: the pattern behind Events & Listeners — one announcement, many reactions.

## Relation to Laravel

→ [[action classes encapsulate one business operation in one class|action classes]]: Laravel's concrete application of this pattern using single-responsibility action classes with `__invoke`.
