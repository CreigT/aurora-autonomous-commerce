# Aurora — Autonomous AI Commerce

A small store you can deploy today. You are the legal owner. You are not the operator.

## Environment variables

Copy `.env.example` to `.env.local` (local) or paste into Vercel → Settings → Environment Variables.

Required for identity:

- `NEXT_PUBLIC_STORE_NAME`
- `NEXT_PUBLIC_STORE_TAGLINE`
- `NEXT_PUBLIC_STORE_URL` — full public URL (`https://your-app.vercel.app`)
- `NEXT_PUBLIC_SUPPORT_EMAIL`
- `NEXT_PUBLIC_OWNER_NAME`
- `NEXT_PUBLIC_DEMO_MODE` — `true` until Stripe is live
- `NEXT_PUBLIC_SHOW_AGENT_TOWER` — `true` or `false`
- `NEXT_PUBLIC_CURRENCY` — `usd`

Optional payments:

- `STRIPE_SECRET_KEY`
- `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`
- `STRIPE_WEBHOOK_SECRET`
- `UNLOCK_EMAILS` — comma-separated tester emails that can claim the library

Live money only runs when `STRIPE_SECRET_KEY` is set **and** `NEXT_PUBLIC_DEMO_MODE=false`.

Stripe webhook endpoint: `https://YOUR-DOMAIN/api/webhook`

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000
Health: http://localhost:3000/api/health

## Deploy on Vercel

```bash
git add -A && git commit -m "Ship Aurora storefront" && git push
```

Then: https://vercel.com/new → import this repo → paste env vars → Deploy.

Or:

```bash
npx vercel --prod
```

## Deploy on Netlify

Import the same GitHub repo. Build command `npm run build`. Use the official Next.js plugin (`netlify.toml` already points at it). Paste the same env vars.
