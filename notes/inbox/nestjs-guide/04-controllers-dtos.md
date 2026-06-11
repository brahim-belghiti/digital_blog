# NestJS Controllers & DTOs — Slamystory API

---

## Controllers

Controllers in NestJS replace both Laravel's route file (`routes/api.php`) and the
controller class. Routes are declared with decorators directly on methods — no
separate file.

### StoriesController

Maps to `app/Http/Controllers/Api/StoryController.php`.

```ts
// stories/stories.controller.ts
import {
  Controller, Get, Post, Param, Query, ParseIntPipe,
  UseGuards, Req, HttpCode, HttpStatus,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { StoriesService } from './stories.service';
import { FavorisService } from '../favoris/favoris.service';
import { FilterStoriesDto } from './dto/filter-stories.dto';
import { CurrentUser } from '../common/decorators/current-user.decorator';
import { User } from '../users/entities/user.entity';

@Controller('stories')             // = Route::prefix('stories')
@UseGuards(JwtAuthGuard)           // = $this->middleware('auth:sanctum')
export class StoriesController {
  constructor(
    private storiesService: StoriesService,
    private favorisService: FavorisService,
  ) {}

  // GET /api/stories
  // = public function index(Request $request)
  @Get()
  async index(@Query() filters: FilterStoriesDto, @CurrentUser() user: User) {
    const page    = filters.page    ?? 1;
    const perPage = filters.per_page ?? 15;

    const result          = await this.storiesService.findAll(filters, page, perPage);
    const favoritedIds    = await this.favorisService.getFavoritedStoryIds(user.id);

    return {
      data: result.data.map((story) => ({
        ...story,
        is_favorited: favoritedIds.includes(story.id),
      })),
      meta: { total: result.total, page, per_page: perPage },
    };
  }

  // GET /api/stories/:id
  @Get(':id')
  async show(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const story      = await this.storiesService.findOne(id);
    const favIds     = await this.favorisService.getFavoritedStoryIds(user.id);
    return { ...story, is_favorited: favIds.includes(story.id) };
  }

  // GET /api/stories/:id/can-listen
  @Get(':id/can-listen')
  async canListen(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const story = await this.storiesService.findOne(id);
    return this.storiesService.canUserListen(user, story);
  }

  // POST /api/stories/:id/listen
  @Post(':id/listen')
  @HttpCode(HttpStatus.OK)
  async listen(
    @Param('id', ParseIntPipe) id: number,
    @CurrentUser() user: User,
  ) {
    const story  = await this.storiesService.findOne(id);
    const result = await this.storiesService.recordListen(user, story);

    if (!result.success) {
      // NestJS will catch this and return 403 automatically
      throw new ForbiddenException(result.status);
    }
    return result;
  }
}
```

### Decorator reference

| Laravel                        | NestJS decorator                      |
|--------------------------------|---------------------------------------|
| `Route::get('/stories')`       | `@Get()` on the method                |
| `Route::post('/stories')`      | `@Post()`                             |
| `Route::put('/stories/{id}')`  | `@Put(':id')`                         |
| `Route::delete('/…/{id}')`     | `@Delete(':id')`                      |
| `$request->input('search')`    | `@Query('search') search: string`     |
| `$request->route('id')`        | `@Param('id') id: string`             |
| `$request->user()`             | `@CurrentUser() user: User` (custom decorator) |
| `$this->middleware('auth')`    | `@UseGuards(JwtAuthGuard)` on the class |
| `$this->authorize('update')`   | `@UseGuards(RolesGuard)` + `@Roles('admin')` |

---

## DTOs (Data Transfer Objects)

DTOs replace Laravel's `FormRequest` classes. They use **class-validator** decorators to
express validation rules, and **class-transformer** to cast types. The global
`ValidationPipe` runs them automatically on every request.

### CreateStoryDto

Maps to `app/Http/Requests/StoreStoryRequest.php`.

```ts
// stories/dto/create-story.dto.ts
import { IsString, IsInt, IsOptional, MaxLength, Min, IsPositive } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateStoryDto {
  @IsInt()
  @IsPositive()
  @Type(() => Number)
  category_id: number;

  @IsString()
  @MaxLength(255)
  titre: string;

  @IsString()
  @IsOptional()
  description?: string;

  @IsInt()
  @Min(1)
  @Type(() => Number)
  age: number;

  // File uploads are handled separately via @UploadedFile()
  // — see the note below
}
```

### FilterStoriesDto

Maps to the inline `$request->validate([...])` inside `StoryController::index()`.

```ts
// stories/dto/filter-stories.dto.ts
import { IsOptional, IsString, IsInt, Min, Max } from 'class-validator';
import { Type } from 'class-transformer';

export class FilterStoriesDto {
  @IsString()
  @IsOptional()
  search?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  category_id?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  age_min?: number;

  @IsInt()
  @Min(0)
  @IsOptional()
  @Type(() => Number)
  age_max?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  per_page?: number;

  @IsInt()
  @Min(1)
  @IsOptional()
  @Type(() => Number)
  page?: number;
}
```

### Validation error response

With `ValidationPipe` enabled globally, an invalid request automatically returns:

```json
{
  "statusCode": 400,
  "message": ["titre must be a string", "age must not be less than 1"],
  "error": "Bad Request"
}
```

No manual `failedValidation()` override needed.

---

## File Uploads

Laravel used Spatie Media Library. In NestJS you use `@nestjs/platform-express` +
`multer` for uploads and store the resulting path/URL yourself:

```ts
// In the controller
@Post()
@UseInterceptors(FileFieldsInterceptor([
  { name: 'image', maxCount: 1 },
  { name: 'audio', maxCount: 1 },
]))
async create(
  @Body() dto: CreateStoryDto,
  @UploadedFiles() files: { image?: Express.Multer.File[], audio?: Express.Multer.File[] },
  @CurrentUser() user: User,
) {
  const imageUrl = files.image ? await this.uploadService.upload(files.image[0]) : null;
  const audioUrl = files.audio ? await this.uploadService.upload(files.audio[0]) : null;
  return this.storiesService.create({ ...dto, image_url: imageUrl, audio_url: audioUrl }, user);
}
```

---

## Custom Decorator: `@CurrentUser()`

Replaces `Auth::user()` / `$request->user()`. It reads the user that the JWT guard
already attached to the request:

```ts
// common/decorators/current-user.decorator.ts
import { createParamDecorator, ExecutionContext } from '@nestjs/common';

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;   // populated by JwtAuthGuard
  },
);
```

---

## Auth Guard

Replaces `middleware('auth:sanctum')`. NestJS uses JWT (via `@nestjs/jwt`) instead of
Sanctum tokens, but the concept is the same:

```ts
// auth/guards/jwt-auth.guard.ts
import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}
```

`@UseGuards(JwtAuthGuard)` on a controller class protects every route inside it.
Apply it per-method to protect only specific routes.

---

## Roles Guard

Replaces Spatie's `HasRoles` middleware check. A simple guard that reads a `@Roles()`
decorator you place on routes:

```ts
// common/guards/roles.guard.ts
@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const required = this.reflector.get<string[]>('roles', context.getHandler());
    if (!required) return true;         // no roles required = open to all authenticated users
    const { user } = context.switchToHttp().getRequest();
    return required.includes(user.role);
  }
}

// Usage on a controller method:
@Roles('admin')
@UseGuards(JwtAuthGuard, RolesGuard)
@Delete(':id')
remove(@Param('id', ParseIntPipe) id: number) { ... }
```

---

## Global Response Shape

Laravel had an `ApiResponser` trait to wrap responses in `{ success, message, data }`.
In NestJS this is done with a **global interceptor** so you don't repeat it in every
controller:

```ts
// common/interceptors/response.interceptor.ts
@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      map((data) => ({
        success: true,
        data,
      })),
    );
  }
}

// Register in main.ts:
app.useGlobalInterceptors(new ResponseInterceptor());
```
