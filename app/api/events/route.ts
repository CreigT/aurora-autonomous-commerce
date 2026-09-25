import { NextResponse } from "next/server";
import { recent } from "@/lib/events";

export function GET() {
  return NextResponse.json({ events: recent() });
}
