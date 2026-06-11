---
tags:
  - anki-cards
source: "[[authentication asks who you are, authorization asks what you can do|authentication vs authorization]], [[gates are closures that answer authorization questions not tied to a model|gates]], [[a policy groups all authorization rules for one model in one class|policies]], [[use a policy when authorization involves a model instance, a gate when it does not|gates vs policies]], [[the Gate is the singleton registry behind all Laravel authorization|the Gate registry]], [[the AuthorizesRequests trait is where the authorize() controller helper comes from|the AuthorizesRequests trait]], [[the authorize() method invokes the gate or policy and throws a 403 on failure|the authorize() method]], [[policies are plain PHP classes, the easiest thing to unit test in Laravel|policy unit testing]]"
---

TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the difference between authentication and authorization?
Back: Authentication (AuthN) — who are you? Verifies identity. Fails with 401. Tools: Sanctum, session guard. Authorization (AuthZ) — are you allowed to do this? Verifies permission. Fails with 403. Tools: Gates, Policies. A logged-in user is not automatically permitted to do everything.
Tags: laravel authorization authentication security
<!--ID: 1779385226259-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: When do you use a Laravel Gate vs a Policy?
Back: Gate — when the authorization question is not tied to a specific model instance (e.g. "can this user access the admin panel?"). Policy — when the question involves a specific record (e.g. "can this user submit this exam?").
Tags: laravel authorization gates policies decision
<!--ID: 1779385226268-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is a Laravel Policy?
Back: A PHP class that groups all authorization rules for a single Eloquent model. Each method answers "can $user perform [action] on $model?" and returns bool. Auto-discovered by convention: App\Models\Foo → App\Policies\FooPolicy.
Tags: laravel policies authorization
<!--ID: 1779385226278-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What can a Laravel Policy method encode beyond ownership?
Back: Any combination of: ownership ($user->id === $model->user_id), role ($user->isAdmin()), business state ($exam->status === ExamStatus::IN_PROGRESS), time constraints. The controller only calls authorize() — it never knows how the rule works.
Tags: laravel policies authorization rules
<!--ID: 1779385226288-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the Gate (capital G) in Laravel?
Back: A singleton registry created at boot that holds a map of models to their policies and routes every authorization call to the right policy. It reads Auth::user() automatically, finds the right policy from the model type, calls the method, and throws 403 if denied. Controllers never instantiate policies directly.
Tags: laravel gate registry authorization singleton
<!--ID: 1779385226296-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: Where does $this->authorize() come from in a Laravel controller?
Back: From the AuthorizesRequests trait, mixed into the base Controller class. Every controller that extends Controller gets it automatically. Internally it delegates to the Gate singleton, which finds the right policy and calls the method.
Tags: laravel authorization authorize-method trait
<!--ID: 1779385226305-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the difference between $this->authorize() and $user->can() in Laravel?
Back: authorize() throws an AuthorizationException (→ 403) if denied — no if needed, the controller just continues. can() returns a bool — use it when you need a true/false without throwing, e.g. building a permissions array for the frontend.
Tags: laravel authorization authorize can
<!--ID: 1779385226314-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: Why are Laravel Policies easier to unit test than authorization checks inside controllers?
Back: A Policy method is a plain function: takes User and Model, returns bool. Instantiate the policy directly, call the method, assert the result. No HTTP stack, no middleware, no database, no routing needed. Authorization buried in a controller requires all of those.
Tags: laravel policies testing unit-test
<!--ID: 1779385226324-->
END


TARGET DECK
programming languages::frameworks and libraries::laravel

START
Basic
Front: What is the difference between factory()->make() and factory()->create() in policy tests?
Back: make() builds the model in memory — no database hit. create() inserts into the database. Policy tests should only need make(). If a policy test requires the database, the policy is probably doing too much.
Tags: laravel testing factories make create
<!--ID: 1779385226334-->
END
