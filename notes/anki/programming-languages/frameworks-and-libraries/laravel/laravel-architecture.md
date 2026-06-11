---
tags:
  - anki-cards
---

TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a Laravel Form Request?
Back: A class that moves input validation out of the controller. Laravel resolves it through the service container and runs validation before the controller method is reached. If validation fails, the method never executes — the controller receives $request->validated(), already clean.
Tags: laravel form-request validation architecture
<!--ID: 1779385226345-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a Laravel API Resource?
Back: A class that transforms a model or data object into the exact JSON shape returned by the API. It is the output layer of the pipeline — the counterpart to Form Requests on the input side.
Tags: laravel api-resource architecture output
<!--ID: 1779385226356-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the full Laravel request pipeline when using Form Requests, Actions, and Resources?
Back: Form Request validates input → Action runs the business operation → Resource formats the output → controller is three lines. Each layer can change independently.
Tags: laravel architecture pipeline
<!--ID: 1779385226365-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: How is a Form Request injected differently from an API Resource?
Back: Form Requests are injected automatically — Laravel detects the type hint and runs validation before the method runs. Resources are instantiated manually: return new UserResource($result). They have no dependencies so they don't need container injection.
Tags: laravel form-request api-resource dependency-injection
<!--ID: 1779385226375-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a Job in Laravel, and how does it relate to an Action?
Back: A Job is an Action that runs in the queue instead of immediately. Same concept — one class, one operation — only the execution timing differs. Use a Job when the operation does not need to finish before responding to the user.
Tags: laravel jobs actions queue
<!--ID: 1779385226384-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: In a Laravel Job, what goes in __construct vs handle?
Back: __construct: data passed at dispatch time, serialized to the queue. handle: dependencies the container provides at execution time (injected when the worker runs the job).
Tags: laravel jobs constructor handle dependency-injection
<!--ID: 1779385226394-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What are the four kinds of state in a Laravel application?
Back: Request state — lives for one HTTP cycle ($request->all(), route parameters). Session state — persists across requests for one user (Auth::user(), flash messages). Application state — shared across all requests (config, cache, singletons). Database state — persistent source of truth (Eloquent models).
Tags: laravel state architecture
<!--ID: 1779385226404-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: Why should Actions take state as explicit parameters rather than reaching for Auth::user() or config() internally?
Back: Explicit state dependencies make the Action testable without an HTTP context, a session, or config setup. It also keeps the Action inside the right layer — state resolution belongs to the controller, not the operation.
Tags: laravel actions state testing
<!--ID: 1779385226414-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: Where do real performance bottlenecks live in a Laravel app?
Back: In the database layer: N+1 queries, missing indexes, absent caching, unoptimized eager loading. Not in architectural patterns — the difference between a fat controller and a thin one with Actions and Resources is microseconds.
Tags: laravel performance architecture
<!--ID: 1779385226429-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What do architecture patterns (Actions, Form Requests, Resources) actually optimize for?
Back: Developer performance — testability, maintainability, reusability. Not machine performance. First make it right (patterns, clarity), then make it fast (profiling, query optimization).
Tags: laravel architecture performance tradeoffs
<!--ID: 1779385226437-->
END
