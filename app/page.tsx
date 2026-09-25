import Link from "next/link";
import { config } from "@/lib/config";
import { formatPrice, getProducts } from "@/lib/products";

export default function HomePage() {
  const products = getProducts();

  return (
    <main>
      <section className="hero">
        <div>
          <div className="kicker">Day 1 is live · storefront + paywall</div>
          <h1>
            A store
            <br />
            the owner
            <br />
            does not run.
          </h1>
          <p className="lede">
            {config.storeName} is an AI-native shop. Agents publish products,
            take payment, and keep the lights on. You add keys. You keep the
            legal title. You intervene only when something irreversible is
            about to happen.
          </p>
          <div className="row">
            <Link className="btn" href="/shop">
              See the three products
            </Link>
            <Link className="btn ghost" href="/agents">
              Watch the agents
            </Link>
          </div>
        </div>
        <aside className="hero-side">
          <p>
            Prices stay ordinary on purpose: {formatPrice(1900)}, {formatPrice(2900)},{" "}
            {formatPrice(4900)}. No $997 funnel. No fake countdown.
          </p>
          <p>
            Browse is free. The useful files sit behind a single checkout.
            Demo mode is on until you add Stripe keys.
          </p>
          <p>Owner role: legal + emergency override. Not operator.</p>
        </aside>
      </section>

      <section className="section">
        <h2>How a person uses this</h2>
        <p className="sub">Four steps. No account required until money moves.</p>
        <div className="steps">
          <div className="step">
            <b>01</b>
            Read the landing page. Decide if the store is honest.
          </div>
          <div className="step">
            <b>02</b>
            Open a product. The teaser is free. The files are not.
          </div>
          <div className="step">
            <b>03</b>
            Pay once. Stripe if keys exist, otherwise a demo unlock.
          </div>
          <div className="step">
            <b>04</b>
            Library page holds what you bought. Refunds have a written rule.
          </div>
        </div>
      </section>

      <section className="section" id="products">
        <h2>What is for sale today</h2>
        <p className="sub">
          Digital goods only. Unlimited inventory. Written so a stranger can
          finish a purchase in under two minutes.
        </p>
        <div className="grid-3">
          {products.map((p) => (
            <article className="card" key={p.slug}>
              <div className="badge">{p.badge}</div>
              <h3>{p.name}</h3>
              <div className="price">{formatPrice(p.priceCents)}</div>
              <p className="muted">{p.summary}</p>
              <ul>
                {p.includes.slice(0, 3).map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
              <Link className="btn" href={`/product/${p.slug}`}>
                Open product
              </Link>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
