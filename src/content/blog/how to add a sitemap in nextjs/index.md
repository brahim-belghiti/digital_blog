---
title: "How to generate a dynamic sitemap in Next.js (App router)"
description: "instructions on how to add a sitemap to a nextjs applicaiton and example"
date: "Apr 23 2025"
tags: ["nextjs"]
url: "how-to-generate-a-dynamic-sitemap-in-Next.js-(app-router)"
---

# 🗺️ How to Generate a Dynamic Sitemap in Next.js (App Router)

If you're building a Next.js app and want to add a sitemap, your first instinct might be to drop a `sitemap.xml` file in the `app` directory. While this works, it's not ideal—especially for sites with dynamic content like blogs, product listings, or portfolios.

A static sitemap requires you to manually list all the pages, which doesn’t scale well. Thankfully, Next.js provides a pattern to **dynamically generate your sitemap** using a `sitemap.ts` file.

## 🧩 The General Approach

There are two types of content to handle in a sitemap:

1. **Static pages** – These are routes you hardcode, like `/about` or `/contact`.
2. **Dynamic pages** – These are generated from a database or API, like blog posts or product pages.

## 🔧 Step-by-Step Implementation

1. **Define your static routes in an array.**
2. **Create a function to fetch dynamic content (e.g., blog posts).**
3. **Map the dynamic content to an array of sitemap entries.**
4. **Combine both arrays and return them from your `sitemap.ts` function.**


## 🙅‍♂️ Skip Protected Routes

You **shouldn’t include protected or authenticated-only routes** (e.g., admin panels, dashboards, or user settings) in your sitemap. These pages require login and aren't meant for indexing by search engines.

---

### 💡 Code Example

```ts
import type { MetadataRoute } from 'next'
import { getAllArticles } from '@/lib/actions/blog'

const BASE_URL = 'https://careerlink.ma'

// 1. Static routes
const routes = [
  '',
  '/blog',
  '/contact',
  '/fiches-metiers',
  '/legal/conditions-utilisation',
  '/legal/cookies',
  '/legal/mentions-legales',
  '/legal/politique-confidentialite',
  '/login',
  '/register',
  '/recruteurs',
  '/recruteurs/tarification',
  '/reset-password',
  '/verifiction-email',
]

// 2. Dynamic blog posts
async function getAllBlogArticles() {
  try {
    const response = await getAllArticles(1, 1000)
    if (!response?.data) return []

    return response.data.map(article => ({
      slug: article.slug,
      lastModified:
        article.updated_at || article.created_at || new Date().toISOString(),
    }))
  } catch (error) {
    console.error('Error fetching blog articles for sitemap:', error)
    return []
  }
}

// 3. Main sitemap function
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {

  const staticRouteEntries = routes.map(route => ({
    url: `${BASE_URL}${route}`,
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: route === '' ? 1.0 : 0.8,
  }))

  const blogArticles = await getAllBlogArticles()
  const blogEntries = blogArticles.map(article => ({
    url: `${BASE_URL}/blog/${article.slug}`,
    lastModified: new Date(article.lastModified),
    changeFrequency: 'weekly',
    priority: 0.7,
  }))

  return [...staticRouteEntries, ...blogEntries]
}
```
## 🤖 Don’t Forget the `robots.txt` File

 Make sure to include a `robots.txt` file in the root of your `public/` directory. Without it, Google might ignore or block your sitemap submission.
 ##### Example: `public/robots.txt`

```
User-agent: *
Allow: /
Sitemap: https://careerlink.ma/sitemap.xml
```
This file tells search engine crawlers where to find your sitemap and gives them permission to crawl the site.
source: https://nextjs.org/docs/app/api-reference/file-conventions/metadata/sitemap




