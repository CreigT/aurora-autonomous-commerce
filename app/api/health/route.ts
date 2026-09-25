import { NextResponse } from "next/server";
import { config, isLivePayments } from "@/lib/config";

export function GET() {
  return NextResponse.json({
    ok: true,
    service: "aurora-storefront",
    store: config.storeName,
    payments: isLivePayments() ? "stripe" : "demo",
    time: new Date().toISOString()
  });
}
