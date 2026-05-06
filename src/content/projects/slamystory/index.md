---

title: "Slamystory - Audio Storytelling Platform"
description: "Slamystory is an audio storytelling streaming platform with a subscription model, offering categorized stories, playlists, and offline listening
— backed by a Laravel REST API and an Inertia.js admin dashboard."
date: "2026-02-15"
demoURL: ""
repoURL: ""
image: "/assets/projects/slamystory/index.jpg"
tags: ["Laravel", "React", "Inertia.js"]
category: "client"
stack: "backend"

---

# Slamystory

Slamystory is an audio storytelling streaming platform that lets users discover, listen to, and save stories organized by categories. Built with a freemium
model powered by Stripe, the platform allows 5 free listens before requiring a monthly or annual subscription. As a full-stack developer, I built the entire
Laravel backend — including a REST API consumed by the mobile app and a complete admin dashboard using Inertia.js and React.

## Project Overview

The platform serves two distinct interfaces: a mobile-facing REST API for end users and an internal admin dashboard for content and business management.
Stories are grouped into categories, can be added to personal playlists or an offline playlist, and favorited. Subscription access is gated via Stripe Cashier
with real-time webhook handling. Admins get full visibility into revenue, subscriptions, users, and contact messages — with Excel export available for every
key dataset.

## Key Features

- **Freemium Model**: Users get 5 free story listens before being required to subscribe, enforced server-side per user.
- **Stripe Subscriptions**: Monthly and annual plans via Laravel Cashier, with webhook handling for payment status sync and subscription lifecycle management.
- **Audio Story Library**: Stories with audio and cover image media (via Spatie MediaLibrary), organized into categories with title, description, and age
  targeting.
- **Playlists & Favorites**: Users can manage a personal playlist, a favorites list, and an offline playlist — all persisted via pivot tables.
- **Listen Tracking**: Per-user listen history tracked by category, powering usage analytics.
- **Admin Dashboard**: Real-time stats on users, revenue, subscriptions, and stories — with the 5 most recent user signups surfaced on the dashboard.
- **Excel Exports**: Downloadable exports for payments, active/suspended subscriptions, users, and contacts.
- **Contact Management**: Users submit contact messages from the mobile app; admins can view, update status, and delete them from the dashboard.
- **Role-Based Access Control**: Spatie Permission powers admin vs. user role separation across both the web and API layers.

## My Contributions

As the full-stack developer, I was responsible for:

- Architecting and building the entire backend using **Laravel 11**, including RESTful APIs secured with **Laravel Sanctum** token authentication and
  role-based middleware.
- Designing the relational database with **Eloquent models** covering users, stories, categories, subscriptions, playlists, favorites, offline playlists,
  payments, and contacts.
- Integrating **Stripe** and **Laravel Cashier** for recurring subscription billing, payment intent creation, and webhook processing for payment status
  synchronization.
- Implementing the **freemium access control** logic: users can listen to up to 5 stories for free; further access requires an active Stripe subscription
  validated server-side on every listen request.
- Building **Spatie MediaLibrary** integration for story audio (MP3/OGG) and cover image uploads, with MIME type validation and single-file collection
  enforcement.
- Developing the **admin dashboard** with **Inertia.js** and **React 18**, using **Radix UI** primitives and **TailwindCSS** for a modern, accessible
  interface.
- Implementing full **CRUD for stories and categories** in the admin panel, along with user management, subscription monitoring, payment history, and contact
  inbox.
- Building **Excel export** functionality (via Maatwebsite/Excel) for all key admin datasets: users, active subscriptions, suspended subscriptions, payments,
  and contacts.
- Setting up **rate limiting** on authentication routes (5 attempts/min) and implementing structured API responses with a shared `ApiResponser` trait.
- Configuring **Spatie Permission** for role management (admin/user), with policy-based authorization on stories and contacts.

## Tech Stack

| Category           | Technologies                        |
| ------------------ | ----------------------------------- |
| **Backend**        | Laravel 11, PHP 8.2+                |
| **Frontend**       | React 18, TypeScript, Inertia.js    |
| **Styling**        | Tailwind CSS 3, tailwindcss-animate |
| **UI Components**  | Radix UI, Headless UI, Lucide React |
| **Authentication** | Laravel Sanctum (Token + Session)   |
| **Payments**       | Stripe, Laravel Cashier             |
| **Database**       | MySQL                               |
| **Build Tool**     | Vite 4                              |
| **Testing**        | PHPUnit                             |

## Third-Party Libraries

| Library                         | Purpose                                             |
| ------------------------------- | --------------------------------------------------- |
| **laravel/cashier**             | Stripe subscription billing and payment management  |
| **spatie/laravel-medialibrary** | Audio and image file uploads with collection rules  |
| **spatie/laravel-permission**   | Role-based access control (admin / user)            |
| **maatwebsite/excel**           | Excel export for users, payments, and subscriptions |
| **stripe/stripe-php**           | Direct Stripe API calls for payment intents         |
| **tightenco/ziggy**             | Named Laravel routes available in React components  |
| **framer-motion**               | UI animations in the admin dashboard                |
| **sweetalert2**                 | Confirmation dialogs for destructive actions        |

## API Architecture

The platform exposes a REST API consumed by the mobile application, organized into the following groups:

- **Authentication**: Registration, login, logout with token issuance — rate-limited to 5 requests/minute
- **Stories**: List, detail, listen eligibility check, and listen recording per story
- **Categories**: List and detail endpoints for browsing story categories
- **Favorites**: Add, list, and remove stories from the user's favorites
- **Playlists**: Add, list, and remove stories from the user's active playlist
- **Subscriptions**: Create (monthly/annual), view status, and cancel Stripe subscriptions
- **Contacts**: Submit contact messages from the mobile app
- **User**: View profile, update account, delete account

All protected routes require a valid Sanctum bearer token. Authentication endpoints are rate-limited; public contact submission is open without authentication.

## Database Design

The system is built on a relational schema with the following key tables:

- **Users**: Extended with Stripe customer columns (via Cashier), a unique `ref` identifier auto-generated on creation, and role assignments via Spatie
  Permission
- **Stories**: Linked to categories and users; media (audio + image) managed via Spatie's `media` table
- **Categories**: Hierarchical container for stories with name, description, and image
- **Subscriptions / Subscription Items**: Stripe subscription lifecycle synced locally via Cashier
- **Paiements**: Internal payment records with Stripe ID, amount, status (enum), and payment method (enum)
- **Favoris / Playlists **: Pivot tables linking users to stories for each collection type
- **User Story Listens**: Tracks which user listened to which story — used to enforce the 5-listen freemium cap
- **Contacts**: Messages submitted by users, with status tracking for admin follow-up
- **Media** (Spatie): Stores file metadata and paths for all audio and image uploads
- **Permission Tables** (Spatie): Roles and permissions assigned to users
