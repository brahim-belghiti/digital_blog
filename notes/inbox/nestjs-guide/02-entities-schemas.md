# NestJS Entities (Schemas) — Slamystory API

In NestJS the most common ORM is **TypeORM**. Entities replace Laravel Eloquent models.
An entity is a plain TypeScript class decorated with `@Entity()`. TypeORM reads the
decorators and maps the class to a database table.

There is no separate migration file you write by hand for simple cases — TypeORM can
generate migrations from your entity definitions, or in dev you use `synchronize: true`
to auto-sync (never in production).

---

## User Entity

Equivalent of `app/Models/User.php`.

```ts
// users/entities/user.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, CreateDateColumn,
  UpdateDateColumn, BeforeInsert, OneToMany, ManyToMany, JoinTable,
} from 'typeorm';
import { Exclude } from 'class-transformer';
import { Story } from '../../stories/entities/story.entity';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  ref: string;                         // auto-generated in BeforeInsert hook

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  @Exclude()                           // never serialized in responses
  password: string;

  @Column({ nullable: true })
  email_verified_at: Date;

  // Spatie roles → a simple roles column or a separate RBAC table
  @Column({ default: 'user' })
  role: string;                        // 'user' | 'admin'

  @OneToMany(() => Story, (story) => story.author)
  stories: Story[];

  @ManyToMany(() => Story)
  @JoinTable({ name: 'favoris' })
  favoris: Story[];

  @ManyToMany(() => Story)
  @JoinTable({ name: 'playlists' })
  playlists: Story[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  // Equivalent of Laravel's booted() / creating hook
  @BeforeInsert()
  generateRef() {
    this.ref = 'USR_' + Math.random().toString(36).substring(2, 8).toUpperCase();
  }
}
```

### Key differences from Eloquent

| Eloquent (Laravel)                  | TypeORM (NestJS)                        |
|-------------------------------------|-----------------------------------------|
| `protected $fillable = [...]`       | No equivalent — assignment is explicit  |
| `protected $hidden = ['password']`  | `@Exclude()` on the property (needs `ClassSerializerInterceptor`) |
| `protected $casts = [...]`          | `@Column({ type: 'timestamp' })` etc.   |
| `static::creating(...)` hook        | `@BeforeInsert()` method on the entity  |
| Spatie `HasRoles` trait             | A `role` column or a dedicated roles table |

---

## Story Entity

Equivalent of `app/Models/Story.php`. Note: Spatie Media Library doesn't exist in
NestJS — file URLs are stored as plain columns.

```ts
// stories/entities/story.entity.ts
import {
  Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn,
  CreateDateColumn, UpdateDateColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Category } from '../../categories/entities/category.entity';

@Entity('stories')
export class Story {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  titre: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column()
  age: number;

  @Column({ nullable: true })
  image_url: string;                   // stored after upload to S3 / local disk

  @Column({ nullable: true })
  audio_url: string;

  // Foreign key columns
  @Column()
  category_id: number;

  @Column()
  user_id: number;

  // Relations
  @ManyToOne(() => Category, (category) => category.stories)
  @JoinColumn({ name: 'category_id' })
  category: Category;

  @ManyToOne(() => User, (user) => user.stories)
  @JoinColumn({ name: 'user_id' })
  author: User;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
```

---

## Category Entity

```ts
// categories/entities/category.entity.ts
@Entity('categories')
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true, type: 'text' })
  description: string;

  @Column({ nullable: true })
  image: string;

  @OneToMany(() => Story, (story) => story.category)
  stories: Story[];

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
```

---

## Favori Entity

The pivot table (`favoris`) between users and stories. In Laravel you used a
`belongsToMany` with a separate Favoris model. In TypeORM you can handle this two ways:

**Option A** — Let TypeORM manage the join table automatically via `@ManyToMany` +
`@JoinTable` on User (shown above). You don't need a separate entity.

**Option B** — An explicit entity when you need extra columns on the pivot (timestamps,
metadata). This maps closer to the Laravel `Favoris` model:

```ts
// favoris/entities/favori.entity.ts
@Entity('favoris')
export class Favori {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  story_id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Story)
  @JoinColumn({ name: 'story_id' })
  story: Story;

  @CreateDateColumn() created_at: Date;
  @UpdateDateColumn() updated_at: Date;
}
```

---

## UserStoryListen Entity

Tracks which user listened to which story. Direct equivalent of `UserStoryListen.php`.

```ts
@Entity('user_story_listens')
export class UserStoryListen {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  user_id: number;

  @Column()
  story_id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  listened_at: Date;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => Story)
  @JoinColumn({ name: 'story_id' })
  story: Story;
}
```

---

## TypeORM Repository Pattern

In NestJS you don't call `Story::with('category')->find($id)` directly in a controller.
Instead, TypeORM injects a **Repository** into your service:

```ts
// Injected in the service constructor
constructor(
  @InjectRepository(Story)
  private storyRepo: Repository<Story>,
) {}

// Usage inside a service method
const story = await this.storyRepo.findOne({
  where: { id },
  relations: ['category', 'author'],   // = Story::with('category', 'user')
});
```

The `TypeOrmModule.forFeature([Story])` call in the module is what makes
`@InjectRepository(Story)` available.
