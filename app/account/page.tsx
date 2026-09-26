import Link from "next/link";
import { formatPrice, getProduct, getProducts } from "@/lib/products";
import { getFulfillment } from "@/lib/fulfillment";
import { readUnlocks } from "@/lib/unlocks";
import { ClaimForm } from "@/components/ClaimForm";
import { config } from "@/lib/config";

export default function AccountPage() {
  const slugs = readUnlocks();
  const owned = slugs
    .map((slug) => getProduct(slug))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));

  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <h2>Library</h2>
      <p className="sub">
        Purchases on this device. Live Stripe unlocks are confirmed from the
        checkout session, then stored in the same cookie.
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
          {owned.map((p) => {
            const pack = getFulfillment(p.slug);
            return (
              <article className="card" key={p.slug}>
                <div className="badge">Unlocked</div>
                <h3>{p.name}</h3>
                <div className="price">{formatPrice(p.priceCents)}</div>
                {pack
                  ? pack.files.map((file) => (
                      <div className="file" key={file.name}>
                        <h4>{file.name}</h4>
                        <p className="muted">{file.body}</p>
                      </div>
                    ))
                  : (
                    <ul>
                      {p.locked.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  )}
              </article>
            );
          })}
        </div>
      )}

      {config.unlockEmails.length > 0 ? <ClaimForm /> : null}

      <p className="muted" style={{ marginTop: 28 }}>
        Catalog size: {getProducts().length} products. Unlocks stored as{" "}
        <code>aurora_unlocks</code>.
      </p>
    </main>
  );
}
