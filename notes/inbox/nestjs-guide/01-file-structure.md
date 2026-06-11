# NestJS File Structure — Slamystory API

This document maps the current Laravel project layout to its NestJS equivalent.

---

## The Mental Model: Modules

NestJS is built around **modules**. Every feature (stories, users, auth…) lives in its own
self-contained module folder. The module declares which controllers, services, and external
dependencies it owns. Think of it as a combination of Laravel's `ServiceProvider` +
route group + folder convention, all in one place.

```
src/
├── app.module.ts          # root module — imports every feature module
├── main.ts                # bootstrap (= public/index.php + Kernel)
│
├── auth/                  # feature module: authentication
│   ├── auth.module.ts
│   ├── auth.controller.ts
│   ├── auth.service.ts
│   ├── dto/
│   │   ├── login.dto.ts
│   │   └── register.dto.ts
│   └── guards/
│       └── jwt-auth.guard.ts
│
├── users/                 # feature module: users
│   ├── users.module.ts
│   ├── users.controller.ts
│   ├── users.service.ts
│   ├── entities/
│   │   └── user.entity.ts
│   └── dto/
│       ├── create-user.dto.ts
│       └── update-user.dto.ts
│
├── stories/               # feature module: stories
│   ├── stories.module.ts
│   ├── stories.controller.ts
│   ├── stories.service.ts
│   ├── entities/
│   │   └── story.entity.ts
│   └── dto/
│       ├── create-story.dto.ts
│       ├── update-story.dto.ts
│       └── filter-stories.dto.ts
│
├── categories/
│   ├── categories.module.ts
│   ├── categories.controller.ts
│   ├── categories.service.ts
│   └── entities/
│       └── category.entity.ts
│
├── favoris/
│   ├── favoris.module.ts
│   ├── favoris.controller.ts
│   ├── favoris.service.ts
│   └── entities/
│       └── favori.entity.ts
│
├── playlists/
├── offline-playlists/
├── contacts/
├── subscriptions/
│
└── common/                # shared utilities (no business logic)
    ├── decorators/
    │   └── current-user.decorator.ts
    ├── guards/
    │   └── roles.guard.ts
    ├── interceptors/
    │   └── response.interceptor.ts
    └── pipes/
        └── validation.pipe.ts
```

---

## Laravel → NestJS Concept Map

| Laravel                              | NestJS equivalent                          |
|--------------------------------------|--------------------------------------------|
| `app/Models/Story.php`               | `stories/entities/story.entity.ts`         |
| `app/Services/StoryService.php`      | `stories/stories.service.ts`               |
| `app/Http/Controllers/Api/Story…`    | `stories/stories.controller.ts`            |
| `app/Http/Requests/StoreStory…`      | `stories/dto/create-story.dto.ts`          |
| `app/Http/Resources/StoryResource`   | Serialization via `@Exclude`/`@Expose` or a plain mapper method in the service |
| `app/Http/Middleware/…`              | Guards, Interceptors, or Middleware        |
| `routes/api.php`                     | Decorators directly on controller methods  |
| `app/Providers/AppServiceProvider`   | `*.module.ts` providers array              |
| `database/migrations/`               | TypeORM migrations (or `synchronize: true` in dev) |
| `config/`                            | `@nestjs/config` + `.env`                  |
| `app/Http/Traits/ApiResponser`       | A global response interceptor              |

---

## Entry Point

**`main.ts`** is the equivalent of Laravel's `public/index.php`. It bootstraps the app:

```ts
// main.ts
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');           // all routes prefixed with /api
  app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
  await app.listen(3000);
}
bootstrap();
```

- `setGlobalPrefix('api')` replaces the `Route::prefix` that Laravel adds automatically.
- `ValidationPipe` replaces `FormRequest` validation — it runs your DTOs globally.

---

## Root Module

**`app.module.ts`** imports every feature module — like a manifest:

```ts
@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({ ... }),
    AuthModule,
    UsersModule,
    StoriesModule,
    CategoriesModule,
    FavorisModule,
  ],
})
export class AppModule {}
```

---

## Feature Module Example

A feature module (`stories.module.ts`) wires together its own controller, service, and
TypeORM repository:

```ts
@Module({
  imports: [TypeOrmModule.forFeature([Story])],  // registers the Story repo
  controllers: [StoriesController],
  providers: [StoriesService],
  exports: [StoriesService],                      // other modules can import this
})
export class StoriesModule {}
```

The `exports` array is important — it's how you share a service across modules (e.g.,
`FavorisModule` needing `StoriesService`).
