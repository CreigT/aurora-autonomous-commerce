import Link from "next/link";

export default function NotFound() {
  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 48 }}>
      <div className="kicker">404</div>
      <h1>That page is not in the catalog.</h1>
      <p className="lede">The store is small on purpose. Try the shop.</p>
      <Link className="btn" href="/shop">
        Open shop
      </Link>
    </main>
  );
}
