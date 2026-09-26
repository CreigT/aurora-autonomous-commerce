import { NextRequest, NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";
import { getProduct } from "@/lib/products";
import { emit } from "@/lib/events";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body: unknown = await req.json().catch(() => null);
  const slug =
    body && typeof body === "object" && "slug" in body && typeof body.slug === "string"
      ? body.slug
      : "";
  const product = getProduct(slug);

  if (!product) {
    return NextResponse.json({ error: "Unknown product" }, { status: 404 });
  }

  // Never trust a caller-supplied Origin to construct payment redirects.
  // The canonical deployment URL must be configured on the server.
  const origin = config.url.replace(/\/$/, "");
  if (!/^https?:\/\/[^/]+$/.test(origin)) {
    return NextResponse.json({ error: "Store URL is not configured" }, { status: 503 });
  }

  if (!config.demoMode && !isLivePayments()) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 });
  }

  emit("checkout.started", "sales-agent", {
    slug,
    priceCents: product.priceCents,
    mode: isLivePayments() ? "stripe" : "demo"
  });

  if (config.demoMode) {
    const url = `${origin}/checkout?status=success&slug=${encodeURIComponent(slug)}`;
    const res = NextResponse.json({ url, mode: "demo" });
    const existing = req.cookies.get("aurora_unlocks")?.value || "";
    const set = new Set(existing.split(",").filter(Boolean));
    set.add(slug);
    res.cookies.set("aurora_unlocks", Array.from(set).join(","), {
      httpOnly: true,
      sameSite: "lax",
      secure: origin.startsWith("https://"),
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    emit("checkout.completed", "sales-agent", { slug, mode: "demo" });
    return res;
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Payments are not configured" }, { status: 503 });
  }

  try {
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      success_url: `${origin}/checkout?status=success&slug=${encodeURIComponent(slug)}&session={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/checkout?status=cancel&slug=${encodeURIComponent(slug)}`,
      line_items: [{
        quantity: 1,
        price_data: {
          currency: config.currency,
          unit_amount: product.priceCents,
          product_data: { name: product.name, description: product.summary }
        }
      }],
      metadata: { slug, product: product.name }
    });
    if (!session.url) {
      return NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
    }
    return NextResponse.json({ url: session.url, mode: "stripe" });
  } catch {
    return NextResponse.json({ error: "Checkout unavailable" }, { status: 502 });
  }
}
