---
type: definition
tags:
  - payloadcms
---
Hooks are used in Payload CMS to manage side effects of collections, globals, and auth operations. They are triggered by operations like create, update, delete, login, logout, and refresh.
Think of them as middleware that runs at different stages of a request.

Here's the mental model — when someone creates or updates a document, Payload runs through a pipeline:

**`beforeValidate`** fires first. The data hasn't been checked against your field rules yet (required, min/max, etc.). You use this to _transform or prepare_ data before validation runs. Example: auto-generating a slug from a title, or setting a default value. If you throw an error here, the operation stops and nothing gets saved.

**`beforeChange`** fires after validation passes but before the data is written to the database. The data is valid, but it hasn't been persisted yet. You use this to _enforce business rules_ or _enrich data_ right before saving. Example: checking if an attendee already has a registration for this time slot — if they do, throw an error and the write never happens. This is your last chance to block the operation.

**`afterChange`** fires after the data has been successfully written to the database. The document exists now. You use this for _side effects_ — things that should happen as a consequence of the write. Example: after a registration is cancelled, promote the next waitlisted person. You don't block anything here — the original operation already succeeded. You're reacting to it.

The key distinction: `beforeChange` is a gatekeeper (prevent bad things from happening), `afterChange` is a reactor (do follow-up work after something happened).

There are others too — `beforeRead`, `afterRead`, `beforeDelete`, `afterDelete`...


Where the hook lives is determined by where the trigger happens, not where the effect lands.