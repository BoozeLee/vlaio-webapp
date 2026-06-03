# VLAIO Innovation Demo

A Next.js demo site for presenting NeuroForge and TrendForge concepts in a VLAIO-style innovation context. The app is intentionally small: it focuses on a clear public-facing narrative, responsive UI, and Solana/agent integrations that can be explained quickly during portfolio reviews.

## What It Demonstrates

- Next.js App Router project structure with TypeScript.
- Public innovation landing pages for AI agent concepts.
- Wallet and Solana integration dependencies prepared for interactive demos.
- Clean deployment path for Vercel-hosted portfolio demos.
- Concise project scope suitable for internship and job applications.

## Stack

- **Framework:** Next.js, React, TypeScript
- **Styling:** Tailwind CSS
- **Blockchain integration:** `@solana/web3.js`, SPL Token, wallet adapter packages
- **HTTP:** Axios
- **Quality gates:** ESLint and production build

## Project Structure

```text
app/
├── page.tsx              # Main public page
├── vlaio/page.tsx        # VLAIO-specific demo route
├── layout.tsx            # App shell
└── globals.css           # Global styles

src/
├── app/page.tsx          # Alternate page implementation
├── components/vlaio/     # Demo components
└── lib/api.ts            # API helper code
```

## Local Development

```bash
npm install
npm run dev
```

Open:

```text
http://localhost:3000
```

## Validation

Run these before making the repository public-facing or deploying:

```bash
npm run lint
npm run build
```

## Deployment

This repository is intended for Vercel deployment. Keep environment-specific secrets in Vercel project settings or local `.env.local`; do not commit secrets.

## Status

Portfolio demo. This repo is public because it is small, readable, and focused on explaining applied AI/agent concepts to non-specialist reviewers.
