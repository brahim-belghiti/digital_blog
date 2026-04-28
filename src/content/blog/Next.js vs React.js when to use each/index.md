---
title: "Next.js vs React.js — when to use each"
description: "Understanding the difference between Next.js and React.js through the lens of rendering strategies and SEO impact."
date: "Apr 28 2026"
tags: ["react-js", "next-js"]
url: "nextjs-vs-reactjs-when-to-use-each"
---

React is a **UI library**. Next.js is a **framework built on top of React**. That single sentence explains most of the decision. React gives you components, state, and the virtual DOM. Next.js gives you all of that plus a routing system, a build pipeline, and — most importantly — a choice of rendering strategy per page.

## Rendering strategies

### Client-Side Rendering (CSR) — the React default

When you bootstrap a plain React app (Vite), the server sends a nearly empty HTML shell:

```html
<div id="root"></div>
<script src="/bundle.js"></script>
```

The browser downloads the JS bundle, executes it, and React builds the DOM in the browser. This means:

- **First paint is slow** — the user sees a blank screen until JS loads and runs.
- **Interactivity is immediate** after that first paint, because all the logic is already in the browser.
- **Subsequent navigations are fast** — no round-trips to the server, React just swaps components.

CSR is a single-page application (SPA) model. The server is mostly a file host.

### Server-Side Rendering (SSR) — App Router

In the App Router, Server Components fetch data on the server at request time by opting out of caching:

```tsx
async function Feed() {
  const posts = await fetch("/api/posts", { cache: "no-store" }).then(r => r.json());
  return <ul>{posts.map(p => <li key={p.id}>{p.title}</li>)}</ul>;
}
```

Or at the route level:

```tsx
export const dynamic = "force-dynamic";
```

The server renders the full HTML and streams it to the browser. React then **hydrates** the page — attaching event listeners to the existing HTML without re-rendering it.

```
Request → Server renders HTML → Browser receives full HTML → React hydrates
```

- **First paint is fast** — the browser displays content before any JS runs.
- **Data is always fresh** — fetched at request time.

Use this for pages that depend on per-request data: user feeds, personalized content, real-time prices.

### Static Site Generation (SSG) and ISR — App Router

Server Components are **static by default** in the App Router. If you fetch without `cache: "no-store"`, Next.js caches the result at build time and serves a static HTML file from the CDN.

```tsx
async function BlogPost({ params }: { params: { slug: string } }) {
  const post = await fetch(`/api/posts/${params.slug}`).then(r => r.json());
  return <article>{post.content}</article>;
}

export async function generateStaticParams() {
  const posts = await fetch("/api/posts").then(r => r.json());
  return posts.map((p: { slug: string }) => ({ slug: p.slug }));
}
```

For content that changes occasionally, ISR revalidates pages in the background on an interval without a full rebuild:

```tsx
export const revalidate = 3600; // re-generate at most once per hour
```

- **Fastest possible first paint** — served from CDN, zero server computation per request.
- **ISR bridges the gap** — near-static speed with reasonably fresh data.

Use SSG for marketing pages, documentation, and blog posts. Use ISR when the content changes but not on every request.

### React Server Components (RSC) — the App Router default

The App Router made RSC the default model. Every component is a Server Component unless you add `"use client"`. Server Components run only on the server, are never sent to the browser as JS, and can directly access databases, environment secrets, and the file system.

```tsx
// runs only on the server — zero JS shipped to the browser
async function ProductList() {
  const products = await db.query("SELECT * FROM products");
  return <ul>{products.map(p => <li key={p.id}>{p.name}</li>)}</ul>;
}
```

Client Components opt in explicitly:

```tsx
"use client";

export function AddToCart({ id }: { id: string }) {
  const [added, setAdded] = useState(false);
  return <button onClick={() => setAdded(true)}>{added ? "Added" : "Add to cart"}</button>;
}
```

This reduces bundle size significantly — server-only code is never shipped to the client. SSG, SSR, and ISR are all expressed through fetch caching options and `revalidate`, not through separate API functions.

## SEO impact

Search engine crawlers historically struggled with CSR because they receive an empty HTML shell. Googlebot has improved its JS execution, but it still introduces a **crawl delay** — JS-rendered content is indexed later than content present in the initial HTML.

| Strategy | Crawler receives | SEO |
|----------|-----------------|-----|
| CSR (plain React) | Empty shell | Poor — depends on crawler executing JS |
| SSR (App Router) | Full HTML per request | Excellent — full content on first byte |
| SSG / ISR (App Router) | Pre-built full HTML | Excellent — served from CDN, fastest TTFB |
| RSC (App Router default) | Full HTML, streamed | Excellent |

For public-facing content that must rank — landing pages, blog posts, e-commerce product pages — any App Router strategy works well. For private authenticated apps (dashboards, admin panels) where SEO is irrelevant, CSR is perfectly fine.

## Decision guide

**Use plain React (CSR) when:**
- The app is behind authentication and SEO does not matter.
- You want maximum simplicity — no server infrastructure required.
- The app is highly interactive with frequent state changes (e.g. a canvas editor, a chat UI).

**Use Next.js (App Router) when:**
- Any page needs to be indexed by search engines.
- You need server-side data fetching (SSR) or static generation with ISR.
- You want to co-locate server and client code in one repo with fine-grained control via RSC.
- You need file-based routing, API routes, image optimization, or middleware without setting them up manually.

## Summary

React and Next.js are not competing tools — Next.js is React with opinions. The core question is always: **where and when does rendering happen?**

- **CSR**: browser, after JS loads — fast interactions, slow first paint, bad SEO.
- **SSR**: server per request (`cache: "no-store"`) — fresh data, fast first paint, great SEO.
- **SSG / ISR**: build time, cached on CDN (`revalidate`) — best performance, great SEO.
- **RSC**: server components run on the server by default — smaller bundles, great SEO, fine-grained control.

Pick CSR when you are building a private SPA. Pick Next.js App Router whenever SEO, performance, or data-fetching complexity enters the picture.
