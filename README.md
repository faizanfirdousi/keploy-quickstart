# Keploy Go Quickstart Tutorial

A single-page documentation site built with **Next.js**, **MDX**, and **Tailwind CSS**. It walks through recording and replaying integration tests with [Keploy](https://keploy.io) on the Go `echo-sql` sample (Echo + PostgreSQL URL shortener).

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command        | Description              |
| -------------- | ------------------------ |
| `npm run dev`  | Start dev server         |
| `npm run build`| Production build         |
| `npm run start`| Serve production build   |
| `npm run lint` | Run ESLint               |

## Project layout

- `doc/tutorial.mdx` and `doc/tutorial-revised.mdx` — tutorial articles (MDX)
- `doc/tutorial-entry.ts` — **switch which MDX file the site renders** (change the import there)
- `components/` — Callout, Steps, TOC, theme toggle, etc.
- `app/page.tsx` — page shell (header, hero, article, footer)
- `docs/` — project notes (PRD/SOP only)

## Deployment

Deploy to [Vercel](https://vercel.com) from this repository. Set `NEXT_PUBLIC_SITE_URL` to your production URL for accurate Open Graph metadata.

## Links

- Tutorial source: [github.com/faizanfirdousi/keploy-quickstart](https://github.com/faizanfirdousi/keploy-quickstart)
- Keploy docs: [keploy.io/docs](https://keploy.io/docs)
