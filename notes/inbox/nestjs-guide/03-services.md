# NestJS Services — Slamystory API

Services are the direct equivalent of Laravel's `app/Services/` classes. The only
difference is they must be decorated with `@Injectable()` so NestJS's IoC container
can manage them and inject them wherever needed.

---

## StoriesService

Maps directly to `app/Services/StoryService.php`.

```ts
// stories/stories.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Story } from './entities/story.entity';
import { UserStoryListen } from '../users/entities/user-story-listen.entity';
import { User } from '../users/entities/user.entity';
import { FilterStoriesDto } from './dto/filter-stories.dto';

@Injectable()
export class StoriesService {
  constructor(
    @InjectRepository(Story)
    private storyRepo: Repository<Story>,

    @InjectRepository(UserStoryListen)
    private listenRepo: Repository<UserStoryListen>,
  ) {}

  // = getAllStories() in StoryService.php
  async findAll(filters: FilterStoriesDto, page = 1, perPage = 15) {
    const qb = this.storyRepo
      .createQueryBuilder('story')
      .leftJoinAndSelect('story.category', 'category')
      .leftJoinAndSelect('story.author', 'author')
      .orderBy('story.created_at', 'DESC');

    if (filters.search) {
      qb.andWhere(
        'story.titre ILIKE :search OR story.description ILIKE :search',
        { search: `%${filters.search}%` },
      );
    }
    if (filters.category_id) {
      qb.andWhere('story.category_id = :category_id', { category_id: filters.category_id });
    }
    if (filters.age_min !== undefined) {
      qb.andWhere('story.age >= :age_min', { age_min: filters.age_min });
    }
    if (filters.age_max !== undefined) {
      qb.andWhere('story.age <= :age_max', { age_max: filters.age_max });
    }

    const [data, total] = await qb
      .skip((page - 1) * perPage)
      .take(perPage)
      .getManyAndCount();

    return { data, total, page, perPage };
  }

  // = getStoryById()
  async findOne(id: number): Promise<Story> {
    const story = await this.storyRepo.findOne({
      where: { id },
      relations: ['category', 'author'],
    });
    if (!story) throw new NotFoundException(`Story #${id} not found`);
    return story;
  }

  // = createStory()
  async create(data: Partial<Story>, user: User): Promise<Story> {
    const story = this.storyRepo.create({ ...data, user_id: user.id });
    return this.storyRepo.save(story);
  }

  // = updateStory()
  async update(id: number, data: Partial<Story>): Promise<Story> {
    await this.storyRepo.update(id, data);
    return this.findOne(id);
  }

  // = deleteStory()
  async remove(id: number): Promise<void> {
    const story = await this.findOne(id);
    await this.storyRepo.remove(story);
    // File deletion from S3 / disk would go here
  }

  // = canUserListen()
  async canUserListen(user: User, story: Story) {
    const listenCount = await this.listenRepo.count({ where: { user_id: user.id } });

    // Check subscription (simplified — real check would query Stripe or a subscriptions table)
    const isSubscribed = false; // replace with actual subscription check

    if (isSubscribed) {
      return { can_listen: true, reason: 'subscribed' };
    }
    if (listenCount >= 5) {
      return { can_listen: false, reason: 'limit_reached', listened_count: listenCount };
    }
    return { can_listen: true, reason: 'free_limit', remaining: 5 - listenCount };
  }

  // = recordListen()
  async recordListen(user: User, story: Story) {
    const alreadyListened = await this.listenRepo.findOne({
      where: { user_id: user.id, story_id: story.id },
    });

    if (alreadyListened) {
      return { success: true, status: 'already_listened' };
    }

    const canListen = await this.canUserListen(user, story);
    if (!canListen.can_listen) {
      return { success: false, status: 'cannot_listen', data: canListen };
    }

    await this.listenRepo.save({ user_id: user.id, story_id: story.id });
    return { success: true, status: 'listening_recorded' };
  }
}
```

### Key differences from Laravel services

| Laravel                                  | NestJS                                      |
|------------------------------------------|---------------------------------------------|
| `new StoryService()` or container binding | `@Injectable()` + declared in module `providers` |
| `Story::with('user')->find($id)`         | `storyRepo.findOne({ where: {id}, relations: ['author'] })` |
| `$story->update($data)`                  | `storyRepo.update(id, data)`                |
| `$story->delete()`                       | `storyRepo.remove(story)`                   |
| Query builder `->where()->paginate()`    | `createQueryBuilder()` + `skip/take/getManyAndCount()` |
| Throwing a 404 via `abort(404)`          | `throw new NotFoundException()`             |

---

## FavorisService

Maps to `app/Http/Controllers/FavorisController.php` (which had no dedicated service in
Laravel — the logic lived in the controller).

```ts
// favoris/favoris.service.ts
@Injectable()
export class FavorisService {
  constructor(
    @InjectRepository(Favori)
    private favoriRepo: Repository<Favori>,
  ) {}

  async findAllByUser(userId: number) {
    return this.favoriRepo.find({
      where: { user_id: userId },
      relations: ['story', 'story.category'],
    });
  }

  async toggle(userId: number, storyId: number) {
    const existing = await this.favoriRepo.findOne({
      where: { user_id: userId, story_id: storyId },
    });

    if (existing) {
      await this.favoriRepo.remove(existing);
      return { favorited: false };
    }

    await this.favoriRepo.save({ user_id: userId, story_id: storyId });
    return { favorited: true };
  }

  async remove(userId: number, storyId: number) {
    await this.favoriRepo.delete({ user_id: userId, story_id: storyId });
  }

  // Used by StoriesService to compute is_favorited
  async getFavoritedStoryIds(userId: number): Promise<number[]> {
    const favs = await this.favoriRepo.find({ where: { user_id: userId } });
    return favs.map((f) => f.story_id);
  }
}
```

---

## Dependency Injection

NestJS resolves dependencies automatically through the constructor. You never instantiate
a service manually:

```ts
// In a controller or another service:
constructor(private storiesService: StoriesService) {}
//          ^ NestJS injects this automatically
```

For this to work, `StoriesService` must be listed in the `providers` array of its module,
and the consuming module must import `StoriesModule` (or `StoriesModule` must export the
service).

---

## Exception Handling

NestJS has built-in HTTP exception classes. You throw them inside services and NestJS
formats the JSON response automatically — no need for a `try/catch` in the controller.

```ts
throw new NotFoundException('Story not found');      // 404
throw new ForbiddenException('Cannot listen');       // 403
throw new UnauthorizedException('Not logged in');    // 401
throw new BadRequestException('Invalid data');       // 400
throw new ConflictException('Already exists');       // 409
```

This replaces the `ApiResponser` trait's `forbiddenResponse()`, `errorResponse()` etc.
