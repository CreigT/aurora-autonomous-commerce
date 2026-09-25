# Day 1 Module — Public Storefront & Conversion Paywall

Date: 2026-09-25
Code name: Aurora Storefront
Status: Production-ready for Vercel

See README.md for deploy steps. This file is the engineering contract.

1. Module Name: Public Storefront & Conversion Paywall (`aurora-storefront`)
2. Purpose: A stranger can understand the store, pay once, and leave with an unlock. Other agents consume public APIs.
3. Business Value: Revenue can start on day one. Owner is not the operator.
4. Agent Responsibilities: Sales starts checkout. Marketplace publishes catalog. Pricing holds $19/$29/$49. Content owns copy. Support points at /legal. Governance blocks dark patterns. Risk keeps demo-default. AR consumes Stripe webhooks. Monitoring serves /api/health. CEO watches.
5. Inputs: env vars, data/products.json, data/agents.json, buyer click, optional Stripe webhook.
6. Outputs: pages /, /shop, /product/:slug, /checkout, /account, /agents, /legal plus JSON APIs and events catalog.listed, checkout.started, checkout.completed, order.paid.
7. APIs: Stripe Checkout + Webhooks outbound. Inbound GET /api/products, POST /api/checkout, POST /api/webhook, GET /api/agents/status, GET /api/events, GET /api/health.
8. MCP Tools: none required today.
9. Databases: none. JSON catalog. Cookie unlocks. In-process event ring.
10. Memory: 200-event ring, repo JSON, future email entitlements.
11. Security: secrets server-side, HttpOnly cookie, webhook signatures, no money-moving admin UI, demo default.
12. Failure Recovery: unknown slug 404; Stripe down does not double charge; bad webhook 400; failed deploy keeps previous Vercel release.
13. Agent communications: events only. No agent reaches into another agent's internals.
14. Workflow: Visitor → landing → shop → product → POST /api/checkout → demo cookie or Stripe → library. Owner → env vars → git push → Vercel.
15. Data flow: products.json → pages/API; env → config; checkout → cookie/Stripe; webhook → order.paid; agents.json → tower.
16. Decision logic: live payments only if secret exists AND DEMO_MODE=false. Price changes require Governance (file-based today).
17. Escalation: chargebacks to Risk + owner email; post-download refunds need owner; health fail 5 min to owner; subscription-sounding copy blocked.
18. KPIs: landing	o shop, shop	o product, product	o checkout, checkout success, demo vs live, deploy time, support volume, refund rate.
19. Logging: structured events, no card numbers, no secrets.
20. Audit: events + git history of products.json + Vercel deploys + Stripe dashboard.
21. Compliance: printed prices, no negative-option billing, refund page, owner named in footer, minimal PII.
22. Expansion: email entitlements, signed downloads, affiliates, multi-currency.
23. Risks: demo cookies are forgeable; event ring is not durable across serverless isolates; demo sales are not revenue.
24. Testing: build, health, 404 slug, demo cookie, demo flag wins over keys, webhook 400.
25. Ready: modular, API-first, evented, demo-safe, health, legal, env-only. Not ready: file fulfillment, durable orders.
26. Stack: Next.js 14, React 18, TypeScript, Stripe, Vercel, JSON catalog.
27. Cost: Vercel Hobby $0, Stripe fees only on live charges, no LLM cost in this module.
28. Deploy: import GitHub repo in Vercel, paste .env.example, deploy, hit /api/health, place a demo order.
29. Maintenance: edit JSON or env, push, roll back Vercel if needed.
30. Further automation: content rewrites, price tests in $9–$49, support from /legal, SEO from product JSON — all behind test deploys.

Completed today: storefront + paywall + agent APIs + GitHub repo.
Dependencies: none (Day 1).
Tomorrow: Digital Fulfillment & Entitlement Agent.
Platform completion: 8%.
