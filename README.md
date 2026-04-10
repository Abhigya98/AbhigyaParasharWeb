# Abhigya Parashar Portfolio

This repository now uses a modern static Next.js setup for an interactive personal portfolio.

## Tech Stack

- Next.js (App Router, static export)
- React + TypeScript
- Tailwind CSS
- Framer Motion (subtle interactivity)
- Lucide icons
- GitHub Actions for GitHub Pages deployment

## Project Structure

- `src/app/page.tsx` - Main homepage
- `src/components/` - Reusable UI blocks (navigation and section wrappers)
- `src/app/globals.css` - Global styles and design tokens
- `public/img/` - Images used by the site
- `.github/workflows/deploy.yml` - GitHub Pages deployment workflow

## Local Development

1. Install dependencies:

```bash
npm install
```

2. Run dev server:

```bash
npm run dev
```

3. Build static export:

```bash
npm run build
```

The static output is generated in `out/`.

## GitHub Pages Deployment

This repo is configured to deploy from GitHub Actions.

1. In GitHub, go to repository settings.
2. Open Pages settings.
3. Set source to **GitHub Actions**.
4. Push to `main` and the workflow deploys the static site.

### Important base path note

The deploy workflow sets:

- `NEXT_PUBLIC_BASE_PATH: /AbhigyaParasharWeb`

If you rename the repository, update that value in `.github/workflows/deploy.yml`.

## Content Workflow

Current focus is interactive structure and design foundation.

You can continue refining content directly in:

- `src/app/page.tsx` (section copy)
- `public/img/` (visual assets)

## Legacy File

`index.html` from the earlier static template is still in the repo as a reference source.
