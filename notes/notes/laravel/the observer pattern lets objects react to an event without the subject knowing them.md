---
type: definition
aliases:
  - observer-pattern
id: observer-pattern
title: Observer Pattern
tags: [design-patterns, architecture, decoupling]
links: [events let a controller announce what happened without knowing what happens next]
---

# Observer Pattern

## The core idea

One object says "something happened." Any number of other objects react to it. The first object does not know who is listening or how many listeners there are.

```
Subject (publisher)  →  announces change
                              ↓
                    Observer 1  reacts
                    Observer 2  reacts
                    Observer 3  reacts
```

The subject and observers are decoupled — you can add or remove observers without touching the subject.

## The analogy

A newspaper publisher doesn't know who its subscribers are. When a new edition is printed, it ships to whoever subscribed. Adding a new subscriber doesn't change how the newspaper is printed.

```
Newspaper = Subject     → publishes when something happens
Subscribers = Observers → each reacts in their own way
```

## Structure (classical OOP)

Three roles:

**Subject** — holds a list of observers and notifies them.
```php
interface Subject {
    public function attach(Observer $o): void;
    public function detach(Observer $o): void;
    public function notify(): void;
}
```

**Observer** — receives the notification.
```php
interface Observer {
    public function update(Subject $subject): void;
}
```

**Concrete observers** — each does one specific thing in response.

## The problem it solves

Without Observer, every new reaction requires editing the subject:

```php
// subject knows about all consequences — tight coupling
$this->emailService->sendConfirmation();
$this->analyticsService->track();
$this->badgeService->checkBadges();
$this->notificationService->push();
```

Each new consequence = edit the subject + new dependency. The subject's responsibility grows unbounded.

With Observer, the subject just announces. Each reaction lives in its own class.

## Laravel's implementation

Laravel maps the pattern to Events & Listeners:

| Pattern term | Laravel term |
|---|---|
| Subject | The class that calls `event()` / `::dispatch()` |
| Notification | The Event class |
| Observer | Listener class |
| `attach()` | `#[ListenTo]` attribute (Laravel 11+) |

The event carries the data. Each listener is one observer.

## What changes and what stays stable

The event (notification) is stable — it defines the contract.  
Listeners are free to change — add, remove, modify without touching anything else.

This is the Open/Closed principle in action: the system is open to new behavior (new listeners) but closed for modification (existing code untouched).

## When to apply

- One action triggers multiple unrelated consequences
- Consequences may grow over time
- Side effects span different domains (logging, notifications, analytics)

## When not to apply

- One action has one consequence — direct call is simpler
- Steps are sequential and each feeds the next — events don't carry return values
- You need to know whether the side effect succeeded before continuing

## Relation to Laravel events

→ [[events let a controller announce what happened without knowing what happens next|events and listeners]]: Laravel's concrete implementation of this pattern using Events, Listeners, and the `#[ListenTo]` attribute.
