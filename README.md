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
- npm or pnpm

### Installation

```bash
npm install
```

Or with pnpm:

```bash
pnpm install
```

### One-time: Provision the Convex backend

The registration form is backed by Convex. The first time you set up the
project, run:

```bash
npx convex dev
```

This logs you in, provisions a dev deployment, writes `VITE_CONVEX_URL`
into `.env.local`, and generates `convex/_generated/`. Leave it running
in a second terminal — it watches `convex/` and pushes changes live.

### Run Development Server

```bash
npm run dev
```

The app runs on:

- `http://localhost:3000`

## Available Scripts

- `npm run dev` - Start local development server
- `npm run build` - Create a production build
- `npm run preview` - Preview the production build locally
- `npm run lint` - Run TypeScript type-check (`tsc --noEmit`)
- `npm run clean` - Remove build output (`dist`)

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

The Vite config reads `GEMINI_API_KEY` from your environment and exposes it at build time.

If needed, create a `.env` file in the project root:

```env
GEMINI_API_KEY=your_key_here
```

If you are not using Gemini features in your implementation, you can leave this unset.

## Build for Production

```bash
npm run build
```

The output is generated in the `dist/` directory.

## License

This project is private and intended for Recharge Conference 2026 web experience development.

