---
type: claim
aliases:
  - action-classes
id: action-classes
title: Action Classes
tags: [laravel, architecture, single-responsibility]
links: [a controller has one job, translate an HTTP request into an HTTP response, laravel-service-layer]
---

# Action Classes

## The problem they solve

Business logic that lives in a controller cannot be reused, and grows silently:

```php
// controller doing too much
if ($request->hasFile('avatar')) {
    Storage::disk('public')->delete($user->avatar);
    $data['avatar'] = $request->file('avatar')->store('avatars', 'public');
}
$user->update($data);
```

If two controllers need to update a profile, you copy-paste. If the storage logic changes, you hunt down every copy.

## What an Action is

One class. One public method. One operation.

```php
class UpdateUserProfile
{
    public function __invoke(User $user, array $data, ?UploadedFile $avatar, bool $removeAvatar): User
    {
        // all steps of this one operation — nothing else
    }
}
```

The operation has a name (`UpdateUserProfile`), lives in one place, and can be called from anywhere.

## Actions vs Services

The question to ask: *"Is this one operation with multiple steps, or multiple operations that share a domain?"*

| | Service | Action |
|---|---|---|
| Shape | One class, many methods | One class, one method |
| Example | `SeriesSessionService` with `calculateResults()`, `storeErrors()`, `logActivity()` | `UpdateUserProfile` |
| Use when | Operations share state or are closely related | One named business operation |

A service is a bag of related operations. An action is a single named operation.

## The `__invoke` convention

Using `__invoke` makes the class itself the verb. You call it like a function:

```php
// injected via constructor
($this->updateUserProfile)($user, $data, $avatar, $remove);

// or resolved from the container inline
app(UpdateUserProfile::class)($user, $data, $avatar, $remove);
```

Some teams use `execute()` or `handle()` instead — all are valid. `__invoke` is most common in the Laravel community (used by Spatie, Loris, etc.).

## What stays in the controller

The controller keeps its HTTP responsibilities:
- Reading from the request
- Calling the action
- Returning the response

```php
public function update(UpdateProfileRequest $request)
{
    $user = ($this->updateUserProfile)(
        $request->user(),
        $request->validated(),
        $request->file('avatar'),
        $request->boolean('remove_avatar'),
    );

    return response()->json(['data' => new UserResource($user)]);
}
```

No storage, no hashing, no token deletion — all of that is in the action.

## When to extract an action

- The controller method has conditional logic beyond reading the request
- The same operation appears (or might appear) in more than one place
- The operation has a clear name that means something in the domain

## When not to

- The operation is a single Eloquent call (`$model->update($data)`) — a controller can call that directly
- You already have a service method for it — don't create an action just to wrap a service

## The practical test — Action or Service?

Ask three questions:

| Question | If yes → |
|---|---|
| Does this logic currently live in the controller? | Action |
| Could this same operation be needed in two different places? | Action |
| Are there 3+ related operations that share the same domain? | Service |

The grey zone: a service method that's called from only one place and has grown complex → extract it into an Action. A group of Actions that all deal with the same model and start sharing helpers → group them into a Service. They're not mutually exclusive — a controller can use both.

## Design pattern behind this

Action Classes are an application of the **Command Pattern** — turning an operation into a named, portable object.

→ [[the command pattern turns an operation into an object|command pattern]]: the full pattern — Command, Invoker, Receiver, and what it gives you.

## Relation to other patterns

→ [[a controller has one job, translate an HTTP request into an HTTP response|thin controllers]]: actions are how you keep controllers thin when the logic is too complex for a service method but too specific for a service class.
