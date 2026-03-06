# gcp-icons-showcase

Minimal category-based showcase website for the [`gcp-icons`](https://www.npmjs.com/package/gcp-icons) npm package.

## Local development

```bash
npm install
npm run dev
```

Then open `http://localhost:3000`.

## Build

```bash
npm run build
```

## How icons are served

Icons are **not** hosted by this app. The showcase uses the installed `gcp-icons` version to build CDN URLs:

- `gcp-icons` exposes relative paths (e.g. `icons/bigquery-512-color.svg`).
- Each icon is loaded from **unpkg**: `https://unpkg.com/gcp-icons@<version>/<path>`.
- The version comes from the installed package (set at build time in `next.config`).

So the site only references the npm package on the CDN; no icon files are copied or served by the app.

## Deploy to Vercel

- Push this folder to GitHub.
- In Vercel, “New Project” → import the repo.
- Framework preset: **Next.js** (auto-detected)
- Build command: `npm run build` (default)
- Output: handled by Next.js (default)

After deploy, the homepage renders one section per `gcp-icons` category, each with a responsive grid of icons.

