import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        {config.storeName} is owned by {config.ownerName}. Agents operate the store.
        Human override: {config.supportEmail}
      </div>
      <div className="footer-links">
        <Link href="/shop">Shop</Link>
        <Link href="/legal">Refunds & terms</Link>
        <Link href="/account">Library</Link>
        <Link href="/api/health">Health</Link>
      </div>
    </footer>
  );
}
