import { NextResponse } from "next/server";
import { getProducts } from "@/lib/products";
import { emit } from "@/lib/events";

export function GET() {
  emit("catalog.listed", "marketplace-agent", { count: getProducts().length });
  return NextResponse.json({ products: getProducts() });
}
