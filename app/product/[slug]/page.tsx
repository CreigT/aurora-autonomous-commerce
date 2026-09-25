import Link from "next/link";
import { notFound } from "next/navigation";
import { formatPrice, getProduct, getProducts } from "@/lib/products";
import { BuyButton } from "@/components/BuyButton";

export function generateStaticParams() {
  return getProducts().map((p) => ({ slug: p.slug }));
}

export default function ProductPage({ params }: { params: { slug: string } }) {
  const product = getProduct(params.slug);
  if (!product) notFound();

  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <p className="kicker">
        <Link href="/shop">Shop</Link> / {product.slug}
      </p>
      <h1 style={{ fontSize: "clamp(36px, 5vw, 56px)" }}>{product.name}</h1>
      <p className="lede">{product.summary}</p>
      <div className="price">{formatPrice(product.priceCents)}</div>

      <div className="grid-3" style={{ marginTop: 28 }}>
        <div className="card">
          <div className="badge">Free to read</div>
          <h3>What you can see</h3>
          <ul>
            {product.includes.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="badge">Behind the paywall</div>
          <h3>What you get after payment</h3>
          <ul>
            {product.locked.map((i) => (
              <li key={i}>{i}</li>
            ))}
          </ul>
        </div>
        <div className="card">
          <div className="badge">Who it is for</div>
          <h3>{product.audience}</h3>
          <p className="muted">
            One-time purchase. Digital delivery. Refund window is 14 days if
            files were not downloaded.
          </p>
          <BuyButton slug={product.slug} name={product.name} />
        </div>
      </div>
    </main>
  );
}
