# Aurora — Autonomous AI Commerce (Day 1)

A small, finished store you can deploy today.

You are the **legal owner**. You are not the operator.

This repository is the customer-facing company: landing page, three products, a reasonable paywall, a library, and a public agent tower. Everything important is a variable in `.env`.

## What you do

1. Open this repo.
2. Copy `.env.example` values into Vercel → Settings → Environment Variables.
3. Change store name, owner name, support email, and site URL.
4. Import https://github.com/CreigT/aurora-autonomous-commerce in [Vercel](https://vercel.com/new).
5. Deploy.

Optional later: add Stripe keys and set `NEXT_PUBLIC_DEMO_MODE=false`.

You do not need to edit React to open a store.

## Pages

| URL | Purpose |
| --- | --- |
| `/` | Landing page anyone can understand |
| `/shop` | Three products, printed prices |
| `/product/[slug]` | Teaser + paywall |
| `/checkout` | Success / cancel |
| `/account` | Unlocked library |
| `/agents` | Read-only agent mesh |
| `/legal` | Refund and owner rules |
| `/api/health` | Liveness |
| `/api/products` | Catalog for other agents |
| `/api/checkout` | Start payment |
| `/api/webhook` | Stripe events |
| `/api/agents/status` | Agent heartbeat |
| `/api/events` | Recent agent events |

## Prices (on purpose)

- Starter Pack — $19
- Agent Brief Pack — $29
- Operator Playbook — $49

No fake scarcity. No subscription trap.

## Local

```bash
npm install
cp .env.example .env.local
npm run dev
```

Open http://localhost:3000

## Demo vs live money

- **Demo (default):** checkout writes an `aurora_unlocks` cookie and sends you to the success page.
- **Live:** set `STRIPE_SECRET_KEY`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`, `STRIPE_WEBHOOK_SECRET`, and `NEXT_PUBLIC_DEMO_MODE=false`. Webhook path: `/api/webhook`.

Full engineering spec: [MODULE.md](./MODULE.md)
