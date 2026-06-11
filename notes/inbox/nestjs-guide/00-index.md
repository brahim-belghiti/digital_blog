# Slamystory — NestJS Migration Guide

A reference for understanding how this Laravel codebase maps to NestJS.
Nothing here is production code — it's a learning map.

---

## Documents

| #  | File                         | Covers                                              |
|----|------------------------------|-----------------------------------------------------|
| 1  | [01-file-structure.md](./01-file-structure.md) | Project layout, module system, concept mapping table |
| 2  | [02-entities-schemas.md](./02-entities-schemas.md) | TypeORM entities (= Eloquent models), relations, hooks |
| 3  | [03-services.md](./03-services.md) | Injectable services, repositories, query builder, exceptions |
| 4  | [04-controllers-dtos.md](./04-controllers-dtos.md) | Controllers, route decorators, DTOs, guards, file uploads |
| 5  | [05-patterns-and-concepts.md](./05-patterns-and-concepts.md) | Deep conceptual map: DI, routing, middleware pipeline, auth, ORM, validation, events, testing |

---

## Quick Concept Cheatsheet

```
Laravel                          NestJS
──────────────────────────────── ──────────────────────────────────────
app/Models/Story.php          →  stories/entities/story.entity.ts
app/Services/StoryService.php →  stories/stories.service.ts
Http/Controllers/Api/Story…   →  stories/stories.controller.ts
Http/Requests/StoreStory…     →  stories/dto/create-story.dto.ts
Http/Resources/StoryResource  →  plain mapper in service (or class-transformer)
Http/Middleware/…             →  Guards + Interceptors + Middleware
routes/api.php                →  Decorators on controller methods
app/Providers/…               →  *.module.ts
database/migrations/          →  TypeORM migrations (auto-generated from entities)
Auth::user()                  →  @CurrentUser() custom param decorator
middleware('auth:sanctum')    →  @UseGuards(JwtAuthGuard)
abort(403)                    →  throw new ForbiddenException()
abort(404)                    →  throw new NotFoundException()
ApiResponser trait            →  Global ResponseInterceptor
FormRequest validation        →  DTO + class-validator + ValidationPipe
```

---

## Package equivalents

| Laravel package          | NestJS equivalent                              |
|--------------------------|------------------------------------------------|
| Sanctum                  | `@nestjs/jwt` + `@nestjs/passport`             |
| Spatie MediaLibrary      | `@nestjs/platform-express` + multer + S3 SDK  |
| Spatie Permissions       | Custom `RolesGuard` + `@Roles()` decorator     |
| Laravel Cashier (Stripe) | `stripe` npm package used directly in a service |
| Eloquent ORM             | TypeORM (most common) or Prisma                |
| Telescope / Debugbar     | `@nestjs/devtools-integration`                 |
