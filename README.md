# বাজার দর (Bazar Dor)

> প্রয়োজনীয় পণ্যের দাম এক নজরে — Track daily market prices across Bangladesh.

A modern, fully responsive Bengali-language web application that helps users track daily market prices for essential commodities across different markets in Bangladesh. Built with Next.js 16 (App Router), TypeScript, Tailwind CSS, BetterAuth, and MongoDB.

# Live Demo 

**Live Site :** https://bazar-dor-peach.vercel.app

# Key Features

1. **Live Price Dashboard** — Browse all essential products (চাল, ডাল, তেল, সবজি, মাছ, মাংস, ডিম-দুধ, মসলা) with today's prices in Bengali digits, and instantly see what went up (▲) or down (▼) compared to yesterday.

2. **Category Browsing with Sorting** — Navigate to any category from the navbar and sort products by price (ডিফল্ট / কম থেকে বেশি / বেশি থেকে কম). Client-side sorting with Bengali numeral handling.

3. **Product Detail with Market Comparison** — For each product, view min / max / average price, plus a full breakdown of today's prices across 12 markets in 6 divisions of Bangladesh.

4. **Secure Authentication** — Sign up / sign in with email + password, Google, or GitHub via BetterAuth. Protected routes redirect unauthenticated users with a toast notification.

5. **User Profile & Name Update** — View your account, update your display name, and sign out — all with toast feedback and skeleton loaders throughout.

| Technology | Purpose |
|---|---|
| Next.js 16 (App Router) | Full-stack React framework with Server Components, streaming, and dynamic routes |
| React 19 | UI library with startTransition, Suspense, and strict rendering rules |
| TypeScript | Type-safe product, category, and user models |
| Tailwind CSS v4 | Utility-first styling, responsive grids, custom theme tokens |
| BetterAuth | Email/password + Google + GitHub authentication |
| MongoDB + @better-auth/mongo-adapter | Persistent user and session storage |
| react-hot-toast | Non-blocking toast notifications |
| Noto Sans Bengali | Native Bengali typography via next/font/google |
| lucide-react | Icon set (used alongside inline SVGs) |
| Vercel | Production hosting |
| Cloudflare Workers API | External market price data source |