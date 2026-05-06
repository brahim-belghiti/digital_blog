---

title: 'eslint-plugin-next-seo'
description: 'An open-source ESLint plugin that analyzes metadata exports and
generateMetadata functions in Next.js App Router, catching SEO errors before they
ship to production.'
date: '2026-05-06'
demoURL: ''
repoURL: 'https://github.com/brahim-belghiti/eslint-plugin-next-seo'
image: ''
tags: ['open-source', 'ESLint', 'Next.js', 'SEO', 'TypeScript','developer-tools']
category: 'opensource'

---

# eslint-plugin-next-seo

`eslint-plugin-next-seo` is an open-source ESLint plugin that catches SEO
mistakes in Next.js App Router projects at build time. It fills the gap between
`@next/eslint-plugin-next` (which handles framework correctness) and SEO-specific
static analysis — giving you lint errors for missing titles, invalid Open Graph
types, broken JSON-LD, and more, before anything ships to production.

## Project Overview

Next.js's metadata API is flexible enough that it's easy to silently ship pages
without a `title`, with an `openGraph` missing `images`, or with a `twitter.card`
set to a value Google won't recognize. None of those mistakes crash the app —
they just hurt SEO invisibly. This plugin surfaces them as ESLint errors, so they
get caught in CI the same way TypeScript errors do.

## Rules

**Metadata rules** — analyze the `metadata` export or `generateMetadata` function
in each file:

| Rule                                            | What it catches                                   |
| ----------------------------------------------- | ------------------------------------------------- |
| `require-metadata-title`                        | Missing `title`                                   |
| `require-metadata-description`                  | Missing `description`                             |
| `require-open-graph`                            | Missing `openGraph`                               |
| `no-empty-metadata-fields`                      | `title` or `description` set to `""`              |
| `no-template-title-on-page`                     | `title.template` used in a page file              |
| (layout-only)                                   |
| `og-image-in-metadata`                          | `openGraph` without `images`                      |
| `metadata-title-length`                         | Static `title` over 60 characters                 |
| `metadata-description-length`                   | Static `description` over 160 characters          |
| `valid-twitter-card`                            | `twitter.card` not in the valid set               |
| `valid-openGraph-type`                          | `openGraph.type` not a valid Open Graph type      |
| `metadata-keywords-shape`                       | `keywords` passed as a string instead of an array |
| `metadata-base-required-for-relative-og-images` | Relative OG image URLs with                       |
| no `metadataBase`                               |
| `no-metadata-in-client-component`               | `metadata` export in a `"use client"` file        |
|  |

**Sitemap rules** — analyze `app/sitemap.ts`:

| Rule                  | What it catches                           |
| --------------------- | ----------------------------------------- |
| `valid-sitemap-shape` | Missing `url`, invalid `priority`, or bad |
| `changeFrequency`     |

**JSON-LD rules** — analyze `<script type="application/ld+json">` blocks:

| Rule                  | What it catches                                           |
| --------------------- | --------------------------------------------------------- |
| `valid-jsonld-type`   | Missing `@context`/`@type`, typo detection (`"Articel"` → |
| `"Article"`)          |
| `valid-jsonld-fields` | Missing fields required for Google rich-results           |

**JSX content rules**:

| Rule                 | What it catches                     |
| -------------------- | ----------------------------------- |
| `single-h1-per-page` | More than one `<h1>` in a page file |

## Companion CLI

The package ships a `next-seo` CLI for cross-file checks ESLint can't do in
isolation:

```sh
npx next-seo check

┌────────────────────────┬────────────────────────────────────────────────────┐
│         Check          │                    What it does                    │
├────────────────────────┼────────────────────────────────────────────────────┤
│ require-sitemap        │ Verifies app/sitemap.{ts,tsx,xml} exists           │
├────────────────────────┼────────────────────────────────────────────────────┤
│ require-robots         │ Verifies app/robots.{ts,txt} exists                │
├────────────────────────┼────────────────────────────────────────────────────┤
│ sitemap-route-mismatch │ Compares static app/ routes against URLs in        │
│                        │ sitemap.ts                                         │
├────────────────────────┼────────────────────────────────────────────────────┤
│ metadata-coverage      │ Reports how many page.tsx files export metadata    │
└────────────────────────┴────────────────────────────────────────────────────┘

It also includes an init command that scaffolds sitemap.ts and robots.ts from
your actual app/ routes — separating static routes from dynamic ones and emitting
 TODO blocks for the dynamic entries.

npx next-seo init --base-url https://example.com

Usage
Usage

// eslint.config.js
import nextSeo from "eslint-plugin-next-seo";

export default [
  nextSeo.configs.recommended,
];

Tech Stack

┌──────────┬─────────────────────────────────────────┐
│ Category │               Technology                │
├──────────┼─────────────────────────────────────────┤
│ Language │ TypeScript 5 (strict mode)              │
├──────────┼─────────────────────────────────────────┤
│ Build    │ tsup (ESM + CJS dual output)            │
├──────────┼─────────────────────────────────────────┤
│ Tests    │ Vitest + @typescript-eslint/rule-tester │
├──────────┼─────────────────────────────────────────┤
│ AST      │ @typescript-eslint/utils                │
├──────────┼─────────────────────────────────────────┤
│ Target   │ ESLint 9+ flat config, Node 18.18+      │
└──────────┴─────────────────────────────────────────┘

Install

npm install --save-dev eslint-plugin-next-seo
```
