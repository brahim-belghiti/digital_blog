---
type: claim
aliases:
  - laravel-events-listeners
id: laravel-events-listeners
title: Laravel Events & Listeners
tags: [laravel, architecture, observer-pattern, decoupling]
links: [a controller has one job, translate an HTTP request into an HTTP response, laravel-service-layer]
---

# Laravel Events & Listeners

## The problem they solve

A controller that fires an event should not know what happens next. Without events, you write:

```php
// In the controller — 3 things the controller should not know
$session->markAsCompleted(...);
$this->seriesSessionService->storeUserErrors(...);
$this->seriesSessionService->logActivity(...);
```

Every new side effect (push notification, badge, leaderboard) requires editing the controller and adding a new `__construct` dependency. The controller accumulates knowledge it doesn't own.

## The pattern

```
Controller: event(new SeriesCompleted($data))
                       ↓
             Laravel dispatches to listeners
                       ↓
     StoreSeriesErrors::handle()   ← one responsibility
     LogSeriesActivity::handle()   ← one responsibility
```

The controller says *what happened*. Listeners decide *what to do about it*.

## Three pieces

**Event** — a data carrier. Holds everything that happened. No logic.

```php
class SeriesCompleted
{
    use Dispatchable;

    public function __construct(
        public readonly int $userId,
        public readonly Series $series,
        public readonly array $incorrectQuestionIds,
        // ... all data listeners might need
    ) {}
}
```

Use `readonly` constructor properties — events are immutable facts.

**Listener** — does one thing in response. In Laravel 11+, register with the `#[ListenTo]` attribute (no `EventServiceProvider` needed).

```php
#[ListenTo(SeriesCompleted::class)]
class StoreSeriesErrors
{
    public function handle(SeriesCompleted $event): void
    {
        // one side effect
    }
}
```

**Dispatch** — fire the event from anywhere:

```php
SeriesCompleted::dispatch(...);   // static, from Dispatchable trait
event(new SeriesCompleted(...));  // equivalent helper
```

## Why `readonly` on event properties

Events represent something that already happened. They must not change after being created. `readonly` enforces this at the language level.

## Queuing listeners

Add `implements ShouldQueue` to push the listener onto a queue (runs async, after the HTTP response is sent):

```php
#[ListenTo(SeriesCompleted::class)]
class StoreSeriesErrors implements ShouldQueue
```

Use this when the side effect is not needed in the HTTP response (logging, notifications, emails). Never queue if the result must be visible immediately.

## The cost

You lose call-stack traceability. `grep storeUserErrors` won't show you where it's called — it's triggered by an event. Use `grep StoreSeriesErrors` instead.

## When to use vs not use

| Use events | Don't use events |
|---|---|
| Multiple unrelated side effects | One consequence |
| Side effects span domains | Tightly coupled flow where one step feeds the next |
| May grow (new reactions over time) | Simple sequential steps |

## Relation to controller responsibility

→ [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]]: dispatching an event is the controller fulfilling its responsibility and stopping. The controller no longer owns the consequences.
