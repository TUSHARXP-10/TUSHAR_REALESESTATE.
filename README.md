# Blueprint Realty

Professional real estate web application built with Vite, React, TypeScript, Tailwind CSS, and shadcn-ui. It features property listings, comparisons, lead management, and an admin dashboard.

## Features

- Responsive landing and property pages
- Advanced filters, comparisons, and gallery
- Lead capture and site visit forms
- Admin dashboard for properties, leads, users, and orders
- Supabase integration for data and auth

## Tech Stack

- Vite, React 18, TypeScript
- Tailwind CSS, shadcn-ui, Radix UI
- TanStack Query
- Supabase

## Getting Started

Prerequisites:

- Node.js 18+
- npm 9+

Installation:

```sh
npm install
npm run dev
```

Build & Preview:

```sh
npm run build
npm run preview
```

## Environment Variables

Create `.env` with:

```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_PUBLISHABLE_KEY=your_supabase_anon_key
```

## Scripts

- `npm run dev` — start dev server
- `npm run build` — production build
- `npm run preview` — preview build
- `npm run lint` — lint codebase

## Project Structure

- `src/pages` — route pages
- `src/components` — UI and feature components
- `src/hooks` — React hooks
- `src/integrations/supabase` — Supabase client and types
- `public` — static assets

## Deployment

Any static hosting supporting Vite builds (e.g., Netlify, Vercel). Serve the `dist` folder after `npm run build`.

## License

This project is licensed under the MIT License.
