import Link from "next/link";
import { getProduct, formatPrice } from "@/lib/products";
import { config } from "@/lib/config";

export default function CheckoutPage({
  searchParams
}: {
  searchParams: { status?: string; slug?: string; session?: string };
}) {
  const status = searchParams.status || "idle";
  const product = searchParams.slug ? getProduct(searchParams.slug) : undefined;

  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 48 }}>
      {status === "success" ? (
        <>
          <div className="kicker">Payment received</div>
          <h1>You are in.</h1>
          <p className="lede">
            {product
              ? `${product.name} (${formatPrice(product.priceCents)}) is unlocked on this browser.`
              : "Your purchase is unlocked on this browser."}
          </p>
          <p className="muted">
            In demo mode the unlock is a cookie, not a ledger. Add Stripe keys
            when you want real money and a real receipt. Owner of record:{" "}
            {config.ownerName}.
          </p>
          <div className="row">
            <Link className="btn" href="/account">
              Open library
            </Link>
            <Link className="btn ghost" href="/shop">
              Back to shop
            </Link>
          </div>
        </>
      ) : status === "cancel" ? (
        <>
          <div className="kicker">Checkout stopped</div>
          <h1>Nothing was charged.</h1>
          <p className="lede">You can reopen the product whenever you want.</p>
          <Link className="btn" href="/shop">
            Return to shop
          </Link>
        </>
      ) : (
        <>
          <h1>Checkout</h1>
          <p className="lede">Start from a product page. This route only finishes a payment.</p>
          <Link className="btn" href="/shop">
            Choose a product
          </Link>
        </>
      )}
    </main>
  );
}
