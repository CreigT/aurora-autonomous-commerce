import Link from "next/link";
import { config } from "@/lib/config";

export function Footer() {
  return (
    <footer className="footer">
      <div>
        {config.storeName} is owned by {config.ownerName}. Agents operate the store.
        Human override: {config.supportEmail}
      </div>
      <div>
        <Link href="/legal">Refunds & terms</Link>
        {" · "}
        <Link href="/api/health">Health</Link>
      </div>
    </footer>
  );
}
