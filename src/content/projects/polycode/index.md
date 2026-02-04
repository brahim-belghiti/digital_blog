---
title: 'Polycode - French driving school learning management system (LMS)'
description: 'PolyCode is a comprehensive French driving school learning management system (LMS) designed to help students prepare for the official French driving license exam (Code de la Route).'
date: '2025-10-01'
demoURL: 'https://my.polycode.net/#/register'
repoURL: ''
image: '/assets/projects/polycode/index.png'
tags: ['Laravel', 'TailwindCSS', 'backend']
---

# PolyCode

PolyCode is a comprehensive French driving school learning management system (LMS) designed to help students prepare for the official French driving license exam (Code de la Route). As a full-stack developer, I built a robust, scalable platform that combines an intuitive admin dashboard with a powerful REST API, supporting multilingual content delivery across 9 languages.

## Project Overview

PolyCode offers a complete learning ecosystem for driving theory education, featuring interactive questions, structured lessons, timed mock exams, and practice series. Built with Laravel 12 and React 19, the platform prioritizes performance, security, and maintainability while delivering an engaging learning experience for thousands of users.

## Key Features

- **Interactive Learning**: Comprehensive question bank organized by 10 official categories with support for single/multiple choice answers, images, videos, and multilingual audio.
- **Mock Exams**: Full 40-question exam simulations with 30-minute timers, category-based scoring, and detailed result breakdowns.
- **Practice Series**: Category-focused practice sessions with pause/resume functionality and progress tracking.
- **Structured Lessons**: Hierarchical content organization (Categories > Chapters > Lessons) with rich media support.
- **Multilingual Support**: Complete audio coverage in 9 languages (French, Arabic, Bengali, Spanish, Romanian, Tamil, Turkish, Vietnamese, Chinese).
- **Admin Dashboard**: Comprehensive user management, analytics, article publishing, and contact message handling.
- **GDPR Compliance**: User data export, account anonymization, and consent-based data handling.

## My Contributions

As the full-stack developer, I was responsible for:

- Architecting and building the entire backend using **Laravel 12**, implementing RESTful APIs with token-based authentication (Sanctum), rate limiting, and role-based access control.
- Designing the database schema with **18 Eloquent models**, optimized migrations, and efficient relationships for handling questions, lessons, exams, and user progress.
- Developing the admin dashboard using **React 19** with **TypeScript**, **Inertia.js** for seamless SPA navigation, and **Shadcn UI** for a modern, accessible interface.
- Implementing the complete authentication flow including email verification with 6-digit codes, password reset functionality, and multi-device session management.
- Building the exam and practice session system with pause/resume capabilities, answer persistence, and detailed statistics tracking.
- Creating CLI commands for bulk content import (questions, lessons from CSV), automatic series generation, and media validation.
- Integrating monitoring tools (**Laravel Pulse**, **Telescope**) and auto-generated API documentation with **Scribe**.
- Optimizing performance through caching strategies, efficient database queries, and lazy loading.

The result is a production-ready educational platform that delivers a seamless learning experience while providing administrators with powerful content management tools.

## Tech Stack

| Category | Technologies |
|----------|-------------|
| **Backend** | Laravel 12, PHP 8.2+ |
| **Frontend** | React 19, TypeScript 5.7, Inertia.js |
| **Styling** | Tailwind CSS 4.0 |
| **UI Components** | Shadcn UI, Radix UI |
| **Authentication** | Laravel Sanctum (Token-based) |
| **Database** | MySQL |
| **Build Tool** | Vite 6.0 |
| **Testing** | Pest PHP |
| **Monitoring** | Laravel Pulse, Laravel Telescope |

## Third-Party Libraries

| Library | Purpose |
|---------|---------|
| **laravel/sanctum** | API token authentication with refresh token support |
| **knuckleswtf/scribe** | Automatic API documentation generation |
| **intervention/image** | Image processing and manipulation |
| **mews/purifier** | HTML content sanitization for security |
| **@tanstack/react-table** | Powerful data tables for admin dashboard |
| **date-fns** | Date manipulation and formatting |
| **sonner** | Toast notifications |
| **xlsx** | Excel export functionality |
| **next-themes** | Dark/light theme support |

## API Architecture

The platform exposes a comprehensive REST API with organized endpoint groups:

- **Authentication**: Registration, login, email verification, password reset, token refresh
- **Content**: Questions, categories, lessons, articles with full media support
- **Assessment**: Mock exams, practice series with session management
- **User**: Profile management, statistics, error tracking, data export
- **Admin**: User management, analytics, contact messages

Rate limiting is implemented across all endpoints with different tiers (auth: 5/min, public: 30/min, API: 60-120/min) to ensure fair usage and system stability.

## Database Design

The system features a well-structured relational database with:

- **20+ tables** handling users, content, sessions, and analytics
- **Soft-delete via anonymization** for GDPR compliance
- **JSON columns** for flexible data storage (audio languages, answer arrays, category breakdowns)
- **Optimized indexes** for high-performance queries
- **Foreign key constraints** with cascade deletes for data integrity


## 📸 Screenshots

| Homepage | search map with result | 
|----------|----------------|
| ![homepage](/assets/projects/keysacan/index.png) |  | 




## 🚀 Explore polycode

Visit the [the website](https://my.polycode.net/#/register) to try polycode
