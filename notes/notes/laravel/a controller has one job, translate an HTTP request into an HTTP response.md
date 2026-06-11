---
type: claim
aliases:
  - controller-single-responsibility
id: controller-single-responsibility
title: Controllers as Thin HTTP Adapters
tags: [laravel, architecture, controllers, srp]
---

# Controllers as Thin HTTP Adapters

A controller has one job: **translate an HTTP request into an HTTP response**.  
It should not contain business logic, authorization rules, or query building.

## The Single Responsibility Principle applied to controllers

A controller method should only:
1. Authorize the request (`$this->authorize()`)
2. Validate the input (Form Request or `$request->validate()`)
3. Delegate to a service/action
4. Return a response

If a controller method is doing anything else, that code belongs somewhere else.

## What "thin" looks like

```php
// Fat controller — does authorization, business logic, logging, formatting
public function submit(MockExam $mockExam, Request $request): JsonResponse
{
    if ($mockExam->user_id !== $request->user()->id) { ... }    // auth
    if ($mockExam->status !== ExamStatus::IN_PROGRESS) { ... }  // auth
    $request->validate([...]);
    $answersMap = collect(...)->mapWithKeys(...)->toArray();      // data prep
    $examQuestions = $mockExam->examQuestions()->with(...)->get(); // query
    [$score, $wrongAnswers, ...] = DB::transaction(function () {  // business logic
        [$score, ...] = $this->service->evaluateAndUpdateExam(...);
        $mockExam->update([...]);
        return [...];
    });
    $this->service->logExamCompletion(...);                       // side effect
    return $this->successResponse([...]);
}

// Thin controller — only HTTP concerns
public function submit(MockExam $mockExam, SubmitExamRequest $request): JsonResponse
{
    $this->authorize('submit', $mockExam);
    $result = $this->submitExamAction->execute($mockExam, $request->validated());
    return $this->successResponse($result, 'Exam submitted successfully');
}
```

## Why this matters

| Fat controller | Thin controller |
|----------------|-----------------|
| Hard to test — needs full HTTP stack | Logic tested independently |
| Auth rules buried — hard to find | Auth in Policy — one place |
| Business logic not reusable (e.g. from a CLI command) | Service/Action reusable anywhere |
| One change in logic forces a controller edit | Controller never changes for business reasons |

## The smell: counting lines

A controller method over 20 lines is a signal that logic is leaking in.  
A controller method over 40 lines almost always violates SRP.

## Related
- [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] — removes auth code from controllers
- [[a policy groups all authorization rules for one model in one class|policies]] — where the authorization logic actually lives
- [[authentication asks who you are, authorization asks what you can do|authentication vs authorization]] — understanding what belongs where
