---
type: claim
aliases:
  - laravel-jobs-are-actions-that-run-asynchronously
id: laravel-jobs-are-actions-that-run-asynchronously
title: Jobs as Async Actions
tags:
  - laravel
  - architecture
  - queues
---

# Jobs as Async Actions

A Job is an Action that runs in the queue instead of immediately. The concept is the same — one class, one operation — only the execution timing differs.

```php
// Runs immediately
class ProcessSubmission
{
    public function execute(int $seriesId, int $userId, array $answers): array { ... }
}

// Runs in the queue
class ProcessSubmissionJob implements ShouldQueue
{
    public function __construct(
        public int $seriesId,
        public int $userId,
        public array $answers
    ) {}

    public function handle(AnswerComparator $comparator): void
    {
        // same logic
    }
}
```

## The key distinction: constructor vs handle

Data you pass at dispatch time (serialized to the queue) goes in `__construct`. Dependencies the container provides at execution time go in `handle`. This is different from regular Actions where the container injects everything through the constructor.

## When to use a Job vs an Action

Ask: does this need to finish before responding to the user?

| Needs immediate result | → Action |
|---|---|
| Can be deferred | → Job |
| Sending email after signup | → Job |
| Calculating a score to display now | → Action |
| Processing an uploaded file | → Job |

## Wrapping an Action in a Job

The same logic can run sync or async without duplication:

```php
class ProcessSubmissionJob implements ShouldQueue
{
    public function handle(ProcessSubmission $action)
    {
        $action->execute($this->seriesId, $this->userId, $this->answers);
    }
}
```

The Action stays testable in isolation. The Job is just a thin wrapper that dispatches it.

→ [[action classes encapsulate one business operation in one class|action classes]]: Jobs follow the same single-operation pattern.
→ [[a layer should only know its direct dependency, never who depends on it|layered architecture]]: side effects (logging, emails) dispatched as Jobs keep the core Action clean.
