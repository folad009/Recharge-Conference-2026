# Recharge Conference 2026

A modern React + Vite landing page for **Recharge Conference 2026**.  
The site presents event information in a clear, single-page format, including the hero section, conference details, speakers, schedule, FAQ, and registration call-to-actions.

## Tech Stack

- React 19
- TypeScript
- Vite 6
- Tailwind CSS 4
- Motion (`motion`)
- Lucide React icons
- [Convex](https://convex.dev) (reactive backend for registrations + live attendee count)

## Features

- Bold, responsive hero section with countdown timer
- Event overview and conference messaging
- Speakers showcase
- Filterable schedule/itinerary experience
- FAQ section for common attendee questions
- Responsive navigation and mobile-friendly layout

## Getting Started

### Prerequisites

- Node.js 18+ (recommended)
- [pnpm](https://pnpm.io/installation)

### Installation

```bash
pnpm install
```

### One-time: Provision the Convex backend

The registration form is backed by Convex. The first time you set up the
project, run:

```bash
pnpm exec convex dev
```

This logs you in, provisions a dev deployment, writes `VITE_CONVEX_URL`
into `.env.local`, and generates `convex/_generated/`. Leave it running
in a second terminal — it watches `convex/` and pushes changes live.

### Run Development Server

```bash
pnpm dev
```

The app runs on:

- `http://localhost:3000`

## Viewing registrations (dashboard only)

Registration data is stored in Convex (`registrations` table). There is no admin page on the website—use the Convex dashboard or the CSV export script below.

### Open the dashboard

```bash
pnpm exec convex dashboard
```

Or go to [dashboard.convex.dev](https://dashboard.convex.dev), open your project, then **Data** → **`registrations`**.

You can browse, sort, and inspect each row (name, email, phone, attendee type, childcare, etc.). The live attendee count on the site comes from the same table but does not expose individual records.

### Export to CSV

From the project root (with Convex linked via `pnpm exec convex dev`):

```bash
# Dev deployment (default)
pnpm run export:registrations

# Production
pnpm run export:registrations -- --prod

# Custom path
pnpm run export:registrations -- --output ~/Downloads/recharge-registrations.csv
```

CSV files are written to `exports/registrations-YYYY-MM-DD.csv` by default. That folder is gitignored because it contains attendee PII.

**Columns:** `id`, `first_name`, `last_name`, `email`, `phone`, `organization`, `attendee_type`, `department`, `childcare`, `registered_at` (ISO timestamp).

To preview rows in the terminal without CSV:

```bash
pnpm exec convex data registrations
```

## Available Scripts

- `pnpm dev` - Start local development server
- `pnpm build` - Create a production build
- `pnpm preview` - Preview the production build locally
- `pnpm lint` - Run TypeScript type-check (`tsc --noEmit`)
- `pnpm clean` - Remove build output (`dist`)
- `pnpm run export:registrations` - Download all registrations as CSV (see above)
- `pnpm run convex:deploy` - Push `convex/` to production (required before Vercel works)

## Project Structure

```text
.
├── index.html
├── package.json
├── convex
│   ├── schema.ts          # registrations table + indexes
│   └── registrations.ts   # `register` mutation + live `count` query
├── src
│   ├── App.tsx
│   └── main.tsx
├── tsconfig.json
└── vite.config.ts
```

## Environment Variables

| Variable | Where | Purpose |
|----------|--------|---------|
| `VITE_CONVEX_URL` | `.env.local` (local) or Vercel env (production) | Convex deployment URL for registrations |
| `GEMINI_API_KEY` | `.env` (optional) | Gemini API, if used |

Local Convex URL is written automatically when you run `pnpm exec convex dev`.

For optional Gemini usage, create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_key_here
```

## Deploying to Vercel

Vercel hosts the **frontend only**. Convex runs on [Convex Cloud](https://convex.dev)—a separate backend. The live site talks to Convex from the visitor’s browser using `VITE_CONVEX_URL` (set in Vercel and baked in at build time).

```text
User browser
    │
    ├─► Vercel          →  React app (static files from `pnpm build`)
    │
    └─► Convex Cloud    →  `registrations` table, register mutation, count query
```

### 1. Deploy Convex to production

Whenever you change files under `convex/`, push them to your **production** deployment:

```bash
pnpm run convex:deploy
```

Or:

```bash
pnpm exec convex deploy
```

Confirm when prompted (first deploy pushes schema + functions to prod).

**Critical:** `pnpm exec convex dev` only updates your **local/dev** deployment. The Vercel site uses **production** Convex. If you skip `convex deploy`, the live site will error on `registrations:count` and registration will fail.

After deploy, the CLI prints your production URL (e.g. `https://your-project-name.convex.cloud`). Set that as `VITE_CONVEX_URL` on Vercel.

### 2. Connect the repo on Vercel

1. Import this repository in the [Vercel dashboard](https://vercel.com).
2. Use these build settings:

   | Setting | Value |
   |---------|--------|
   | Install Command | `pnpm install` |
   | Build Command | `pnpm build` |
   | Output Directory | `dist` |

3. Deploy once (registration may not work until step 3).

### 3. Set environment variables on Vercel

In your Vercel project → **Settings** → **Environment Variables**, add:

| Name | Value | Environments |
|------|--------|----------------|
| `VITE_CONVEX_URL` | Production Convex URL from `convex deploy` | **Production** |

Redeploy after saving so the new value is included in the build.

**Important:** Use the **production** Convex URL, not the dev URL from `.env.local`. If `VITE_CONVEX_URL` is missing, the registration form shows success but does not save data.

Optional for **Preview** deployments (PR branches):

- Use the same production URL if previews should hit real data, or
- Use your dev Convex URL if previews should only write to a test database.

### 4. Verify production

1. Open your Vercel URL and submit a test registration.
2. In the Convex dashboard, switch to the **production** deployment and check **Data** → `registrations`.
3. Export production CSV:

   ```bash
   pnpm run export:registrations -- --prod
   ```

### Local vs production

| | Local (`pnpm dev`) | Vercel (live site) |
|---|-------------------|---------------------|
| Frontend | Vite dev server | Vercel CDN |
| Backend command | `pnpm exec convex dev` | `pnpm exec convex deploy` |
| Convex deployment | Dev (`.env.local`) | Production |
| `VITE_CONVEX_URL` | Auto in `.env.local` | Set in Vercel dashboard |

### Updating the live site

- **Frontend changes** (`src/`, assets): push to git; Vercel rebuilds automatically.
- **Backend changes** (`convex/`): run `pnpm run convex:deploy`, then redeploy Vercel only if you also changed frontend env or code that depends on new API shapes.

### Troubleshooting

**`[CONVEX Q(registrations:count)] Server Error` in the browser console**

The frontend is connected to production Convex (`VITE_CONVEX_URL` is set), but production does not have your latest backend code yet. Fix:

```bash
pnpm run convex:deploy
```

Then hard-refresh the Vercel site. Verify in the dashboard (production deployment) → **Functions** that `registrations:count` and `registrations:register` exist.

**Registration form “succeeds” but no data appears**

- `VITE_CONVEX_URL` is missing on Vercel → add it and redeploy, or
- Form is pointed at the wrong deployment → production URL must match `convex deploy` output.

## Build for Production

Build locally to preview the production bundle:

```bash
pnpm build
pnpm preview
```

The output is generated in the `dist/` directory (same folder Vercel publishes).

## License

This project is private and intended for Recharge Conference 2026 web experience development.
