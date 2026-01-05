# 🤖 Telegram Bots Showcase

<div align="center">

A beautiful, modern landing page to showcase your Telegram bots. Built with Next.js 15, TanStack Query, shadcn/ui, and Neon PostgreSQL.

[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![TailwindCSS](https://img.shields.io/badge/Tailwind-4-38bdf8)](https://tailwindcss.com/)
[![License](https://img.shields.io/badge/license-MIT-green)](LICENSE)

[Live Demo](#) · [Documentation](./QUICKSTART.md) · [Report Bug](#) · [Request Feature](#)

</div>

---

## ✨ Features

- 🎨 **Beautiful Dark Mode** - Stunning purple/blue color scheme
- 🚀 **Lightning Fast** - Optimized with Next.js 15 and React Server Components
- 📱 **Fully Responsive** - Perfect on mobile, tablet, and desktop
- 🔄 **Infinite Pagination** - Load more bots seamlessly
- 🎯 **Type-Safe** - Built with TypeScript and Drizzle ORM
- 🔍 **SEO Optimized** - Great for discoverability
- ♿ **Accessible** - WCAG compliant
- 🎭 **Modern UI** - Powered by shadcn/ui

## 📸 Screenshots

### Home Page

- Hero section with gradient text
- Features showcase
- Bot cards grid (30 featured bots)
- Call-to-action section

### All Bots Page

- Complete bot collection
- Load more pagination
- Responsive grid layout

### Bot Detail Page

- Full bot information
- Status indicators
- Direct links to Telegram and GitHub
- Related resources

## 🚀 Quick Start

### Prerequisites

- Node.js 18 or higher
- A Neon database account (free tier available)

### Installation

1. **Clone the repository**

   ```bash
   git clone <your-repo-url>
   cd bots
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Edit `.env.local` and add your Neon database connection string:

   ```env
   DATABASE_URL="postgresql://user:password@host/database?sslmode=require"
   ```

4. **Set up the database**

   - Go to [Neon Console](https://console.neon.tech)
   - Create a new project
   - Open SQL Editor
   - Copy and run the SQL from `lib/db/setup.sql`

5. **Run the development server**

   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000)

📚 **Need help?** Check out the [Quick Start Guide](./QUICKSTART.md)

## 🛠️ Tech Stack

| Category          | Technology              |
| ----------------- | ----------------------- |
| **Framework**     | Next.js 15 (App Router) |
| **Language**      | TypeScript              |
| **Styling**       | Tailwind CSS 4          |
| **UI Components** | shadcn/ui (Radix UI)    |
| **Icons**         | Lucide React            |
| **Data Fetching** | TanStack Query          |
| **Database**      | Neon (PostgreSQL)       |
| **ORM**           | Drizzle ORM             |
| **Deployment**    | Vercel                  |

## 📁 Project Structure

```
bots/
├── app/                    # Next.js app directory
│   ├── bots/              # Bot listing and detail pages
│   ├── layout.tsx         # Root layout
│   ├── page.tsx           # Home page
│   └── providers.tsx      # TanStack Query setup
├── components/            # React components
│   ├── cards/            # Card components
│   ├── layouts/          # Header & footer
│   ├── sections/         # Page sections
│   └── ui/               # shadcn/ui components
├── lib/                   # Core logic
│   ├── actions/          # Server actions
│   ├── constants/        # Constants
│   ├── db/               # Database config
│   └── queries/          # TanStack Query hooks
└── docs/                  # Documentation
```

## 🎨 Customization

### Change Colors

Edit `app/globals.css`:

```css
.dark {
  --primary: oklch(0.65 0.25 264); /* Purple */
  --accent: oklch(0.55 0.22 310); /* Pink */
}
```

### Add Your Bots

```sql
INSERT INTO bots (name, description, image, icon_image, link, repo_link, status)
VALUES (
  'My Bot',
  'Description here',
  'https://image-url.com/cover.jpg',
  'https://image-url.com/icon.png',
  'https://t.me/my_bot',
  'https://github.com/user/bot',
  'active'
);
```

### Update Branding

- Edit `components/layouts/header.tsx` for navigation
- Edit `components/layouts/footer.tsx` for footer content
- Update `app/layout.tsx` for site metadata

## 📊 Database Schema

```typescript
{
  id: UUID; // Auto-generated
  name: string; // Bot name
  description: string; // Bot description
  image: string; // Cover image URL
  iconImage: string; // Icon/logo URL
  link: string; // Telegram bot link
  repoLink: string; // GitHub repository
  status: string; // 'active' or 'down'
  createdAt: Date; // Auto-generated
}
```

## 🚀 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import project on [Vercel](https://vercel.com)
3. Add `DATABASE_URL` environment variable
4. Deploy!

### Build Locally

```bash
npm run build
npm run start
```

## 📝 Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:generate  # Generate Drizzle migrations
npm run db:push      # Push schema to database
npm run db:studio    # Open Drizzle Studio
```

## 🤝 Contributing

Contributions are welcome! Please read [AGENTS.md](./AGENTS.md) for coding standards.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing`)
5. Open a Pull Request

## 📖 Documentation

- [Quick Start Guide](./QUICKSTART.md) - Get started quickly
- [Setup Guide](./SETUP.md) - Comprehensive setup
- [Project Summary](./PROJECT_SUMMARY.md) - Overview of everything
- [Component Organization](./docs/component-organization.md)
- [Data Fetching](./docs/data-fetching.md)
- [UI Components](./docs/ui-components.md)

## 🐛 Troubleshooting

**Database connection error?**

- Verify `.env.local` exists and contains valid `DATABASE_URL`
- Restart dev server after updating environment variables

**Images not loading?**

- Check image URLs are accessible
- Add image domains to `next.config.ts`

**No bots showing?**

- Verify database has data: `SELECT * FROM bots;`
- Check browser console for errors

More solutions in [QUICKSTART.md](./QUICKSTART.md#-troubleshooting)

## 📄 License

MIT License - feel free to use for your projects!

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [shadcn/ui](https://ui.shadcn.com/) - UI components
- [TanStack Query](https://tanstack.com/query) - Data fetching
- [Drizzle ORM](https://orm.drizzle.team/) - Type-safe ORM
- [Neon](https://neon.tech/) - Serverless Postgres
- [Lucide](https://lucide.dev/) - Icons
- [Tailwind CSS](https://tailwindcss.com/) - Styling

---

<div align="center">

**Built with ❤️ for the Telegram bot community**

[⭐ Star this repo](https://github.com/yourusername/bots) · [🐛 Report Bug](#) · [💡 Request Feature](#)

</div>
