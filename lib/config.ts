export const config = {
  storeName: process.env.NEXT_PUBLIC_STORE_NAME || "Aurora",
  tagline:
    process.env.NEXT_PUBLIC_STORE_TAGLINE || "A company that never sleeps.",
  url: process.env.NEXT_PUBLIC_STORE_URL || "http://localhost:3000",
  supportEmail: process.env.NEXT_PUBLIC_SUPPORT_EMAIL || "owner@example.com",
  ownerName: process.env.NEXT_PUBLIC_OWNER_NAME || "Legal Owner",
  demoMode: (process.env.NEXT_PUBLIC_DEMO_MODE || "true") === "true",
  showAgentTower: (process.env.NEXT_PUBLIC_SHOW_AGENT_TOWER || "true") === "true",
  currency: (process.env.NEXT_PUBLIC_CURRENCY || "usd").toLowerCase(),
  unlockEmails: (process.env.UNLOCK_EMAILS || "")
    .split(",")
    .map((s) => s.trim().toLowerCase())
    .filter(Boolean),
  stripeSecret: process.env.STRIPE_SECRET_KEY || "",
  stripeWebhook: process.env.STRIPE_WEBHOOK_SECRET || "",
  stripePublishable: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || ""
};

export function isLivePayments() {
  return Boolean(config.stripeSecret) && !config.demoMode;
}
