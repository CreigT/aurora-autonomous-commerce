import Link from "next/link";
import { cookies } from "next/headers";
import { formatPrice, getProduct, getProducts } from "@/lib/products";

export default function AccountPage() {
  const raw = cookies().get("aurora_unlocks")?.value || "";
  const slugs = raw.split(",").map((s) => s.trim()).filter(Boolean);
  const owned = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <h2>Library</h2>
      <p className="sub">
        Purchases on this device. When Stripe is live, this becomes an email
        receipt + download token instead of a cookie.
      </p>
      {owned.length === 0 ? (
        <div className="paywall">
          <h3>Nothing unlocked yet</h3>
          <p>The catalog is public. Files stay closed until checkout finishes.</p>
          <Link className="btn" href="/shop">
            Browse products
          </Link>
        </div>
      ) : (
        <div className="grid-3">
          {owned.map((p) => (
            <article className="card" key={p.slug}>
              <div className="badge">Unlocked</div>
              <h3>{p.name}</h3>
              <div className="price">{formatPrice(p.priceCents)}</div>
              <ul>
                {p.locked.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <p className="ok">Download placeholder ready. Wire files in Day 2 fulfillment.</p>
            </article>
          ))}
        </div>
      )}

      <p className="muted" style={{ marginTop: 28 }}>
        Catalog size: {getProducts().length} products. Unlocks stored as{" "}
        <code>aurora_unlocks</code>.
      </p>
    </main>
  );
}
