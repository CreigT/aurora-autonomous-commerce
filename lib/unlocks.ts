import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { config } from "./config";
import { getProducts } from "./products";

export const UNLOCK_COOKIE = "aurora_unlocks";

export function parseUnlocks(raw?: string) {
  return Array.from(
    new Set(
      (raw || "")
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    )
  );
}

export function readUnlocks() {
  return parseUnlocks(cookies().get(UNLOCK_COOKIE)?.value);
}

export function mergeUnlocks(existing: string[], slugs: string[]) {
  const allowed = new Set(getProducts().map((p) => p.slug));
  const set = new Set(existing.filter((s) => allowed.has(s)));
  slugs.forEach((slug) => {
    if (allowed.has(slug)) set.add(slug);
  });
  return Array.from(set);
}

export function applyUnlockCookie(
  res: NextResponse,
  slugs: string[],
  existingRaw?: string,
  secure = false
) {
  const value = mergeUnlocks(parseUnlocks(existingRaw), slugs).join(",");
  res.cookies.set(UNLOCK_COOKIE, value, {
    httpOnly: true,
    sameSite: "lax",
    secure,
    path: "/",
    maxAge: 60 * 60 * 24 * 365
  });
  return res;
}

export function isOwnerEmail(email: string) {
  return config.unlockEmails.includes(email.trim().toLowerCase());
}
