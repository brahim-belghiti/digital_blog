---
tags:
  - moc
  - payloadcms
---

# How Payload generates an app

Payload's central idea isn't novel — it's how completely the idea is committed to. You don't *build* a CMS with Payload; you *declare* one. From a single TypeScript config, Payload generates the database schema, the REST and GraphQL APIs, the admin panel, and the auth flow. This MOC walks through the primitives that make that generation possible.

## The thesis

[[Payload CMS is based on basic primitives that generate the application|Payload is built on a small set of primitives]] — collections, fields, hooks, globals, access control, endpoints. Declare them, and Payload produces the working app. The interesting move is that everything you'd normally hand-write — schema, forms, API routes, validation — falls out of the same declaration.

## The entry point

[[The config is a typescript object, the entry point to Payload CMS applications, in which all the basic blocks - primitives - of the application are declared.|The config]] is a TypeScript object — not JSON, not a DSL — and that's deliberate: every primitive is a typed value, so the schema and the editor both type-check before the app runs. Nothing in Payload is configured outside the config; it is the single declaration site.

## The data primitive: collections

[[Collections represent data entities. They are constructed with fields, and from them the database structure is generated. Each entry in a collection is a document.|Collections]] are the data entities of the app — Users, Posts, Products. From the collection definition Payload derives the database structure: each entry becomes a document, each field becomes a column.

## The shape primitive: fields

[[Fields are the building blocks of Payload CMS. They define both the columns of the collection documents and the inputs that will be shown in the admin panel.|Fields]] do two jobs at once, and this is the heart of the generation idea: the same field declaration becomes a database column *and* an admin panel input. You don't write the form separately. You don't write the migration separately. One source of truth, two outputs.

## The intervention primitive: hooks

A purely declarative system would be too rigid; you need places to run code. [[Hooks are used in Payload CMS to manage side effects of collections, globals, and auth operations. They are triggered by operations like create, update, delete, login, logout, and refresh.|Hooks]] are those places. They fire on lifecycle events — create, update, delete, login, logout, refresh — and let you slip imperative side effects into the generated machinery without breaking the declarative model.

## What's underneath

[[Payload CMS is database agnostic. You can use both relational and non-relational databases, and under the hood it uses Drizzle as an ORM.|Payload is database-agnostic]]: relational or NoSQL. The config-as-source-of-truth gives Payload enough information to generate the right schema for whichever backend you point it at. Drizzle does the actual ORM work underneath.

## Re-reading

The pattern across every primitive is the same: declare a typed shape in the config, let Payload generate everything that shape implies. Schemas, APIs, admin UIs, validation — all derived. Once you see this, the framework's surface area becomes much smaller than it looks.
