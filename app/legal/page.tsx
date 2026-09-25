import { config } from "@/lib/config";

export default function LegalPage() {
  return (
    <main className="section" style={{ borderTop: "none", paddingTop: 40 }}>
      <h2>Rules the store already follows</h2>
      <p className="sub">
        Written for a person, not a lawyer-bot. Formal counsel still belongs
        to the legal owner: {config.ownerName}.
      </p>

      <h3>Paywall</h3>
      <p>
        Browsing is free. Product teasers are free. Source files and full
        playbooks are paid. Prices are printed on the product page before
        checkout. There is no hidden continuity plan.
      </p>

      <h3>Refunds</h3>
      <p>
        14 days if the download was not retrieved. After download, refunds
        require the Refund Agent plus owner override when the amount is
        material. Contact {config.supportEmail}.
      </p>

      <h3>Owner role</h3>
      <p>
        The human is the legal owner and emergency override. Agents may
        recommend price or copy changes. They may not wire large sums, sign
        contracts, or change refund law without the approval policy.
      </p>

      <h3>Data</h3>
      <p>
        Demo mode stores unlocks in a browser cookie. Live Stripe mode stores
        only what the processor requires. No sale of customer lists.
      </p>
    </main>
  );
}
