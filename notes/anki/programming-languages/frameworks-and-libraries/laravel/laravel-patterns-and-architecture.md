---
tags:
  - anki-cards
source: "[[the observer pattern lets objects react to an event without the subject knowing them|observer pattern]], [[the command pattern turns an operation into an object|command pattern]], [[the strategy pattern makes a family of behaviors interchangeable behind one interface|strategy pattern]], [[events let a controller announce what happened without knowing what happens next|events and listeners]], [[action classes encapsulate one business operation in one class|action classes]], [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]], [[a layer should only know its direct dependency, never who depends on it|layered architecture]], [[DTOs carry typed data across layer boundaries|DTOs]]"
---

TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the Observer Pattern?
Back: One object (subject) announces that something happened. Any number of observers react to it. The subject does not know who is listening or how many there are. Add or remove observers without touching the subject.
Tags: design-patterns observer decoupling
<!--ID: 1779385226072-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: When should you use Events & Listeners (Observer) vs a direct call?
Back: Use events when: multiple unrelated side effects, consequences may grow, side effects span different domains. Don't use when: one consequence (direct call is simpler), sequential steps where each feeds the next (events carry no return value), or you need to know if the side effect succeeded before continuing.
Tags: laravel events observer architecture
<!--ID: 1779385226080-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What are the three pieces of Laravel Events & Listeners?
Back: Event — a data carrier with readonly properties, no logic; represents something that already happened. Listener — does one thing in response, registered with #[ListenTo]. Dispatch — fires the event from anywhere using Event::dispatch() or the event() helper.
Tags: laravel events listeners architecture
<!--ID: 1779385226088-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: When should a Laravel Listener implement ShouldQueue?
Back: When the side effect does not need to complete before the HTTP response is sent — logging, notifications, emails, analytics. Never queue if the result must be visible immediately in the response.
Tags: laravel listeners queue async
<!--ID: 1779385226098-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the Command Pattern?
Back: Encapsulate an operation as an object. Instead of calling logic directly, wrap it in a named class that can be passed around, queued, or executed independently. The operation becomes a first-class citizen with a name, a type, and a single place for its logic.
Tags: design-patterns command
<!--ID: 1779385226106-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the difference between the Command Pattern and the Observer Pattern?
Back: Command encapsulates one named operation to be executed — one caller, one action. Observer announces something happened and lets many observers react independently — one announcement, many reactions.
Tags: design-patterns command observer
<!--ID: 1779385226119-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the Strategy Pattern?
Back: Define a family of algorithms, put each in its own class, and make them interchangeable. A context object picks the right strategy at runtime without knowing how any of them work internally. All strategies share the same interface.
Tags: design-patterns strategy
<!--ID: 1779385226129-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: How do Laravel Policies implement the Strategy Pattern?
Back: Gate = context (picks and calls the right strategy). Each Policy = a concrete strategy for one model. The Gate auto-selects the policy from the model type via naming convention. The controller only calls $this->authorize() — it never decides which policy to use.
Tags: laravel policies strategy-pattern gate
<!--ID: 1779385226141-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the rule of layered architecture?
Back: Each layer knows about the layer directly below it — never above it, never far below it. A Service cannot import a Request. A Model cannot import a Controller. A Listener cannot return an HTTP response. When a source-code import goes "upward," a layer boundary has been violated.
Tags: laravel architecture layered-architecture
<!--ID: 1779385226152-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a DTO in Laravel, and where does it sit in the pipeline?
Back: A Data Transfer Object — a simple immutable class with readonly properties and no logic that carries typed data across layer boundaries. Sits between the HTTP layer and business logic: Request → DTO → Action → Domain. The Action only sees the data it needs, not the Request object.
Tags: laravel dto architecture type-safety
<!--ID: 1779385226163-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: Why should you pass a DTO to an Action rather than the $request directly?
Back: Passing $request couples business logic to Laravel's HTTP layer — the Action can't be called from CLI, a job, or a test without constructing a Request. A DTO defines a clean boundary: the Action knows only the data it needs, not where it came from.
Tags: laravel dto action architecture testing
<!--ID: 1779385226176-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the smell that a controller method is violating single responsibility?
Back: Over 20 lines is a signal. Over 40 lines almost always means logic is leaking in. A controller method should only: authorize, validate input, delegate to an action/service, return a response. Anything else belongs somewhere else.
Tags: laravel controller single-responsibility architecture
<!--ID: 1779385226185-->
END
