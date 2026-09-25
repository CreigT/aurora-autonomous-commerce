import { NextRequest, NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";
import { getProduct } from "@/lib/products";
import { emit } from "@/lib/events";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const body = await req.json().catch(() => ({}));
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

  const origin = req.headers.get("origin") || config.url;

  if (!isLivePayments()) {
    const url = `${origin}/checkout?status=success&slug=${encodeURIComponent(slug)}`;
    const res = NextResponse.json({ url, mode: "demo" });
    const existing = req.cookies.get("aurora_unlocks")?.value || "";
    const set = new Set(existing.split(",").filter(Boolean));
    set.add(slug);
    res.cookies.set("aurora_unlocks", Array.from(set).join(","), {
      httpOnly: true,
      sameSite: "lax",
      secure: origin.startsWith("https"),
      path: "/",
      maxAge: 60 * 60 * 24 * 365
    });
    emit("checkout.completed", "sales-agent", { slug, mode: "demo" });
    return res;
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    success_url: `${origin}/checkout?status=success&slug=${slug}&session={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origin}/checkout?status=cancel&slug=${slug}`,
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
