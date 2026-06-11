---
type: claim
aliases:
  - policy-unit-testing
id: policy-unit-testing
title: Testing Laravel Policies as Unit Tests
tags: [laravel, testing, policies, authorization]
---

# Testing Laravel Policies as Unit Tests

Policies are plain PHP classes with no HTTP, no middleware, no database required.  
This makes them the easiest thing to unit-test in a Laravel application.

## The key insight

A Policy method is a pure function: it takes a `User` and a `Model`, returns `bool`.  
You can instantiate it and call it directly — no `TestCase` boilerplate needed.

```php
// tests/Unit/Policies/MockExamPolicyTest.php
class MockExamPolicyTest extends TestCase
{
    private MockExamPolicy $policy;

    protected function setUp(): void
    {
        parent::setUp();
        $this->policy = new MockExamPolicy();
    }

    public function test_owner_can_submit_in_progress_exam(): void
    {
        $user = User::factory()->make(['id' => 1]);
        $exam = MockExam::factory()->make([
            'user_id' => 1,
            'status'  => ExamStatus::IN_PROGRESS,
        ]);

        $this->assertTrue($this->policy->submit($user, $exam));
    }

    public function test_non_owner_cannot_submit(): void
    {
        $owner = User::factory()->make(['id' => 1]);
        $other = User::factory()->make(['id' => 2]);
        $exam  = MockExam::factory()->make(['user_id' => $owner->id]);

        $this->assertFalse($this->policy->submit($other, $exam));
    }

    public function test_cannot_submit_already_completed_exam(): void
    {
        $user = User::factory()->make(['id' => 1]);
        $exam = MockExam::factory()->make([
            'user_id' => 1,
            'status'  => ExamStatus::COMPLETED, // wrong state
        ]);

        $this->assertFalse($this->policy->submit($user, $exam));
    }
}
```

## `make()` vs `create()`

- `factory()->make()` — builds the model in memory, **no DB hit**. Use this for Policy tests.
- `factory()->create()` — inserts into the DB. Use this for integration/feature tests.

Policy tests should never need the database. If they do, the policy is probably doing too much.

## Why this matters

When authorization logic is buried in a controller `if` block, testing it requires:
- A full HTTP request
- Auth middleware
- A route
- A seeded database

When it's in a Policy, testing it requires:
- Two model instances (in memory)
- One method call

The cost of adding a new authorization case drops from "write a feature test" to "add two lines".

## Related
- [[a policy groups all authorization rules for one model in one class|policies]] — what you're testing
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — how the policy is invoked from controllers
