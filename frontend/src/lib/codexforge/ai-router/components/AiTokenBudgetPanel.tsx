"use client";

import type { CSSProperties } from "react";
import type { AiTokenBudget } from "../ai-router-types";
import { summarizeAiTokenBudget } from "../ai-token-budget";

export function AiTokenBudgetPanel({ budget }: { budget: AiTokenBudget }) {
  const stats = [
    ["Input", `${budget.estimatedInputTokens}`],
    ["Output", `${budget.estimatedOutputTokens}`],
    ["Total", `${budget.estimatedTotalTokens}`],
    ["Cost score", `${budget.costScore}`],
  ];

  return (
    <section style={panel}>
      <span style={eyebrow}>Token budget</span>
      <h2 style={title}>{summarizeAiTokenBudget(budget)}</h2>
      <div style={statGrid}>
        {stats.map(([label, value]) => (
          <div key={label} style={stat}>
            <span style={statLabel}>{label}</span>
            <strong>{value}</strong>
          </div>
        ))}
      </div>
      <p style={note}>Estimates are approximate and are not billing records.</p>
    </section>
  );
}

const panel: CSSProperties = { display: "grid", gap: 12 };
const statGrid: CSSProperties = { display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 8 };
const stat: CSSProperties = { border: "1px solid rgba(125,211,252,0.16)", background: "rgba(14,165,233,0.08)", borderRadius: 8, padding: 10 };
const statLabel: CSSProperties = { display: "block", fontSize: 10, color: "#bae6fd", textTransform: "uppercase", fontWeight: 900 };
const note: CSSProperties = { margin: 0, color: "rgba(226,232,240,0.68)", fontSize: 12 };
const eyebrow: CSSProperties = { color: "#93c5fd", fontSize: 11, fontWeight: 900, textTransform: "uppercase" };
const title: CSSProperties = { fontSize: 20, margin: 0, letterSpacing: 0, overflowWrap: "anywhere" };
