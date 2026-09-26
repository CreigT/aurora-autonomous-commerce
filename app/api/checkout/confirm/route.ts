import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { emit } from "@/lib/events";
import { getStripe } from "@/lib/stripe";
import { applyUnlockCookie } from "@/lib/unlocks";

export async function GET(req: NextRequest) {
  const sessionId = req.nextUrl.searchParams.get("session") || "";
  const fallbackSlug = req.nextUrl.searchParams.get("slug") || "";
  const origin = config.url;
  const success = new URL(`/checkout?status=success&slug=${encodeURIComponent(fallbackSlug)}`, origin);

  if (!sessionId) {
    return NextResponse.redirect(success);
  }

  const stripe = getStripe();
  if (!stripe) {
    return NextResponse.redirect(success);
  }

  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid" && session.status !== "complete") {
      return NextResponse.redirect(new URL("/checkout?status=cancel", origin));
    }
    const slug = String(session.metadata?.slug || fallbackSlug);
    const res = NextResponse.redirect(success);
    applyUnlockCookie(res, slug ? [slug] : [], req.cookies.get("aurora_unlocks")?.value, origin.startsWith("https"));
    emit("checkout.completed", "sales-agent", { slug, mode: "stripe", sessionId });
    return res;
  } catch (err) {
    emit("stripe.error", "risk-agent", {
      message: err instanceof Error ? err.message : "confirm failed"
    });
    return NextResponse.redirect(new URL("/checkout?status=cancel", origin));
  }
}
