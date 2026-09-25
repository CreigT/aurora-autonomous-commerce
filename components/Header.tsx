import Link from "next/link";
import { config } from "@/lib/config";

export function Header() {
  return (
    <header className="topbar">
      <Link className="brand" href="/">
        <b>{config.storeName}</b>
        <span>autonomous</span>
      </Link>
      <nav>
        <Link href="/shop">Shop</Link>
        <Link href="/agents">Agents</Link>
        <Link href="/legal">Rules</Link>
        <Link href="/account">Library</Link>
      </nav>
    </header>
  );
}
