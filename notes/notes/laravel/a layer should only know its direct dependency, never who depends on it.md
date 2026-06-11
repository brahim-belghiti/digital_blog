---
type: claim
aliases:
  - layered-architecture
id: layered-architecture
title: Layered Architecture — The Same Principle at Every Scale
tags: [architecture, design-principles, separation-of-concerns]
links: [a controller has one job, translate an HTTP request into an HTTP response, events let a controller announce what happened without knowing what happens next, action classes encapsulate one business operation in one class]
---

# Layered Architecture — The Same Principle at Every Scale

## The core principle

Software is built in **layers**. Each layer:

- **Knows** about the layer directly below it (the thing it calls)
- **Does not know** about the layer directly above it (who calls it)
- **Does not know** about layers far below it (implementation details)

> A layer should only know its direct dependency, never who depends on it.

This is the same rule applied recursively at every scale of software. When a codebase feels "tangled," it is almost always because a layer knows something it should not know.

---

## Zoom 0 — A single request flow (the original example)

The Events & Listeners flow in this app:

| Layer      | Knows about                                      | Does not know about       |
|------------|--------------------------------------------------|---------------------------|
| Controller | HTTP, request, response, which event to fire    | consequences of the event |
| Event      | The data describing what happened                | who is listening          |
| Listener   | Which event to listen for, which service to call | HTTP, request, response   |
| Service    | Business logic                                   | everything above it       |

**Why it works:** adding a new listener doesn't touch the controller. Changing the HTTP response shape doesn't touch the service. Each layer is replaceable.

---

## Zoom 1 — All of Laravel

The full request lifecycle in a Laravel app:

| Layer        | Knows about                                       | Does not know about                  |
|--------------|---------------------------------------------------|--------------------------------------|
| Route        | URL → controller mapping, HTTP verbs              | what happens inside the controller   |
| Middleware   | request/response pipeline, cross-cutting concerns | business logic                       |
| Form Request | validation rules, authorization gate              | what the controller does after       |
| Controller   | HTTP, which action/service to call                | how business logic runs              |
| Policy       | authorization rules for one model                 | the controller, the request          |
| Action       | one business operation                            | HTTP, routing, the caller's identity |
| Service      | a family of related operations                    | HTTP, who called it                  |
| Event        | what happened (just data)                         | who reacts to it                     |
| Listener     | one reaction to an event                          | HTTP, how the event was dispatched   |
| Model        | schema, relationships, entity-level rules         | who reads or writes it               |
| Database     | storage, indexes, constraints                     | the application entirely             |

**The rule in action:**
- A Policy cannot import a Controller.
- A Service cannot import a Request.
- A Model cannot import a Controller.
- A Listener cannot return an HTTP response.

When you notice an import going "upward" (e.g. `use Illuminate\Http\Request` in a Service), a layer boundary has been violated.

---

## Zoom 2 — PHP as a whole

Step back from Laravel. Any PHP app is built in layers:

| Layer            | Knows about                                       | Does not know about                 |
|------------------|---------------------------------------------------|-------------------------------------|
| Your app code    | framework API, domain logic                       | PHP internals, extension C code     |
| Framework        | PHP standard library, composer-installed packages | your business domain                |
| Composer packages| a narrow problem they solve                       | your app or framework               |
| PHP runtime      | opcodes, bytecode, memory, extensions             | your framework or app               |
| PHP extensions   | one C library binding (e.g. `mysqli`, `gd`)       | PHP-level code                      |
| Operating system | processes, memory, sockets, files                 | PHP exists at all                   |

**The rule:** your code can read PHP's manual. The PHP engine has no idea your code exists until it's asked to execute it. The OS just sees a process that allocates memory.

---

## Zoom 3 — Web development

Zoom out further. Any web request crosses many more layers:

| Layer             | Knows about                                  | Does not know about                     |
|-------------------|----------------------------------------------|-----------------------------------------|
| Browser           | HTTP, HTML, DOM, user input                  | server-side anything                    |
| DNS               | domain → IP resolution                       | what runs at that IP                    |
| CDN / edge        | static content caching, geo-routing          | dynamic application logic               |
| Load balancer     | health checks, routing strategy              | the request payload                     |
| Web server (Nginx)| HTTP protocol, static files, proxying        | PHP or business logic                   |
| App server (FPM)  | how to run PHP processes                     | HTTP delivery details                   |
| Application       | business logic                               | how bytes reached it                    |
| Cache (Redis)     | fast key-value storage                       | what the values mean                    |
| Database          | durable storage, transactions                | the app using it                        |
| Object storage (S3)| blob storage                                | file contents semantically              |

**The rule:** the browser can't reach into the database directly. The database has no idea there's a CDN in front of the app. Each layer speaks only to its immediate neighbor.

---

## Zoom 4 — Software engineering in general

The most abstract form. Any computing system is layered:

| Layer             | Knows about                                 | Does not know about                |
|-------------------|---------------------------------------------|-----------------------------------|
| User interaction  | what the user is trying to do               | how software works                 |
| Presentation      | how to show things to a user                | business rules                     |
| Application       | orchestrating operations                    | presentation or storage details    |
| Domain            | business rules, invariants, entities        | persistence or delivery            |
| Infrastructure    | talking to external systems                 | domain meaning                     |
| Runtime / VM      | bytecode, memory, scheduling                | higher abstractions                |
| Operating system  | processes, files, I/O                       | what programs do                   |
| Hardware          | electrons, voltages, instructions           | software exists                    |

**The rule of thumb (Dependency Inversion):** dependencies point inward, from outer/concrete layers to inner/abstract ones. Business rules don't depend on the database. The database doesn't know the business rules.

---

## The single sentence

> Build software as if each layer were written by a different team that never met.

If the layer below you were swapped out (new framework, new language, new database), your layer should still make sense on its own.

---

## The smell: when a layer knows too much

| Smell                                                 | The layer violation                     |
|-------------------------------------------------------|-----------------------------------------|
| A Service imports `Request`                           | business logic knows HTTP               |
| A Model has methods that format JSON                  | domain knows presentation               |
| A Controller writes to the database directly          | HTTP knows storage                      |
| A Listener returns a response                         | side effect knows HTTP                  |
| CSS knows the PHP version                             | presentation knows runtime              |
| A database trigger calls an external API              | storage knows infrastructure            |

The fix is always the same: **move the knowledge to the right layer**, or introduce a new layer that owns that concern.

---

## Why the principle scales

The same rule works at every scale because it's not about frameworks or languages — it's about managing **what each part of a system needs to understand**. Humans can only hold so much in their head. Layers exist so that understanding one part of the system doesn't require understanding all of it.

A perfectly layered system can be read one layer at a time. A tangled system can only be understood all at once — which means it can't be understood at all.

---

## Related

- [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]] — the specific case of "controller knows too much"
- [[events let a controller announce what happened without knowing what happens next|events and listeners]] — layering applied to side-effect separation
- [[action classes encapsulate one business operation in one class|action classes]] — layering applied to operation encapsulation
- [[the observer pattern lets objects react to an event without the subject knowing them|observer pattern]] — a pattern that enforces layer separation via decoupled notification
- [[the command pattern turns an operation into an object|command pattern]] — a pattern that makes operations portable across layers
- [[the strategy pattern makes a family of behaviors interchangeable behind one interface|strategy pattern]] — a pattern that lets layers swap implementations without knowing each other
