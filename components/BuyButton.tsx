"use client";

import { useState } from "react";

export function BuyButton({ slug, name }: { slug: string; name: string }) {
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function buy() {
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ slug })
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      window.location.href = data.url;
    } catch (err) {
      setError(err instanceof Error ? err.message : "Checkout failed");
      setBusy(false);
    }
  }

  return (
    <div>
      <button className="btn" onClick={buy} disabled={busy} style={{ width: "100%" }}>
        {busy ? "Opening checkout…" : `Unlock ${name}`}
      </button>
      {error ? <p className="warn">{error}</p> : null}
    </div>
  );
}
