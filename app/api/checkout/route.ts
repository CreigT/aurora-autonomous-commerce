import { NextRequest, NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";
import { getProduct, getProducts } from "@/lib/products";
import { emit } from "@/lib/events";
import { getStripe } from "@/lib/stripe";
import { applyUnlockCookie, isOwnerEmail } from "@/lib/unlocks";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({} as Record<string, unknown>));
  const action = String(body.action || "buy");
  const origin = req.headers.get("origin") || config.url;
  const secure = origin.startsWith("https");

  if (action === "claim") {
    const email = String(body.email || "");
    if (!isOwnerEmail(email)) {
      return NextResponse.json({ error: "Email is not on the unlock list" }, { status: 403 });
    }
    const slugs = getProducts().map((p) => p.slug);
    const res = NextResponse.json({ ok: true, mode: "claim", slugs });
    applyUnlockCookie(res, slugs, req.cookies.get("aurora_unlocks")?.value, secure);
    emit("library.claimed", "sales-agent", { email });
    return res;
  }

  const slug = String(body.slug || "");
  const product = getProduct(slug);

  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  }

  emit("checkout.started", "sales-agent", {
    slug,
    priceCents: product.priceCents,
    mode: isLivePayments() ? "stripe" : "demo"
  });

  if (!isLivePayments()) {
    const url = `${origin}/checkout?status=success&slug=${encodeURIComponent(slug)}`;
    const res = NextResponse.json({ url, mode: "demo" });
    applyUnlockCookie(res, [slug], req.cookies.get("aurora_unlocks")?.value, secure);
    emit("checkout.completed", "sales-agent", { slug, mode: "demo" });
    return res;
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/checkout?status=success&slug=${encodeURIComponent(slug)}&session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?status=cancel&slug=${encodeURIComponent(slug)}`,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: config.currency,
          unit_amount: product.priceCents,
          product_data: { name: product.name, description: product.summary }
        }
      }
    ],
    metadata: { slug, product: product.name }
  });

  return NextResponse.json({ url: session.url, mode: "stripe" });
}
