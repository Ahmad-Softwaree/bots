# Internationalization (i18n) with next-intl

**⚠️ CRITICAL: READ BEFORE IMPLEMENTING MULTI-LANGUAGE FEATURES**

This document outlines the internationalization standards and patterns used in this project with **next-intl**.

## 📋 Overview

This project uses **next-intl** for multi-language support with the following languages:

- **English (en)** - Default language, LTR
- **Arabic (ar)** - RTL
- **Kurdish/Sorani (ckb)** - RTL

## 🏗️ Architecture

### Directory Structure

```
i18n/
  ├── navigation.ts        # next-intl navigation configuration
  ├── request.ts           # Server-side i18n setup
  └── routing.ts           # Routing configuration
messages/
  ├── en.json              # English translations
  ├── ar.json              # Arabic translations
  └── ckb.json             # Kurdish translations
```

### Configuration Files

**File**: `i18n/routing.ts`

```typescript
import { defineRouting } from "next-intl/routing";
import { createNavigation } from "next-intl/navigation";

export const routing = defineRouting({
  locales: ["en", "ar", "ckb"],
  defaultLocale: "en",
});

export type Locale = (typeof routing.locales)[number];
```

**File**: `i18n/request.ts`

```typescript
import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../messages/${locale}.json`)).default,
  };
});
```

**File**: `i18n/navigation.ts`

```typescript
import { createNavigation } from "next-intl/navigation";
import { routing } from "./routing";

export const { Link, redirect, usePathname, useRouter } =
  createNavigation(routing);
```

**Key Points**:

- Import message JSON files dynamically
- Set default locale
- Define supported locales
- Type-safe locale detection
- Create localized navigation helpers

## 📝 Translation JSON Structure

**File**: `messages/en.json`

```json
{
  "common": {
    "add": "Add",
    "edit": "Edit",
    "delete": "Delete"
  },
  "header": {
    "sign_in": "Sign In",
    "sign_up": "Sign Up"
  },
  "bot": {
    "name": "Bot Name",
    "description": "Description",
    "createSuccess": "Bot created successfully",
    "updateSuccess": "Bot updated successfully"
  }
}
```

**Standards**:

- Use flat namespace objects for organization
- Group by feature/section (e.g., `bot`, `header`, `dashboard`, `common`)
- Use descriptive keys within each namespace
- Keep structure identical across all language files
- All JSON files must have the exact same keys

## 🎯 Usage in Components

### Client Components (with Namespaces)

**CRITICAL**: Always use specific namespaces for each translation domain

```typescript
"use client";

import { useTranslations } from "next-intl";

export function BotForm() {
  const t = useTranslations("bot");
  const common_t = useTranslations("common");

  return (
    <form>
      <label>{t("name")}</label> {/* Uses bot.name */}
      <button>{common_t("add")}</button> {/* Uses common.add */}
    </form>
  );
}
```

**Pattern**:

- One `useTranslations()` call per namespace
- Use descriptive variable names: `t`, `hero_t`, `common_t`, `dashboard_t`
- Access keys directly within the namespace: `t("name")` not `t("bot.name")`

### Multiple Namespaces Example

```typescript
"use client";

import { useTranslations } from "next-intl";

export function BotsPage() {
  const t = useTranslations("dashboard");
  const hero_t = useTranslations("hero");

  return (
    <div>
      <h1>{t("all_bots")}</h1> {/* dashboard.all_bots */}
      <p>{hero_t("subtitle")}</p> {/* hero.subtitle */}
    </div>
  );
}
```

### Server Components

**next-intl works in Server Components!**

```typescript
import { getTranslations } from "next-intl/server";

export default async function HomePage() {
  const t = await getTranslations("hero");

  return (
    <div>
      <h1>{t("title")}</h1>
      <p>{t("subtitle")}</p>
    </div>
  );
}
```

## 🔄 Language Toggle Component

**File**: `components/lang-toggle.tsx`

```typescript
"use client";

import { useLocale, useTranslations } from "next-intl";
import { useRouter, usePathname } from "@/i18n/navigation";
import { Locale } from "@/i18n/routing";

export function LangToggle() {
  const t = useTranslations();
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();

  const changeLanguage = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale });
  };

  return <DropdownMenu>{/* Language options */}</DropdownMenu>;
}
```

**Pattern**:

- Use `useLocale()` to get current locale
- Use localized `useRouter()` from `i18n/navigation`
- Call `router.replace()` with new locale to change language
- URL automatically updates (e.g., `/en/about` → `/ar/about`)

## 🌐 Middleware for Locale Detection

**File**: `middleware.ts`

```typescript
import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export default createMiddleware(routing);

export const config = {
  matcher: ["/", "/(ar|en|ckb)/:path*", "/((?!api|_next|_vercel|.*\\..*).*)"],
};
```

**Features**:

- Automatic locale detection from URL
- Redirects to default locale if no locale in URL
- Locale prefix in all routes (e.g., `/en/bots`, `/ar/bots`)

## 🎨 Next.js Configuration

**File**: `next.config.ts`

```typescript
import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");

const nextConfig: NextConfig = {
  // ... other config
};

export default withNextIntl(nextConfig);
```

## 📱 Layout Configuration

**File**: `app/[locale]/layout.tsx`

```typescript
import { NextIntlClientProvider } from "next-intl";
import { getMessages } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";

export default async function LocaleLayout({
  children,
  params: { locale },
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      dir={locale === "ar" || locale === "ckb" ? "rtl" : "ltr"}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

**Key Features**:

- Validate locale
- Set text direction for RTL languages
- Provide messages to client components
- Set `lang` attribute on `<html>`

## 🎨 Font & Direction Handling

### CSS Classes

**File**: `app/globals.css`

```css
[dir="rtl"] {
  /* RTL-specific styles */
}

[dir="ltr"] {
  /* LTR-specific styles */
}
```

### Direction is set automatically in layout:

```typescript
<html dir={locale === 'ar' || locale === 'ckb' ? 'rtl' : 'ltr'}>
```

## 🔄 Adding a New Language

1. **Add locale to routing**: `i18n/routing.ts`

   ```typescript
   locales: ['en', 'ar', 'ckb', 'fr'],
   ```

2. **Create translation file**: `messages/fr.json`

3. **Copy structure from existing file** and translate

4. **Update middleware matcher** if needed

5. **Test the new language** by visiting `/fr/...`

## 📚 Best Practices

### ✅ DO

- Always use namespaces with `useTranslations("namespace")`
- One `useTranslations()` call per namespace
- Use descriptive variable names: `t`, `common_t`, `bot_t`
- Access keys directly: `t("name")` not `t("bot.name")`
- Keep translation keys flat within each namespace
- Maintain identical structure across all language files
- Use Server Components with `getTranslations()` when possible
- Test with all languages, especially RTL
- Let middleware handle locale detection

### ❌ DON'T

- Don't hardcode user-facing strings
- Don't use dot notation to access nested keys in different namespaces
- Don't forget to add new keys to ALL language files
- Don't nest keys too deeply (max 2-3 levels)
- Don't use special characters in translation keys
- Don't manually handle locale routing (use navigation helpers)

## 🚀 Quick Start Checklist

When adding new translatable content:

1. ☐ Add translation keys to all JSON files (`en.json`, `ar.json`, `ckb.json`)
2. ☐ Determine the appropriate namespace (e.g., `bot`, `common`, `dashboard`)
3. ☐ Import `useTranslations` hook with namespace
4. ☐ Use namespace-specific translations: `const t = useTranslations("bot")`
5. ☐ Access keys directly: `t("name")` not `t("bot.name")`
6. ☐ Test in all languages
7. ☐ Verify RTL layout for Arabic/Kurdish

## 📦 Required Packages

```json
{
  "dependencies": {
    "next-intl": "^4.7.0"
  }
}
```

Install with: `bun add next-intl`

## 🔍 Example: Query Hooks with Translation

```typescript
"use client";

import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { toast } from "sonner";

export const useAddBot = () => {
  const t = useTranslations("bot");

  return useMutation({
    mutationFn: (data) => addBot(data),
    onSuccess: () => {
      toast.success(t("createSuccess"));
    },
    onError: () => {
      toast.error(t("createError"));
    },
  });
};
```

**Pattern**:

- Use specific namespace for the feature
- Access translation keys directly
- Keep translations close to where they're used

## 📖 Validation with Translations

**File**: `validation/bot.validation.ts`

```typescript
import { useTranslations } from "next-intl";
import { z } from "zod";

export const getBotSchema = () => {
  const t = useTranslations("validation");

  return z.object({
    name: z.string().min(1, t("required")),
    description: z.string().min(10, t("min_length", { count: 10 })),
  });
};

export type BotSchema = z.infer<ReturnType<typeof getBotSchema>>;
```

**Pattern**:

- Create schema getter functions
- Use validation namespace
- Support interpolation with parameters

---

**Version**: 2.0.0  
**Last Updated**: January 24, 2026
