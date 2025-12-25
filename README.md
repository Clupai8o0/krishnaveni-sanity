# Krishnaveni School Website
Multilingual marketing site for Krishnaveni School, powered by Next.js and a Sanity CMS backend.

## What it does
- Serves localized pages (`/en`, `/hi`, `/te`) with middleware that redirects based on the browser’s language.
- Renders marketing sections (hero, feature cards, galleries, testimonials, contact, FAQs, etc.) sourced from Sanity content.
- Injects navigation, language switch banner, CTA strip, and footer per language across all pages.
- Falls back to bundled sample content when Sanity usage is disabled for quick local previews.

## Key features
- **App Router + i18n**: Language-prefixed routes with Accept-Language redirect and an in-app language switch banner.
- **CMS-driven layout**: Navigation and CTA documents fetched per language; shared layout wraps every page.
- **Section renderer**: Maps Sanity section types (hero, feature cards, introduction, bento gallery, testimonials, contact, two-/center layouts, FAQ, vision/mission, unique cards) to React components.
- **SEO helpers**: GROQ-powered metadata fetcher; robots configuration blocks test routes.
- **Media and motion**: Hero video dialog (motion), video testimonials, responsive imagery using local assets.
- **Optional analytics**: Google Analytics injected only when production flag and GA ID are set.

## Tech stack
- Next.js 15, React 19, TypeScript (App Router)
- Tailwind CSS v4, tw-animate-css, lucide-react icons, motion/GSAP helpers
- Sanity v3 with Vision, Table, document internationalization, next-sanity client
- Tooling: npm workspaces, concurrently, Next lint, ESLint (studio)

## Architecture overview
Next.js renders language-scoped routes and fetches structured content from Sanity. When `NEXT_PUBLIC_USE_SANITY` is not set to `"true"`, local sample data is used instead.

```
[Browser] -- lang-prefixed request --> [Next.js App Router]
         -- GROQ via next-sanity --> [Sanity dataset (jzbduz09/production)]
                        \--> [Local sample content if NEXT_PUBLIC_USE_SANITY!="true"]
```

## Getting started (local)

### Prerequisites
- Node.js and npm (npm 7+ for workspaces)

### Install
```bash
npm install          # run from repo root; installs workspaces
```

### Environment variables
Create `.env.local` at the repo root or inside `client/` with:
```
NEXT_PUBLIC_SANITY_PROJECT_ID=your-project-id      # required when using live Sanity data
NEXT_PUBLIC_SANITY_DATASET=production              # or your dataset
NEXT_PUBLIC_USE_SANITY=true                        # set to "true" to fetch from Sanity; otherwise uses sample data
NEXT_PUBLIC_GA_ID=G-XXXXXXX                        # optional; enables GA when set
NEXT_PUBLIC_NODE_ENV=production                    # optional; controls GA injection
```
Sanity CLI uses the project/dataset in `studio/sanity.config.ts` (`projectId: jzbduz09`, `dataset: production`).

### Run
```bash
npm run dev                         # start client + studio together
npm run dev --workspace=client      # start Next.js app
npm run dev --workspace=studio      # start Sanity Studio
```

### Build and serve
```bash
npm run build --workspace=client
npm run start --workspace=client    # serve built Next.js app

npm run build --workspace=studio
npm run deploy --workspace=studio   # deploy Studio (Sanity hosting)
npm run deploy-graphql --workspace=studio
```

## Usage
- Visit `http://localhost:3000/`; middleware redirects to your preferred language (`/en`, `/hi`, or `/te`).
- Pages implemented: home, about, academics, admissions, campus-life, contact, parents. News/test routes currently render an “Under Construction” placeholder.
- Manage content in Sanity Studio:
  - Documents: `page` (with section array), `navigation`, `cta`, `seo`, `ctaBtns`, and all section object types.
  - Languages: English, Hindi, Telugu via document internationalization.
- Layout (`client/app/[lang]/layout.tsx`) injects navigation, CTA, footer, and language banner per language.

## Testing / Quality
- Lint the Next.js app:
```bash
npm run lint --workspace=client
```
Studio ships with `@sanity/eslint-config-studio`; no automated tests are defined in this repo.

## Deployment
- Frontend is deployed on Vercel at https://krishnavenischool.co.in.
- Build locally with `npm run build --workspace=client`; serve with `npm run start --workspace=client` or deploy via Vercel workflow.
- Sanity Studio can be deployed with `npm run deploy --workspace=studio`; GraphQL API deploy available via `npm run deploy-graphql --workspace=studio`.
- No Docker or CI configuration is present in the repository.

## Project status / Roadmap
- Live on Vercel; news routes are under construction.
- Next step: build out the remaining pages/routes with full content (replacing “Under Construction” stubs).

## License
- Root `package.json` lists ISC; no standalone `LICENSE` file is included.
