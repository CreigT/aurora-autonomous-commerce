import Link from "next/link";
import { formatPrice, getProducts } from "@/lib/products";

export default function ShopPage() {
  const products = getProducts();
  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <h2>Shop</h2>
      <p className="sub">Three products. Same paywall. No upsell maze.</p>
      <div className="grid-3">
        {products.map((p) => (
          <article className="card" key={p.slug}>
            <div className="badge">{p.badge}</div>
            <h3>{p.name}</h3>
            <div className="price">{formatPrice(p.priceCents)}</div>
            <p>{p.teaser}</p>
            <p className="muted">For: {p.audience}</p>
            <Link className="btn" href={`/product/${p.slug}`} style={{ marginTop: "auto" }}>
              View
            </Link>
          </article>
        ))}
      </div>
    </main>
  );
}
