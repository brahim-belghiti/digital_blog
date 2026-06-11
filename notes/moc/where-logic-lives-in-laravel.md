---
tags:
  - moc
  - laravel
---
# Where logic lives in a Laravel backend

A Laravel app gives you many places to put code — controllers, models, policies, events, actions, traits. The hard part isn't writing the code; it's deciding where it goes. This MOC is the answer that emerged from reviewing the PolyCode backend.

## The principle

Every architectural decision in a Laravel app is, underneath, an answer to one question: *what knows about what?* [[a layer should only know its direct dependency, never who depends on it|layered architecture]] makes this explicit at four zoom levels — request flow, Laravel itself, PHP, the web — and the rule is the same at each scale: outer layers know about inner ones, never the reverse. Most "where should this go?" questions dissolve once you ask which layer the logic actually belongs to.

A useful companion to this question is asking *what kind of state does this logic need?* [[Laravel has four kinds of state, each with its own lifetime and scope|Laravel has four kinds of state]]: request state (lives for one HTTP cycle), session state (persists across requests for one user), application state (config, cache, singletons), and database state (the source of truth). When moving logic into Actions, making state dependencies explicit — passing them as parameters rather than reaching for `Auth::user()` or `config()` inside the Action — keeps each piece testable and layered correctly.

## The HTTP boundary: controllers stay thin

A controller's job is to translate HTTP into something the rest of the app can use, then translate the result back. That's it. [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]] is the rule. Three classes make it possible.

[[form requests move input validation out of the controller into its own object|Form Requests]] handle input: validation runs before the controller method is reached, and if it fails, the method never executes. The controller receives `$request->validated()` — clean data, already checked. [[action classes encapsulate one business operation in one class|Action classes]] handle the operation: one class, one operation, named for what it does — `SubmitMockExam`, `CreateCustomerAccount`. This is the [[the command pattern turns an operation into an object|command pattern]] applied to business operations. [[API resources transform a model into the exact JSON shape to return|API Resources]] handle output: they transform the result into the exact JSON shape the client receives, independently of how that result was produced.

The full pipeline: Form Request validates input → Action runs the operation → Resource formats the output → controller is three lines. Each piece can change without touching the others.

When an operation does not need to finish before responding to the user, the Action becomes a [[jobs are actions that run in the queue instead of immediately|Job]]: the same class, the same logic, dispatched to the queue instead of run immediately. Emails, file processing, activity logging — anything the user doesn't need to wait for.

## The data boundary: kill magic strings before they spread

Strings flowing across layer boundaries are how layers learn about each other accidentally. [[magic strings are raw literals standing in for a finite set of values|magic strings]] is the smell; [[backed enums map each case to a scalar so the type can reach the database|backed enums]] are the fix when the set of values is finite and meaningful — statuses, roles, types. [[Eloquent casts convert raw database values into PHP types automatically|Eloquent casts]] makes the boundary one-way safe: the database stores the string, but `$casts` ensures the rest of the app only ever sees the enum. The data layer hands the domain layer typed values, never raw text.

## The authorization boundary: who can do what

Authorization sits between "the request arrived" and "the operation runs." First, [[authentication asks who you are, authorization asks what you can do|authentication vs authorization]] — they are not the same: identity (401) precedes permission (403). Then the choice: [[gates are closures that answer authorization questions not tied to a model|gates]] for individual checks not tied to a model, [[a policy groups all authorization rules for one model in one class|policies]] for permission rules grouped per Eloquent model. [[use a policy when authorization involves a model instance, a gate when it does not|gates vs policies]] is the decision guide.

Underneath, both are the same machinery. [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]] is the singleton that holds every check; policies register themselves into it by convention. The [[the AuthorizesRequests trait is where the authorize() controller helper comes from|the AuthorizesRequests trait]] is what gives controllers `$this->authorize()`, and [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]] is how you actually invoke it. Policies are the [[the strategy pattern makes a family of behaviors interchangeable behind one interface|strategy pattern]] in disguise — a pluggable rule object selected at runtime by the type of model passed in.

## Side effects: don't bury them in controllers

When something happens *because* something else happened — a notification on user creation, a cache invalidation on update — that's a side effect, and it doesn't belong inline. [[the observer pattern lets objects react to an event without the subject knowing them|observer pattern]] is the abstract shape: a publisher announces, observers react, neither knows about the other. [[events let a controller announce what happened without knowing what happens next|events and listeners]] is Laravel's implementation: dispatch an event, register listeners with `#[ListenTo]`, and the controller stays ignorant of who's reacting.

## How to verify

Layered architecture pays off in tests. Because [[a policy groups all authorization rules for one model in one class|policies]] are pure PHP — a class, methods returning bool — [[policies are plain PHP classes, the easiest thing to unit test in Laravel|policy unit testing]] needs no HTTP, no router, no middleware. Instantiate the policy, call the method, assert the result. The same shape applies to action classes and listeners: when each layer knows only what it needs to, each layer tests in isolation.

## A note on cost

These patterns add classes and indirection. They do not meaningfully affect runtime performance — the difference between a fat controller and a thin one with Form Request, Action, and Resource is microseconds. [[architecture patterns optimize for developer performance, not machine performance|Architecture patterns optimize for developer performance]], not machine performance. Real performance lives in the database layer: N+1 queries, missing indexes, absent caching. The patterns pay off in testability, maintainability, and reusability — human concerns, not machine ones.

## Re-reading

The whole tour is one idea repeated at different scales: keep responsibilities separate, name what each piece does, and let layers communicate only in the direction the architecture allows. [[a layer should only know its direct dependency, never who depends on it|layered architecture]] is the lens; everything else is what you see through it.
