# AGENTS.md

> Guidance for AI coding agents working in this repository.

---

## Project Overview

**entropy-homepage** is the official website for **Entropy (熵序)**, a student-led technology and innovation community. It is a lightweight, multi-page static site built with Vite + React + TypeScript, featuring dark/light theming, bilingual i18n (zh/en), GSAP scroll animations, and Lenis smooth scrolling.

The site currently has three pages:
- **Home** (`/`) — Hero, about, features, sponsors, CTA sections
- **Team** (`/team.html`) — Member gallery with shuffle animation
- **Polaris** (`/polaris.html`) — A specific event/project page

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | React 18 |
| Language | TypeScript 5.9 |
| Build Tool | Vite 7 |
| UI Primitives | Radix UI (`radix-ui` unified package, namespace imports like `Toggle.Root`) |
| Animations | GSAP 3 (ScrollTrigger, ScrollToPlugin) + Lenis (smooth scroll) |
| Styles | Pure CSS (no Tailwind, no CSS-in-JS). CSS files are ported from the original static site. |
| Icons | Inline SVG via `src/components/icons.tsx` |
| Linting | ESLint 10 + `eslint-plugin-react-hooks` |
| Type Checking | TypeScript 5.9.5 (`tsc`) |
| Package Manager | npm |

---

## Project Structure

```
entropy-homepage/
├── public/                 # Static assets (not processed by Vite)
│   ├── assets/
│   │   ├── sponsors/       # Sponsor logos organized by category (cloud/community/web3)
│   │   │   ├── cloud/      # Each sponsor has dark + light SVG variants
│   │   │   ├── community/
│   │   │   └── web3/
│   │   └── team/           # Team member avatar photos
│   ├── sponsor.json        # Sponsor data (name, url, dark/light logo paths)
│   └── team.json           # Team member data (nickname, avatar, signature)
├── src/
│   ├── components/         # Shared UI components
│   │   ├── Button.tsx      # Reusable button (as <a> or <button>)
│   │   ├── CookieConsent.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── ErrorPage.tsx
│   │   ├── Footer.tsx      # Site footer with language switcher
│   │   ├── Nav.tsx         # Navigation bar with mobile hamburger menu
│   │   ├── ScrollTop.tsx   # Scroll-to-top button (uses GSAP ScrollToPlugin)
│   │   ├── Toast.tsx       # Toast notification component
│   │   └── icons.tsx       # All SVG icons as React components
│   ├── hooks/              # Custom React hooks
│   │   ├── useI18n.ts      # Language detection, switching, t() translation function
│   │   ├── useLenis.ts     # Lenis smooth scroll initialization
│   │   ├── useRevealAnimations.ts  # GSAP ScrollTrigger reveal animations
│   │   ├── useScrollState.ts       # Scroll direction & progress tracking
│   │   └── useTheme.ts     # Dark/light theme with localStorage + prefers-color-scheme
│   ├── i18n/               # Translation dictionaries
│   │   ├── cookie.ts       # Cookie consent translations
│   │   ├── error.ts        # Error page translations
│   │   ├── home.ts         # Home page translations
│   │   ├── polaris.ts      # Polaris page translations
│   │   └── team.ts         # Team page translations
│   ├── lib/                # Utility modules
│   │   ├── consent.ts      # Google Consent Mode v2 integration
│   │   └── scroll.ts       # Scroll utility helpers
│   ├── pages/              # Page-level components
│   │   ├── Home.tsx
│   │   ├── Polaris.tsx
│   │   └── Team.tsx
│   ├── styles/             # CSS stylesheets (pure CSS, one per page + shared)
│   │   ├── error.css
│   │   ├── home.css
│   │   ├── polaris.css
│   │   ├── shared.css
│   │   └── team.css
│   ├── main-home.tsx       # Entry point for Home page
│   ├── main-polaris.tsx    # Entry point for Polaris page
│   ├── main-team.tsx       # Entry point for Team page
│   └── main-404.tsx        # Entry point for 404 page
├── index.html              # Home page HTML shell
├── team.html               # Team page HTML shell
├── polaris.html            # Polaris page HTML shell
├── 404.html                # 404 page HTML shell
├── vite.config.ts          # Vite MPA build config (rollupOptions.input)
├── tsconfig.json           # TypeScript config (ESNext, strict)
└── package.json
```

---

## Architecture Patterns

### Multi-Page Application (MPA)

This is **not** a SPA. Each page has its own HTML file and entry point (`main-*.tsx`). Vite's `rollupOptions.input` explicitly lists all HTML entries. When adding a new page:
1. Create a new `.html` file at project root
2. Create a corresponding `src/main-*.tsx` entry
3. Add the HTML file to `rollupOptions.input` in `vite.config.ts`

### Theme System

- Theme state is managed via `data-theme` attribute on `<html>`, toggled by the `useTheme` hook.
- Themes: `dark` (default) and `light`. CSS uses `[data-theme="dark"]` / `[data-theme="light"]` selectors.
- Preference persists in `localStorage` key `theme`.
- All theme-aware CSS should use CSS custom properties defined in `shared.css`.

### Internationalization (i18n)

- No external i18n library. Translations are plain TypeScript dictionaries in `src/i18n/`.
- The `useI18n` hook detects language from URL `?lang=` param → `localStorage` → browser language → fallback `zh`.
- The `t(key)` function accepts dot-notation keys (e.g., `t("hero.title")`).
- When adding new translatable content, add entries to the corresponding `src/i18n/*.ts` file for **both** `zh` and `en`.

### Data Flow for Sponsors & Team

- Sponsor and team data are **static JSON** files in `public/` (`sponsor.json`, `team.json`).
- Fetched at runtime via `fetch()` in page components.
- Sponsor logos have `dark` and `light` SVG variants; the correct one is selected based on current theme.
- Team members are sorted with a deterministic shuffle (Fisher-Yates with date-based seed) for display.

### Animation System

- GSAP + ScrollTrigger for scroll-based reveal animations (`useRevealAnimations` hook).
- Lenis for smooth scrolling (`useLenis` hook). Must be initialized per-page.
- GSAP plugins must be registered before use: `gsap.registerPlugin(ScrollTrigger, ScrollToPlugin)`.
- Animation class names follow the pattern `.reveal-*` in CSS.

### CSS Conventions

- Pure CSS only. **No Tailwind, no CSS modules, no styled-components.**
- CSS files are imported directly in their corresponding entry points.
- Design tokens (colors, spacing) are defined as CSS custom properties in `shared.css`.
- Theme-specific overrides use `[data-theme="dark"]` / `[data-theme="light"]` attribute selectors.
- Responsive breakpoints use standard media queries.

---

## Development Commands

```bash
# Install dependencies
npm install

# Start dev server (hot reload)
npm run dev

# Type check
npm run lint:tsc

# ESLint
npm run lint:eslint

# Run all lints (type check + eslint)
npm run lint

# Production build
npm run build

# Preview production build locally
npm run preview
```

---

## CI/CD

- **Platform**: GitHub Actions (`.github/workflows/ci.yml`)
- **Triggers**: Push to `main` and all Pull Requests targeting `main`
- **Pipeline steps**: `npm ci` → `npm run lint` → `npm run build`
- **Node.js version**: 24
- Additional checks on PRs: CodeRabbit, CodeQL (must all pass before merge)

---

## Code Style

- **No semicolons** at end of statements (the codebase consistently omits them).
- **Single quotes** for strings.
- **2-space indentation**.
- **Trailing commas** in multiline structures.
- **Arrow functions** preferred for components and callbacks.
- TypeScript `strict` mode is enabled — all types must be explicit where inference is insufficient.
- React components use named function exports: `export default function PageName() { ... }`.
- Hooks follow standard naming: `useXxx`.
- ESLint enforces React Hooks rules (`react-hooks/react-hooks`, `react-hooks/exhaustive-deps`).

---

## Organization Rules (熵序 Code Contribution Policy)

These rules are **mandatory** for all contributors (human and AI-assisted) in this repository.

### AI-Generated Code Policy

Most of the code in _entropy 熵序_ is generated through AI. We do not prohibit you from using any AI to generate, edit, or delete existing code. However, we require the following:

1. **Manual Testing Required**: After AI generates code, you **must** manually test it — run the full business flow of the affected feature end-to-end, and confirm there are no visual glitches, broken interactions, or unexpected behavior before committing.
2. **No Blind Commits**: Never commit AI-generated code without verifying it works correctly in the browser.

### Code Comment Style

> **Before asking AI to modify program files, always include this instruction:**
>
> "请尽量不要添加连续多行的注释，禁止使用 `======xxx======` 之类格式的分割注释；仅在必要情况下使用 `//` 双斜杠简要一句话注释即可。"

- **No multi-line comment blocks** — avoid adding consecutive lines of comments.
- **No decorative divider comments** — patterns like `// ====== Section Name ======` are forbidden.
- **Single-line `//` comments only** — and only when truly necessary for clarity. Keep them brief (one sentence).
- The code should speak for itself; excessive comments make it indistinguishable from raw vibe-coded output.

### Git Commit Convention

- Follow the **[Conventional Commits](https://www.conventionalcommits.org/)** specification.
- Commit messages **must be written in fluent English**.
- Format: `<type>(<scope>): <description>` (e.g., `feat(home): add sponsor carousel`, `fix(team): correct avatar loading on Safari`).
- Common types: `feat`, `fix`, `refactor`, `style`, `docs`, `chore`, `perf`, `ci`.
- If unsure how to write a commit message, consult your AI assistant.

### Branch & PR Workflow

1. **Never commit unreviewed code directly to `main`/`master`** (unless explicitly exempted for trivial changes).
2. Create a feature/fix branch (`feat/xxx`, `fix/xxx`, etc.) or fork to your personal repository.
3. Commit your changes on that branch.
4. Open a **Pull Request** on GitHub targeting `main`.
5. The PR must pass **all checks** before merge:
   - CodeRabbit review
   - CodeQL analysis
   - CI build (lint + build must be green)
6. A repository admin or primary contributor must **approve the review** before merging.

### AI Agent Restrictions

- **Do NOT let AI agents commit on your behalf.** You are responsible for every commit.
- **AI accounts must NOT appear** in the collaborator list or author/contributor fields of any commit.

---

## Key Files Quick Reference

| Purpose | File |
|---|---|
| Vite MPA config | `vite.config.ts` |
| TypeScript config | `tsconfig.json` |
| CI pipeline | `.github/workflows/ci.yml` |
| Sponsor data | `public/sponsor.json` |
| Team member data | `public/team.json` |
| Theme & shared CSS | `src/styles/shared.css` |
| i18n hook | `src/hooks/useI18n.ts` |
| Theme hook | `src/hooks/useTheme.ts` |
| Animation hook | `src/hooks/useRevealAnimations.ts` |
| Smooth scroll hook | `src/hooks/useLenis.ts` |
| Google consent | `src/lib/consent.ts` |
| Navigation component | `src/components/Nav.tsx` |
| Footer component | `src/components/Footer.tsx` |
