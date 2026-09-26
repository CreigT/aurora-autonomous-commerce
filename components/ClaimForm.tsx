"use client";

import { useState } from "react";

export function ClaimForm() {
  const [email, setEmail] = useState("");
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");

  async function claim(e: React.FormEvent) {
    e.preventDefault();
    setBusy(true);
    setError("");
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ email, action: "claim" })
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(data.error || "Claim failed");
      window.location.reload();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Claim failed");
      setBusy(false);
    }
  }

  return (
    <form onSubmit={claim} className="paywall" style={{ marginTop: 24 }}>
      <h3>Owner / tester unlock</h3>
      <p className="muted">If your email is on UNLOCK_EMAILS, the library opens without payment.</p>
      <div className="row">
        <input
          type="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@example.com"
          aria-label="Email"
        />
        <button className="btn" type="submit" disabled={busy}>
          {busy ? "Checking…" : "Claim"}
        </button>
      </div>
      {error ? <p className="warn">{error}</p> : null}
    </form>
  );
}
