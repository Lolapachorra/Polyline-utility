# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a Next.js 15.5.4 application built with:
- **React 19.1.0** with TypeScript
- **Tailwind CSS 4** (PostCSS plugin architecture)
- **Turbopack** for faster builds and development
- **App Router** architecture (Next.js 13+ routing system)

## Development Commands

```bash
# Start development server with Turbopack
npm run dev

# Production build with Turbopack
npm run build

# Start production server
npm start

# Run ESLint
npm run lint
```

## Project Structure

- `src/app/` - App Router pages and layouts (Next.js 13+ architecture)
  - `layout.tsx` - Root layout with Geist font configuration
  - `page.tsx` - Homepage component
  - `globals.css` - Global Tailwind CSS styles
- `public/` - Static assets served from root
- TypeScript path alias: `@/*` maps to `./src/*`

## Key Configuration

- **TypeScript**: Strict mode enabled, ES2017 target
- **Tailwind CSS**: v4 uses PostCSS plugin (`@tailwindcss/postcss`) instead of traditional config file
- **ESLint**: Next.js recommended configs (`next/core-web-vitals`, `next/typescript`)
- **Fonts**: Geist Sans and Geist Mono loaded via `next/font/google`

## Architecture Notes

- Uses Next.js App Router (file-based routing with `app/` directory)
- Server Components by default (React 19 feature)
- Turbopack enabled for both dev and build commands