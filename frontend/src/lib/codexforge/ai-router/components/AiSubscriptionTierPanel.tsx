"use client";

import type { CSSProperties } from "react";
import type { AiSubscriptionTier } from "../ai-router-types";
import { summarizeAiSubscriptionTier } from "../ai-subscription-tier";

export function AiSubscriptionTierPanel({ tiers }: { tiers: AiSubscriptionTier[] }) {
  return (
    <section style={panel}>
      <div>
        <span style={eyebrow}>Subscription tiers</span>
        <h2 style={title}>Manual budgets and subscription value</h2>
      </div>
      <div style={grid}>
        {tiers.map((tier) => (
          <article key={tier.id} style={card}>
            <strong>{tier.label}</strong>
            <p style={body}>{summarizeAiSubscriptionTier(tier)}</p>
            <p style={note}>{tier.includedUsageNote}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 14 };
const grid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))", gap: 10 };
const card: CSSProperties = { border: "1px solid rgba(45,212,191,0.16)", background: "rgba(20,184,166,0.065)", borderRadius: 8, padding: 12, minWidth: 0 };
const body: CSSProperties = { margin: "8px 0", color: "rgba(226,232,240,0.72)", fontSize: 12, lineHeight: 1.45, overflowWrap: "anywhere" };
const note: CSSProperties = { margin: 0, color: "#ccfbf1", fontSize: 11, lineHeight: 1.4, overflowWrap: "anywhere" };
const eyebrow: CSSProperties = { color: "#5eead4", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: "4px 0 0", letterSpacing: 0, overflowWrap: "anywhere" };
