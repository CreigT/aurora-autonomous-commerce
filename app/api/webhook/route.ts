import { NextRequest, NextResponse } from "next/server";
import { config } from "@/lib/config";
import { emit } from "@/lib/events";
import { getStripe } from "@/lib/stripe";

export async function POST(req: NextRequest) {
  const stripe = getStripe();
  if (!stripe || !config.stripeWebhook) {
    return NextResponse.json({ received: true, mode: "demo" });
  }

  const raw = await req.text();
  const signature = req.headers.get("stripe-signature") || "";

  try {
    const event = stripe.webhooks.constructEvent(raw, signature, config.stripeWebhook);
    emit("stripe.event", "accounts-receivable-agent", { type: event.type, id: event.id });

    if (event.type === "checkout.session.completed") {
      const session = event.data.object as { metadata?: { slug?: string }; id: string };
      emit("order.paid", "sales-agent", {
        slug: session.metadata?.slug,
        sessionId: session.id
      });
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    emit("stripe.error", "risk-agent", {
      message: err instanceof Error ? err.message : "webhook failed"
    });
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }
}
