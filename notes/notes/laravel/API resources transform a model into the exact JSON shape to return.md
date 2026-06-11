---
type: definition
aliases:
  - laravel-api-resources
id: laravel-api-resources
title: API Resources
tags: [laravel, architecture, api]
source: "[[sources/ai-conversations/Laravel fundamentals from first principles]]"
---

# API Resources

An API Resource transforms a model or data object into the exact JSON shape you want to return. It is the output layer of the request pipeline — the counterpart to Form Requests on the input side.

```php
class SeriesResultResource extends JsonResource
{
    public function toArray($request)
    {
        return [
            'score'        => $this->score,
            'percentage'   => round(($this->score / $this->total) * 100, 2),
            'passed'       => $this->score >= $this->passing_score,
            'results'      => AnswerResultResource::collection($this->results),
            'completed_at' => $this->completed_at->toISOString(),
        ];
    }
}
```

## How it fits the pipeline

```
[Form Request]  → validates input
[Action]        → runs business logic, returns a result
[Resource]      → formats that result for HTTP output
```

The Action returns domain data. The Resource decides how that data looks to the API client. Changing the response shape never requires touching the business logic.

## DI difference from Form Requests

Form Requests are injected by the container automatically — Laravel detects the type hint and runs validation before your method runs. Resources are instantiated manually: `return new SeriesResultResource($result)`. They have no framework dependencies so they don't need container injection.

## When to use

Use a Resource whenever the response shape could change independently of the business logic — which is almost always. The exception is a simple `return response()->json($model)` for internal or trivial endpoints where shaping is unnecessary.

→ [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]]: with Form Requests and Resources, the controller is three lines.
→ [[a layer should only know its direct dependency, never who depends on it|layered architecture]]: Resources are the presentation layer; they should not know how the data was produced.
