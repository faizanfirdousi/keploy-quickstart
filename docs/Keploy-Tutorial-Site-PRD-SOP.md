# Keploy Go Quickstart Tutorial — Next.js + MDX Site
## Combined PRD + SOP (Spec for AI Code Editors)

| | |
|---|---|
| **Project** | Single-page Keploy Go Quickstart documentation site |
| **Purpose** | Keploy DevRel candidate assignment deliverable |
| **Stack** | Next.js (App Router) + MDX + Tailwind CSS |
| **Output** | Public GitHub repo + live Vercel deployment |
| **Doc status** | Ready for implementation |

> **How to use this document:** Save this file as `PRD.md` in the project root and paste it into your AI code editor (Cursor, Claude Code, Windsurf, etc.) as context before you start scaffolding. Part 1 defines *what* to build and *why*. Part 2 is the ordered runbook of *how* to build it. Section 7 and the Appendix contain the exact placeholder where your already-written article gets pasted in — do not build the content, only the system that presents it.

---

# PART 1 — PRODUCT REQUIREMENTS DOCUMENT (PRD)

## 1. Executive Summary

Build one polished, static documentation page that teaches a Go developer how to run a Keploy quickstart (record + replay API tests automatically). The page is generated with **Next.js** and written in **MDX** so prose, code snippets, and interactive React components (callouts, tabs, copy buttons, etc.) live in the same file. The article text itself is already written by the author and will be pasted into a clearly marked placeholder — this spec is only about the *system* that renders it well.

## 2. Background

This is a DevRel candidate assignment. Keploy will evaluate the submission on content quality, technical correctness of the Next.js/MDX implementation, UI/UX polish, and attention to detail. Bonus points are explicitly awarded for a high-quality UI, a dark/light mode toggle, and thoughtful use of UI-library components. The source assignment brief is the authority for hard requirements; this document translates it into a buildable spec.

## 3. Goals

- **G1.** Ship a single, static, fast-loading documentation page built with Next.js + MDX.
- **G2.** Make the tutorial genuinely easy to follow: numbered steps, syntax-highlighted code, callouts for warnings/tips, clear visual hierarchy.
- **G3.** Look professional out of the box — not a default `create-next-app` page with Markdown dumped on it.
- **G4.** Support dark/light mode (bonus requirement, but treated as a baseline "should-have" here).
- **G5.** Keep the content and presentation layers cleanly separated so the article can be dropped in without touching layout code.
- **G6.** Deploy cleanly to Vercel from a clean, public GitHub repo.

## 4. Non-Goals

- No CMS, no database, no auth, no multi-page docs nav — it's **one page**.
- No backend API routes needed; everything is static/prerendered.
- No requirement to build a design system for reuse elsewhere — optimize for this one page.
- Not attempting to be a Keploy clone of their real docs site; this is an original, personal-voice tutorial.

## 5. Target User / Persona

A Go backend developer who has never used Keploy, is comfortable with the terminal and Docker, and is deciding in ~5 minutes of skimming whether this tool is worth trying. They want to see: what problem it solves, the exact commands to run, and what "success" looks like.

## 6. Success Metrics (mapped to Keploy's evaluation criteria)

| Keploy evaluation criterion | How this spec addresses it |
|---|---|
| Content quality | Structured IA (§10) with a "why this matters" layer alongside every step; author's own notes go in the placeholder, not copied docs |
| Technical implementation | Explicit, idiomatic Next.js App Router + `@next/mdx` setup (Part 2) |
| UI/UX | Design tokens, typography, custom components, dark/light mode (§12–13) |
| Attention to detail | QA checklist, lint/build gates, and a submission checklist (§16, Part 2 §14/17) |
| Bonus: polished UI | Custom component library instead of raw Markdown (§12) |
| Bonus: dark/light toggle | `next-themes`-based toggle, treated as required here (§13) |
| Bonus: UI library usage | Tailwind + `@tailwindcss/typography`, optionally shadcn/ui primitives (§11) |

## 7. Content Requirements — READ THIS BEFORE BUILDING

The article itself is **out of scope for the AI editor to write**. The author has already drafted it in their own notes. The build must produce exactly one clearly marked insertion point:

- File: `doc/tutorial.mdx`
- Marker: `{/* PASTE_ARTICLE_CONTENT_HERE */}`
- Everything above the marker (frontmatter, title) and everything the layout renders around it (header, TOC, footer, theme toggle) must work correctly with **placeholder/lorem content** so the page is fully demoable before the real article is pasted in.
- The placeholder content should still exercise every custom component (Callout, code block, step list) at least once, so that once real content replaces it, the author can see how each component is meant to be used.

Do not treat "write the tutorial" as part of this build. Treat it as "build a great frame for content that already exists." See the Appendix for the exact placeholder template to scaffold.

## 8. Functional Requirements

| ID | Requirement | Priority |
|---|---|---|
| F1 | Single route (`/`) renders the full tutorial | Must |
| F2 | Content authored in MDX, imported into the page shell | Must |
| F3 | Syntax-highlighted, copy-able code blocks (bash + Go) | Must |
| F4 | Custom `<Callout type="info\|warning\|success">` component | Must |
| F5 | Custom `<Steps>` / `<Step>` components for numbered instructions | Must |
| F6 | Dark/light mode toggle, persisted across reloads | Should |
| F7 | Sticky in-page table of contents with scroll-spy highlighting | Should |
| F8 | Reading-progress bar | Could |
| F9 | "Back to top" button after scrolling past the fold | Could |
| F10 | Optional Mermaid-style architecture diagram of the record/test flow | Could |
| F11 | Header with project title + link to GitHub repo + Keploy link | Must |
| F12 | Footer with author credit / links | Should |
| F13 | Fully responsive (mobile → desktop) | Must |
| F14 | SEO metadata + Open Graph tags | Should |

## 9. Non-Functional Requirements

- **Performance:** Page should be statically prerendered; target Lighthouse Performance ≥ 90 on desktop.
- **Accessibility:** Semantic HTML, visible focus states, sufficient color contrast in both themes (WCAG AA), theme toggle has an `aria-label`.
- **Browser support:** Latest evergreen browsers (Chrome, Firefox, Safari, Edge).
- **No layout shift** from theme switching (avoid flash of wrong theme on load).
- **Zero console errors/warnings** in dev and prod builds.
- **Type safety:** TypeScript throughout.

## 10. Information Architecture (single-page layout, top to bottom)

1. **Sticky header** — site/article title, GitHub icon link, theme toggle
2. **Hero block** — tutorial title, one-line description, estimated time, tags (e.g. "Go", "Keploy", "API Testing")
3. **Table of contents** — sticky sidebar on desktop, collapsible dropdown on mobile
4. **Article body** (rendered MDX):
   - Intro / what you'll build
   - Prerequisites (`<Callout type="info">`)
   - Step-by-step walkthrough (`<Steps>`), each step with commands + explanation of *why*
   - Gotchas / troubleshooting (`<Callout type="warning">`)
   - Wrap-up / what you learned
   - CTA: link to Keploy docs / GitHub repo for this project
5. **Footer** — links, credit, "built with Next.js + MDX" note

## 11. Tech Stack

| Layer | Choice | Notes |
|---|---|---|
| Framework | Next.js (App Router, latest stable) | TypeScript project |
| Content | MDX via `@next/mdx` | Content lives in `doc/tutorial.mdx`, imported as a component |
| Styling | Tailwind CSS + `@tailwindcss/typography` | Fast, consistent, easy dark mode via `class` strategy |
| Component primitives (optional) | shadcn/ui | Only if extra polish is wanted for buttons/tabs; not required |
| Syntax highlighting | `rehype-pretty-code` (Shiki-based) | Handles light/dark code themes natively |
| Markdown extensions | `remark-gfm` | Tables, strikethrough, task lists |
| Theming | `next-themes` | Class-based dark mode, no flash-of-wrong-theme |
| Icons | `lucide-react` | Lightweight, tree-shakeable |
| Hosting | Vercel | Zero-config for Next.js |

> **Assumption flagged:** Tailwind was chosen over Chakra/MUI because the assignment explicitly allows it and it pairs best with `@tailwindcss/typography` for MDX prose. Swap freely if you prefer another library — nothing else in this spec depends on that choice except class names in the example components below.

## 12. Custom Component Spec

| Component | Purpose | Notes |
|---|---|---|
| `Callout` | Info/warning/success/tip boxes inside MDX | Props: `type`, `children` |
| `Steps` / `Step` | Numbered step list with connecting line | `Step` takes a `title` prop |
| `CodeBlock` (via MDX `pre` override) | Syntax-highlighted block with a copy button | Wraps `rehype-pretty-code` output |
| `CopyButton` | Small button used inside `CodeBlock` | Client component, `navigator.clipboard` |
| `ThemeToggle` | Sun/moon icon switch in header | Uses `next-themes` |
| `TableOfContents` | Extracts `h2`/`h3` headings, scroll-spy | Client component |
| `ReadingProgressBar` | Thin bar under header showing scroll % | Client component |
| `BackToTop` | Floating button, appears after scroll threshold | Client component |
| `MermaidDiagram` *(stretch)* | Renders a diagram of the record → test flow | Dynamically import `mermaid` client-side only |

## 13. UI/UX Guidelines

- **Typography:** A clean sans-serif for body (e.g. Inter) + a monospace font for code (e.g. JetBrains Mono / Geist Mono). Use Next.js `next/font` for zero layout shift.
- **Color tokens:** Define CSS variables for background, foreground, muted, border, accent, and per-callout colors; redefine under `.dark`. Keep contrast ≥ 4.5:1 for body text in both themes.
- **Spacing:** Generous line-height (1.7+) and max content width (~720px) for the prose column so long lines don't hurt readability.
- **Motion:** Subtle only — fade/slide on load, smooth-scroll for TOC anchor clicks, no distracting animation.
- **Empty/placeholder state:** Placeholder content (before the real article is pasted in) should still look intentional, not like Lorem Ipsum spam — use short, real-sounding filler sentences.

## 14. Bonus / Stretch Features (pick based on time budget)

1. Dark/light toggle (treat as required, not optional — explicitly called out by Keploy).
2. Reading progress bar + scroll-spy TOC.
3. Copy-to-clipboard on every code block.
4. A simple Mermaid or hand-drawn SVG diagram of "record traffic → generate tests → replay tests" flow.
5. A collapsible "Troubleshooting" accordion for common quickstart errors.
6. An OG image (`opengraph-image.tsx`) so shared links look good on social/Slack.

## 15. Assumptions & Constraints

- The article's exact word count/structure is unknown at spec time; the layout must gracefully handle a long single article with many headings (hence the TOC).
- No server-side state is available on Vercel's static/edge output for this page — any "interactive" features (progress bar, TOC active state, theme) must be client-side only, using `useState`/`useEffect`/`localStorage`, never a backend.
- Package manager: examples below use `npm`; substitute `pnpm`/`yarn` 1:1 if preferred.

## 16. Deliverables & Definition of Done

- [ ] Public GitHub repository with clean commit history and a helpful `README.md`
- [ ] Live Vercel URL that matches the latest `main` branch
- [ ] Page builds with zero TypeScript/ESLint errors (`npm run build` succeeds)
- [ ] All F1–F7 and F11–F13 functional requirements implemented
- [ ] Dark/light toggle works with no flash-of-wrong-theme
- [ ] Placeholder replaced with the real article, and every custom component (`Callout`, `Steps`, code block) used at least once in the final text
- [ ] Responsive check on mobile width (375px) and desktop (1440px)
- [ ] Lighthouse Performance/Accessibility both ≥ 90

---

# PART 2 — STANDARD OPERATING PROCEDURE (SOP)

Follow these phases in order. Each phase is self-contained enough to hand to an AI code editor as a single instruction.

## Phase 0 — Prerequisites

- Node.js 18.18+ (Node 20 LTS recommended)
- `git` + a GitHub account
- A Vercel account (can sign in with GitHub)
- Your Keploy quickstart notes already written (this SOP does not cover running the Keploy quickstart itself — that's assumed done, per the assignment's own Step 1–2)

## Phase 1 — Scaffold the Next.js app

```bash
npx create-next-app@latest keploy-quickstart-tutorial \
  --typescript --tailwind --eslint --app \
  --src-dir=false --import-alias "@/*"
cd keploy-quickstart-tutorial
```

## Phase 2 — Install MDX + supporting packages

```bash
npm install @next/mdx @mdx-js/loader @mdx-js/react @types/mdx
npm install remark-gfm rehype-pretty-code shiki
npm install next-themes lucide-react
npm install @tailwindcss/typography
```

## Phase 3 — Target project structure

```
keploy-quickstart-tutorial/
├── app/
│   ├── layout.tsx
│   ├── page.tsx                 # assembles header + TOC + <TutorialContent/> + footer
│   ├── globals.css
│   └── opengraph-image.tsx      # optional bonus (Phase 9)
├── components/
│   ├── theme-provider.tsx
│   ├── theme-toggle.tsx
│   ├── header.tsx
│   ├── footer.tsx
│   ├── callout.tsx
│   ├── steps.tsx
│   ├── copy-button.tsx
│   ├── table-of-contents.tsx
│   ├── reading-progress-bar.tsx
│   └── back-to-top.tsx
├── content/
│   └── tutorial.mdx             # ⭐ ARTICLE PLACEHOLDER LIVES HERE (see Appendix)
├── mdx-components.tsx
├── next.config.mjs
├── tailwind.config.ts
├── tsconfig.json
├── package.json
└── README.md
```

## Phase 4 — Configure MDX in `next.config.mjs`

```js
import createMDX from '@next/mdx';
import remarkGfm from 'remark-gfm';
import rehypePrettyCode from 'rehype-pretty-code';

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
};

const withMDX = createMDX({
  extension: /\.mdx?$/,
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [
      [rehypePrettyCode, { theme: { dark: 'github-dark', light: 'github-light' } }],
    ],
  },
});

export default withMDX(nextConfig);
```

## Phase 5 — Tailwind config (dark mode + typography)

```ts
// tailwind.config.ts
import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: ['./app/**/*.{ts,tsx,mdx}', './components/**/*.{ts,tsx}', './doc/**/*.mdx'],
  theme: {
    extend: {
      typography: {
        DEFAULT: { css: { maxWidth: '72ch' } },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
};
export default config;
```

## Phase 6 — Theme provider + toggle

```tsx
// components/theme-provider.tsx
'use client';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider attribute="class" defaultTheme="system" enableSystem>
      {children}
    </NextThemesProvider>
  );
}
```

```tsx
// components/theme-toggle.tsx
'use client';
import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <button
      aria-label="Toggle dark mode"
      onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')}
      className="rounded-md p-2 hover:bg-muted transition-colors"
    >
      {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
    </button>
  );
}
```

Wire it into `app/layout.tsx` with `<html lang="en" suppressHydrationWarning>` to avoid theme-flash warnings.

## Phase 7 — `mdx-components.tsx` (component mapping)

```tsx
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types';
import { Callout } from '@/components/callout';
import { Steps, Step } from '@/components/steps';
import { CopyButton } from '@/components/copy-button';

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    h2: (props) => <h2 className="scroll-mt-24" {...props} />,
    h3: (props) => <h3 className="scroll-mt-24" {...props} />,
    pre: (props) => (
      <div className="group relative">
        <pre {...props} />
        <CopyButton />
      </div>
    ),
    Callout,
    Steps,
    Step,
    ...components,
  };
}
```

## Phase 8 — Build the supporting components

- `callout.tsx` — takes `type: 'info' | 'warning' | 'success'`, renders an icon + colored border/background per type.
- `steps.tsx` — `Steps` renders an ordered `<ol>` wrapper; `Step` renders a numbered marker + `title` + children.
- `copy-button.tsx` — client component; reads the sibling `<pre>` text via a ref and calls `navigator.clipboard.writeText`.
- `table-of-contents.tsx` — client component; on mount, `querySelectorAll('h2, h3')` inside the article, builds a nested list of anchors, and uses `IntersectionObserver` to highlight the active section.
- `reading-progress-bar.tsx` — client component; listens to scroll, computes `scrollTop / (scrollHeight - clientHeight)`, renders a fixed 2px bar under the header.
- `back-to-top.tsx` — client component; shows a floating button once `window.scrollY > 600`.

## Phase 9 — Assemble `app/page.tsx`

```tsx
import { Header } from '@/components/header';
import { Footer } from '@/components/footer';
import { TableOfContents } from '@/components/table-of-contents';
import { ReadingProgressBar } from '@/components/reading-progress-bar';
import { BackToTop } from '@/components/back-to-top';
import TutorialContent from '@/doc/tutorial.mdx';

export default function Page() {
  return (
    <>
      <ReadingProgressBar />
      <Header />
      <div className="mx-auto flex max-w-6xl gap-10 px-4 py-10">
        <article id="article" className="prose prose-neutral dark:prose-invert max-w-none flex-1">
          <TutorialContent />
        </article>
        <aside className="hidden w-56 shrink-0 lg:block">
          <TableOfContents />
        </aside>
      </div>
      <BackToTop />
      <Footer />
    </>
  );
}
```

(Optional SEO: add a `metadata` export in `app/layout.tsx` with title, description, and Open Graph fields; add `app/opengraph-image.tsx` if pursuing the bonus OG image.)

## Phase 10 — Create the content placeholder

Create `doc/tutorial.mdx` using the exact template in the **Appendix** below. Do not skip the placeholder marker — it is the handoff point between this spec and the author's real article.

## Phase 11 — Polish pass

- Run through both themes and confirm no flash-of-wrong-theme and adequate contrast.
- Test at 375px and 1440px widths.
- Confirm every code block has a working copy button.
- Confirm TOC scroll-spy highlights correctly as you scroll.
- Run `npm run lint` and `npm run build` — both must pass clean.
- Run a Lighthouse audit (Chrome DevTools) and address anything under 90 on Performance/Accessibility.

## Phase 12 — QA Checklist

- [ ] Page loads with no console errors in dev and prod (`npm run build && npm start`)
- [ ] All links (GitHub, Keploy docs) open correctly, external links use `target="_blank" rel="noopener noreferrer"`
- [ ] Theme toggle persists across refresh
- [ ] Mobile TOC (collapsed) works if implemented
- [ ] No layout shift when fonts/theme load
- [ ] Placeholder fully replaced with final article text; every custom component used at least once

## Phase 13 — Git & GitHub

```bash
git init
git add .
git commit -m "Initial commit: Next.js + MDX Keploy quickstart tutorial"
gh repo create keploy-quickstart-tutorial --public --source=. --push
# or manually: create repo on GitHub, then
# git remote add origin <repo-url> && git branch -M main && git push -u origin main
```

Make sure `.gitignore` excludes `node_modules/`, `.next/`, and any local env files. Write a short `README.md`: what the project is, how to run it locally (`npm install && npm run dev`), and a link to the live Vercel deployment once available.

## Phase 14 — Deploy to Vercel

1. Go to vercel.com → **New Project** → import the GitHub repo.
2. Framework preset should auto-detect **Next.js** — leave build command/output as default.
3. Deploy. Confirm the production URL loads correctly and matches the local build.
4. (Optional) Set a cleaner custom subdomain under Project Settings → Domains.

## Phase 15 — Final Submission Checklist

- [ ] GitHub repo is public and contains clean, working source (no `node_modules`, no secrets)
- [ ] Vercel URL is live and reflects the latest commit on `main`
- [ ] Article placeholder replaced with the real, author-written tutorial
- [ ] Dark/light toggle, TOC, copy buttons all verified working on the deployed URL (not just localhost)
- [ ] Reply to Keploy with: (1) GitHub repo link, (2) live Vercel link

---

# APPENDIX — Article Placeholder Template

Use this exact file as the starting point for `doc/tutorial.mdx`. Everything below the marker is where the author's already-written article goes.

```mdx
export const metadata = {
  title: 'Running a Keploy Go Quickstart: A Beginner's Walkthrough',
  description: 'A hands-on tutorial for recording and replaying API tests with Keploy on a Go app.',
};

<Callout type="info">
  **Placeholder callout** — replace with a real prerequisites note, e.g. "You'll need Go 1.21+, Docker, and 10 minutes."
</Callout>

## Introduction

_(Placeholder — replace with 2-3 sentences on what Keploy does and what the reader will accomplish by the end of this tutorial.)_

## Prerequisites

_(Placeholder list — Go version, Docker, the sample app you chose, e.g. Gin + Mongo.)_

## Step-by-step walkthrough

<Steps>
  <Step title="Clone the sample application">
    _(Placeholder — replace with the real `git clone` command and a sentence on what the sample app does.)_

    ```bash
    git clone https://example.com/sample-app.git
    cd sample-app
    ```
  </Step>

  <Step title="Install and start Keploy">
    _(Placeholder — replace with the real install command from your notes and a sentence on why this step matters.)_

    ```bash
    curl --silent -O -L https://example.com/keploy-install.sh
    ```
  </Step>

  <Step title="Record test cases">
    _(Placeholder — replace with `keploy record` usage and what's actually happening under the hood — Keploy intercepting traffic and generating test cases + mocks.)_

    ```bash
    keploy record -c "go run main.go"
    ```
  </Step>

  <Step title="Replay the recorded tests">
    _(Placeholder — replace with `keploy test` usage and what a passing run looks like.)_

    ```bash
    keploy test -c "go run main.go"
    ```
  </Step>
</Steps>

<Callout type="warning">
  **Placeholder callout** — replace with a real gotcha you hit (e.g. a port conflict, a Docker permission issue, or a confusing CLI flag).
</Callout>

## Wrap-up

_(Placeholder — replace with what the reader just learned and a link back to the Keploy docs or your GitHub repo.)_

{/* PASTE_ARTICLE_CONTENT_HERE — replace everything above this line with your real article once verified working end-to-end. */}
```
