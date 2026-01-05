# 🤖 Agent Instructions & Coding Standards

This file contains **strict coding standards and architecture patterns** for this project. All AI agents and developers **MUST** follow these rules to maintain consistency.

---

## 🚨 CRITICAL: Project Configuration

### 📦 Package Manager

- **ALWAYS use `bun`** - This is the ONLY package manager for this project
- **NEVER use `npm`, `yarn`, or `pnpm`**
- All installation commands MUST use `bun add` or `bun install`

### 🔐 Environment Variables

- **ALWAYS use `.env`** - This is the ONLY environment file
- **NEVER create `.env.local`, `.env.example`, `.env.development`, or any other .env variants**
- All environment variables go in the single `.env` file
- The `.env` file is gitignored and safe for local development

---

## 🚨 CRITICAL: Library Enforcement

**ONLY** use the libraries and tools specified in this document. **DO NOT** introduce any other libraries without explicit approval.

### ✅ APPROVED LIBRARIES & TOOLS

#### **UI & Styling**

- **shadcn/ui** - ONLY UI component library allowed
- **Tailwind CSS 4** - For styling (with CSS variables)
- **Lucide React** - Icon library
- **cn() utility** from `@/lib/utils` - For conditional styling

#### **Data Fetching & State Management**

- **TanStack Query** (@tanstack/react-query) - ALL data fetching and caching
- **Server Actions** - For database queries (marked with `'use server'`)
- **Drizzle ORM** - Type-safe database ORM
- **Neon Database** (PostgreSQL) - Database provider

#### **Framework & Core**

- **Next.js** - React framework (App Router)
- **React Server Components (RSC)** - Default component pattern
- **TypeScript** - All code must be TypeScript

### ❌ FORBIDDEN LIBRARIES

**DO NOT USE:**

- ❌ Other UI libraries: Material-UI, Chakra UI, Ant Design, Bootstrap, etc.
- ❌ Other data fetching: SWR, RTK Query, Apollo Client, etc.
- ❌ State management: Redux, Zustand, Jotai, Recoil, etc.
- ❌ Form libraries: React Hook Form, Formik (unless explicitly added)
- ❌ Custom HTTP clients: axios, fetch wrappers (use Server Actions instead)
- ❌ CSS frameworks: Bootstrap, Bulma, Foundation, etc.
- ❌ Icon libraries: Font Awesome, React Icons, Heroicons (use Lucide only)

### 🔍 Enforcement

Before adding ANY new library:

1. Check if it's in the APPROVED list
2. Check if existing approved libraries can solve the problem
3. If not listed, **ASK FOR PERMISSION** - do not proceed

---

## 📚 Architecture Guidelines

### 1️⃣ Component Organization

**See:** [docs/component-organization.md](docs/component-organization.md)

**Key Rules:**

- ✅ Extract components when pages exceed ~100 lines
- ✅ Organize by type: `ui/`, `cards/`, `forms/`, `layouts/`, `sections/`, `dashboard/`, `shared/`
- ❌ NO massive page files with hundreds of lines of JSX
- ❌ NO mixing unrelated components in the same file

**Folder Structure:**

```
components/
├── ui/          # shadcn/ui primitives ONLY
├── cards/       # Card components
├── forms/       # Form components
├── layouts/     # Layout components
├── sections/    # Page sections
├── dashboard/   # Dashboard-specific
└── shared/      # Globally shared
```

### 2️⃣ UI Components (shadcn/ui)

**See:** [docs/ui-components.md](docs/ui-components.md)

**Key Rules:**

- ✅ **ONLY use shadcn/ui** for all UI elements
- ✅ Install with: `npx shadcn@latest add <component>`
- ✅ Style: **New York**
- ✅ Icons: **Lucide React ONLY**
- ❌ **NO custom components** that replicate shadcn/ui functionality
- ❌ **NO other UI libraries**

**Installation:**

```bash
npx shadcn@latest add button
npx shadcn@latest add card
npx shadcn@latest add dialog
```

### 3️⃣ Data Fetching (TanStack Query + Neon)

**See:** [docs/data-fetching.md](docs/data-fetching.md)

**Key Rules:**

- ✅ **TanStack Query** for ALL data operations
- ✅ **Server Actions** for database queries (`'use server'`)
- ✅ **Read-only** - No mutations (landing page only)
- ✅ **Three patterns per table**: limited, infinite, specific
- ✅ **Centralized** URLs and query keys
- ❌ **NO inline database queries** in components
- ❌ **NO hardcoded URLs or query keys**

**Folder Structure:**

```
lib/
├── actions/       # Server actions (one file per table)
│   ├── bot-actions.ts
│   └── user-actions.ts
├── queries/       # TanStack Query hooks (one file per table)
│   ├── use-bot-queries.ts
│   └── use-user-queries.ts
├── constants/
│   ├── urls.ts         # Centralized URLs
│   └── query-keys.ts   # Centralized query keys (enum)
└── db/
    └── client.ts       # Database client
```

**Required Functions Per Table:**

1. **Limited fetch** - Get 30 items
2. **Infinite pagination** - Paginated data
3. **Specific item** - Get by ID

**Required Hooks Per Table:**

1. `use[Table]Limited()` - For limited data
2. `use[Table]Infinite()` - For infinite scroll
3. `use[Table]ById(id)` - For specific item

**Environment:**

```env
DATABASE_URL="postgresql://..."  # Required in .env.local
```

---

## ✅ Pre-Flight Checklist

Before writing ANY code:

### Libraries

- [ ] Am I using ONLY approved libraries?
- [ ] Do I need to install a new shadcn/ui component?
- [ ] Am I using TanStack Query for data fetching?

### Components

- [ ] Is this component in the correct folder?
- [ ] Is the page file under ~100 lines?
- [ ] Am I using shadcn/ui components (not custom)?

### Data Fetching

- [ ] Did I create action file in `lib/actions/`?
- [ ] Did I create query hooks in `lib/queries/`?
- [ ] Did I add query keys to `lib/constants/query-keys.ts`?
- [ ] Did I add URLs to `lib/constants/urls.ts`?
- [ ] Did I implement all three patterns (limited, infinite, specific)?

### Code Quality

- [ ] All files are TypeScript (`.ts` or `.tsx`)?
- [ ] Server actions marked with `'use server'`?
- [ ] Client components marked with `'use client'`?
- [ ] Using `cn()` for conditional Tailwind classes?

---

## 🎯 Quick Reference

| Need          | Use                            | Location                              |
| ------------- | ------------------------------ | ------------------------------------- |
| Button        | `shadcn/ui`                    | `npx shadcn@latest add button`        |
| Data fetch    | TanStack Query + Server Action | `lib/actions/` + `lib/queries/`       |
| Icons         | Lucide React                   | `import { Icon } from "lucide-react"` |
| Styling       | Tailwind CSS + `cn()`          | `className={cn("...")}`               |
| Page sections | Extract to component           | `components/sections/`                |
| Database      | Neon (PostgreSQL)              | `lib/db/client.ts`                    |

---

## 📖 Documentation

- **Component Organization:** [docs/component-organization.md](docs/component-organization.md)
- **UI Components:** [docs/ui-components.md](docs/ui-components.md)
- **Data Fetching:** [docs/data-fetching.md](docs/data-fetching.md)

---

## 🔒 Enforcement Notice

**These rules are MANDATORY.** Any code that violates these standards will be rejected. When in doubt:

1. Check the approved libraries list
2. Consult the relevant documentation file
3. Ask for clarification - do NOT improvise

**Remember:** Consistency is key to maintainability. Follow the patterns, use the approved tools, and keep the codebase clean.
