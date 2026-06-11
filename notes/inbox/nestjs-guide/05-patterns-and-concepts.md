# Laravel → NestJS: Patterns & Concepts

A conceptual map of how Laravel's core ideas translate into NestJS. The goal is not
to show code — it is to build the mental model so the code makes sense when you
read or write it.

---

## The Big Picture

Both frameworks are MVC-ish REST API frameworks with dependency injection, middleware
pipelines, and an ORM. The philosophy is different though:

| Laravel                                  | NestJS                                       |
|------------------------------------------|----------------------------------------------|
| Convention over configuration            | Explicit over implicit                        |
| Magic (Eloquent, facades, auto-discovery)| Decorators — everything is declared           |
| PHP class with type hints = DI           | TypeScript class with `@Injectable()` = DI    |
| One "God" `Kernel` bootstraps everything | Many small modules, each owns its slice       |
| Eloquent Active Record pattern           | TypeORM Data Mapper pattern                   |

The biggest mental shift: **in NestJS you declare everything**. There is no auto-discovery.
If a service exists but is not listed in a module's `providers`, it does not exist to
the framework.

---

## 1. Dependency Injection

### Laravel
Laravel's container resolves dependencies by reading type hints in constructors. You
bind things in a `ServiceProvider`. The container is mostly invisible — things "just
work".

```php
// Laravel resolves StoryService automatically from the container
public function __construct(private StoryService $storyService) {}
```

### NestJS
NestJS has the same concept but makes it **explicit**. A class must be decorated with
`@Injectable()` to be managed by the container, and it must be registered in a module's
`providers` array. Only then can it be injected elsewhere.

```
@Injectable()  →  "I am available for injection"
providers: []  →  "I am registered in this module's scope"
exports: []    →  "Other modules can inject me too"
imports: []    →  "I need services from this other module"
```

Think of a module as a mini `ServiceProvider` that also defines its own scope boundary.

**Key rule:** if you get a "cannot inject X" error, the answer is always one of:
- X is missing `@Injectable()`
- X is not in any module's `providers`
- The consuming module doesn't import the module that exports X

---

## 2. Routing

### Laravel
Routes live in `routes/api.php`, separate from controllers. A controller is just a
class — it has no knowledge of its own routes.

```php
Route::get('/stories', [StoryController::class, 'index']);
Route::post('/stories/{story}/listen', [StoryController::class, 'listen']);
```

### NestJS
Routes are declared with decorators **directly on the controller**. The controller is
the route definition.

```
@Controller('stories')   →   Route::prefix('stories')
@Get()                   →   Route::get('/')
@Post(':id/listen')      →   Route::post('/{id}/listen')
@Put(':id')              →   Route::put('/{id}')
@Delete(':id')           →   Route::delete('/{id}')
@Patch(':id')            →   Route::patch('/{id}')
```

The path on `@Controller` is the prefix, the path on the method decorator is appended
to it. So `@Controller('stories')` + `@Get(':id/can-listen')` = `GET /stories/:id/can-listen`.

A global prefix set in `main.ts` (`app.setGlobalPrefix('api')`) prepends `/api` to
every route, just like Laravel's `routes/api.php` automatically adds the `/api` prefix.

---

## 3. Middleware Pipeline

Both frameworks run a request through a pipeline of layers before it hits the controller.
The layers have different names but the same purpose.

### Laravel pipeline

```
Request → Global Middleware → Route Middleware → Controller → Resource → Response
```

- Global middleware: `app/Http/Kernel.php` `$middleware`
- Route middleware: `middleware('auth:sanctum')`, `middleware('throttle:5,1')`
- Controller: business logic delegation
- Resource: shapes the response JSON

### NestJS pipeline (in order)

```
Request → Middleware → Guard → Interceptor (before) → Pipe → Controller → Interceptor (after) → Response
```

| Laravel concept                    | NestJS layer        | Runs when                          |
|------------------------------------|---------------------|------------------------------------|
| Global middleware (CORS, logging)  | **Middleware**      | Before guard/auth — same as Laravel |
| `middleware('auth:sanctum')`       | **Guard**           | Decides if the request is allowed  |
| `middleware('role:admin')`         | **Guard**           | Same — guards can stack            |
| `FormRequest` validation           | **Pipe**            | After guard, before the controller method runs |
| `Resource` / `ApiResponser`        | **Interceptor**     | Wraps the controller's return value |
| `middleware('throttle:5,1')`       | **Guard** (Throttler module) | NestJS has `@nestjs/throttler` |

The important insight: **Guards only answer "can this request proceed?"** — they do not
shape the response. **Interceptors** answer "what does the response look like?" —
they run both before and after the controller (like a PHP `__invoke` sandwich).

---

## 4. Authentication

### Laravel (Sanctum)
- User logs in → server creates a `personal_access_tokens` row → returns the token string.
- Subsequent requests send `Authorization: Bearer <token>`.
- `auth:sanctum` middleware looks up the token in the DB on every request.

### NestJS (JWT)
- User logs in → server signs a **JWT** with a secret → returns the token.
- Subsequent requests send `Authorization: Bearer <token>`.
- `JwtAuthGuard` verifies the token's signature locally — **no DB lookup** on every request.
- The decoded payload (user id, email, role) is attached to `request.user`.

The practical difference: JWT is stateless (faster, scales better), Sanctum tokens are
stateful (can be revoked instantly by deleting the DB row).

```
Laravel Sanctum flow:  Login → DB token row → Bearer token → DB lookup every request
NestJS JWT flow:       Login → Sign JWT → Bearer token → Signature verify (no DB)
```

A `@CurrentUser()` custom param decorator replaces `Auth::user()` / `$request->user()`.
It simply reads `request.user` that `JwtAuthGuard` already populated.

---

## 5. Validation

### Laravel (FormRequest)
A dedicated class per endpoint. The framework resolves it, runs `authorize()` and
`rules()`, and throws a `ValidationException` if it fails. The 422 JSON response is
automatic.

### NestJS (DTO + class-validator + ValidationPipe)
A DTO is a plain TypeScript class with property decorators from `class-validator`.
The global `ValidationPipe` runs them automatically. The 400 JSON response is automatic.

```
Laravel FormRequest       NestJS equivalent
─────────────────────     ──────────────────────────────────────
FormRequest class         DTO class
authorize(): bool         Guard (separate concern — auth != validation)
rules(): array            @IsString(), @IsInt(), @Min() … decorators on DTO properties
messages(): array         Custom message option: @IsString({ message: '…' })
$this->validated()        The controller receives the DTO directly as a typed argument
```

Two things that are different:
1. **Authorization is separated from validation** in NestJS. Guards handle "can this user
   do this?" — DTOs only handle "is the shape of this request correct?"
2. **Type coercion must be explicit.** Laravel casts `"5"` (query string) to `5` (int) if
   you type-hint `int`. In NestJS you must add `@Type(() => Number)` from
   `class-transformer`, otherwise query strings stay as strings and `@IsInt()` fails.

---

## 6. ORM & Database

### Laravel (Eloquent — Active Record)
The model IS the database gateway. You call methods directly on it:
`Story::find(1)`, `$story->save()`, `$story->delete()`. The model holds both data and
persistence logic.

### NestJS (TypeORM — Data Mapper)
The entity describes the shape and relations. A separate **Repository** object handles
persistence. The entity itself has no `save()` or `find()` methods.

```
Laravel                          TypeORM
──────────────────────────────── ────────────────────────────────────────
Story::find(1)                →  storyRepo.findOne({ where: { id: 1 } })
Story::with('category')       →  storyRepo.findOne({ relations: ['category'] })
Story::where('age', '>', 5)   →  storyRepo.createQueryBuilder().where('age > :age', {age:5})
$story->save()                →  storyRepo.save(story)
$story->update($data)         →  storyRepo.update(id, data)
$story->delete()              →  storyRepo.remove(story)
Story::paginate(15)           →  qb.skip(offset).take(15).getManyAndCount()
$story->category              →  story.category  (loaded if in relations:[])
```

**Lazy vs eager loading:** Eloquent loads relations lazily by default (accessed as a
property, triggers a query). TypeORM requires you to specify `relations: ['category']`
at query time — there is no lazy loading by default. Forgetting this is the most common
"why is my relation undefined?" bug.

---

## 7. Response Shaping

### Laravel (API Resources)
`StoryResource::toArray()` maps an Eloquent model to a JSON shape. You control exactly
what goes out.

### NestJS
There is no single equivalent — there are three common patterns:

| Pattern                          | How it works                              | Best for                        |
|----------------------------------|-------------------------------------------|---------------------------------|
| `@Exclude()` / `@Expose()` on entity + `ClassSerializerInterceptor` | Annotate entity properties to hide/expose them | Simple cases — hide `password` etc |
| Plain mapper method in service   | `toDto(story)` returns a plain object | Full control, no magic          |
| Dedicated DTO/Response class     | A class that maps entity → response shape | Complex shapes, reuse across routes |

The `@Exclude()` approach is closest to Laravel's hidden properties (`$hidden`). The
mapper method is closest to `StoryResource::toArray()`.

---

## 8. File Uploads

### Laravel (Spatie Media Library)
`$story->addMedia($file)->toMediaCollection('images')` handles storage and associates
the file to the model. The URL is retrieved via `$story->getFirstMediaUrl('images')`.

### NestJS
No built-in media library equivalent. The standard pattern:

1. `@nestjs/platform-express` + multer handles the multipart form parsing.
2. You upload the file to S3 (or save locally) in a dedicated `UploadService`.
3. The resulting URL/path is stored as a plain column on the entity (`image_url`,
   `audio_url`).
4. No pivot table or separate media table — the URL lives directly on the story row.

This is more manual but also more transparent.

---

## 9. Events & Listeners

### Laravel
`Event::dispatch(new StoryCreated($story))` → `StoryCreatedListener::handle()`.
Registered in `EventServiceProvider`.

### NestJS
NestJS has a built-in `EventEmitter2` module (`@nestjs/event-emitter`). The pattern is
identical in intent:

```
EventEmitter2.emit('story.created', payload)   →  @OnEvent('story.created') handler()
```

Or for more complex async pipelines, `@nestjs/bull` (Redis queues) replaces Laravel
queues/jobs.

---

## 10. Configuration

### Laravel
`config/app.php`, `config/database.php` etc., with `.env` values read via `env()`.
Accessed anywhere with `config('app.name')`.

### NestJS (`@nestjs/config`)
`.env` file read by `ConfigModule.forRoot()`. Injected into services via `ConfigService`:

```ts
constructor(private config: ConfigService) {}
const dbHost = this.config.get<string>('DB_HOST');
```

Or define typed config namespaces (like Laravel's `config/database.php`):

```ts
ConfigModule.forRoot({
  load: [databaseConfig],   // a function that returns a typed object
})
```

---

## 11. Error Handling

### Laravel
`app/Exceptions/Handler.php` catches everything. You override `render()` to customize
JSON error responses.

### NestJS (Exception Filters)
An **Exception Filter** is the equivalent. You can register a global filter that catches
any thrown exception and shapes the response:

```
throw new NotFoundException()   →  { statusCode: 404, message: "Not Found" }
throw new ForbiddenException()  →  { statusCode: 403, message: "Forbidden" }
```

Custom business errors: create a class extending `HttpException`:
```ts
class SubscriptionRequiredException extends HttpException {
  constructor() { super('Subscription required', 402); }
}
```

---

## 12. Testing

### Laravel
`php artisan test` runs PHPUnit. Feature tests use `$this->getJson('/api/stories')`.
An in-memory SQLite DB is common for tests.

### NestJS
`jest` is the default. NestJS provides `Test.createTestingModule()` to bootstrap a
slimmed-down module for unit or integration tests.

```
Laravel                             NestJS
─────────────────────────────────── ──────────────────────────────────────
php artisan test                 →  npm run test
php artisan test --filter=…      →  npm run test -- --testNamePattern=…
$this->getJson('/api/…')         →  supertest(app.getHttpServer()).get('/api/…')
Mockery::mock(StoryService)      →  jest.spyOn(service, 'findAll').mockResolvedValue(…)
RefreshDatabase trait            →  TypeORM DataSource.synchronize() in beforeAll
```

---

## Summary: The 5 Things That Trip You Up

1. **"Why isn't my service being injected?"** — Check that it has `@Injectable()` and is
   in the module's `providers` (and `exports` if used outside that module).

2. **"Why is my relation undefined?"** — TypeORM doesn't lazy-load. Add `relations: ['x']`
   to your `findOne`/`find` call, or use a query builder with `leftJoinAndSelect`.

3. **"Why does `@IsInt()` fail on a query parameter?"** — Query strings are always strings.
   Add `@Type(() => Number)` from `class-transformer` to coerce them.

4. **"Why is `request.user` undefined?"** — The route is missing `@UseGuards(JwtAuthGuard)`,
   or the guard is not returning `true`.

5. **"How do I get the logged-in user?"** — Use the `@CurrentUser()` custom decorator
   (which reads `request.user`). Never call a DB query to fetch the user in a controller —
   the guard already did that work.
