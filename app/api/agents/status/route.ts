import { NextResponse } from "next/server";
import agents from "@/data/agents.json";

export function GET() {
  return NextResponse.json(agents);
}
